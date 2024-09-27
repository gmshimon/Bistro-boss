import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'
import axiosSecure from '../../utilis/axiosSecure'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { setCartNull } from '../../Redux/Slice/CartSlice'

const PaymentCheckoutForm = () => {
  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart)
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('');
  const [totalPrice,setTotal] = useState(0)
  const [error, setError] = useState('')
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate();
const dispatch = useDispatch()
  useEffect(() => {
    // calculate the total price to be paid
    const total = cartItems.reduce((total, item) => {
      return total + item?.totalPrice
    }, 0)
    setTotal(total)
    axiosSecure
      .post('/payment/card-payment-intent', {
        amount: total
      })
      .then(res => {
        setClientSecret(res.data.clientSecret)
      })
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('he')
    if (!stripe || !elements) {
      return
    }
    const card = elements.getElement(CardElement)
    if (card === null) {
      return
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: card
    })
    if (error) {
      setError(error.message)
    } else {
      setError('')
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.name || 'anonymous'
          }
        }
      })
    if (confirmError) {
     setError(confirmError.message)
    }
    else {
      if (paymentIntent.status === 'succeeded') {
          setTransactionId(paymentIntent.id);

          // now save the payment in the database
          const payment = {
            name:user?.name,
            transaction_id: paymentIntent.id,
            total_price: totalPrice,
            carts:cartItems
              
          }
          const res = await axiosSecure.post('/order/make-order',payment)
          if(res.data.status === 'Success'){
            dispatch(setCartNull())
            Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Order placed successfully",
                      showConfirmButton: false,
                  });
                  navigate('/')
          }
      }
  }
  }
  return (
    <section className='flex justify-center items-center h-screen bg-gray-100'>
  <div className='w-[500px] p-6 bg-white shadow-lg rounded-lg'>
    <h2 className='text-center text-2xl font-bold mb-4'>Payment</h2>
    <form onSubmit={handleSubmit}>
      <div className='border rounded-lg overflow-hidden'>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#010101FF',
                },
                padding: '20px',
                border: 'none', // Remove default border
                backgroundColor: '#f9f9f9', // Light background for better contrast
                transition: 'background-color 0.3s ease', // Smooth transition
                '&:focus': {
                  backgroundColor: '#e0f7fa', // Change background on focus
                },
              },
            },
          }}
        />
      </div>
      <button className='btn btn-sm btn-primary my-4 w-full' type='submit'>
        Pay
      </button>
      <p className='text-red-600'>{error}</p>
      {transactionId && <p className='text-green-600'>Your transaction id: {transactionId}</p>}
    </form>
  </div>
</section>
  )
}

export default PaymentCheckoutForm
