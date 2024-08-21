
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentCheckoutForm from '../../../Components/PaymentCheckoutForm/PaymentCheckoutForm';

const stripePromise = loadStripe('pk_test_51MMQcGDknvLebi91Ge5BBXH7izgAaCn3vH4tILEWEUAd8RSCQ3pShB4fljMQKz12BErLmUROYl70P3ULLDNFM9We00ung8cWoB');

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
        <div>
            <PaymentCheckoutForm/>
        </div>
        </Elements>
    );
};

export default Payment;