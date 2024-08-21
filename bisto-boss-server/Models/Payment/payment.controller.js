const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports.getCardPaymentIntent = async(req,res,next)=>{
    try {
        const {amount} = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
          amount: parseFloat(amount)*100,
          currency: 'usd',
          payment_method_types: ['card'],
          description: 'Bistro Boss Payment',
          metadata: {
            order_id: new Date().toISOString(),
          },
        });
      
        res.send({
          clientSecret: paymentIntent.client_secret,
          orderId: paymentIntent.metadata.order_id,
          status: paymentIntent.status,
          paymentIntentId: paymentIntent.id,
          amount: amount,
        })
       } catch (error) {
        res.status(400).json({ error})
       }
}