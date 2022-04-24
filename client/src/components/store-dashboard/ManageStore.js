import {React, useState} from 'react';

export default function AddProduct(props) {
    const [status, setStatus] = useState();

    const [onboardingLink, setOnboardingLink] = useState();
    const getOnboardingLink = async () => {
        let response = await fetch(`http://localhost:3001/api/v1/store/stripe/getOnboardingLink?storeID=${props.store._id}`,
            {method: "GET", credentials: 'include'})
        let responseJSON = await response.json()
        if (responseJSON.status != 'error'){
            setOnboardingLink(responseJSON)
            setStatus({message: 'Successfully generated link!'})
        } else {
            setStatus(responseJSON)
        }
    }
    const verifyStripe = async () => {
        let response = await fetch(`http://localhost:3001/api/v1/store/stripe/authenticateAccount?storeID=${props.store._id}`,
            {method: "GET", credentials: 'include'})
        let responseJSON = await response.json()
        if (responseJSON.status != 'error'){
            setStatus({message: 'Success! Your store has been verified for payment.'})
        }else {
            setStatus(responseJSON)
        }
    }
    
    return (
        <div>
            <h3>Manage Store</h3>
            <div className='manage-store-section'>
                <h4>Stripe</h4>
                {props.store.stripe && props.store.stripe.enabled ? <div>Congrats! You have successfully setup your Stripe for payment. </div>:
                <div>
                <p>To set up your store to recieve payment from orders, please onboard with Stripe and return here to verify your Stripe account.</p>
                <ol className="list-group list-group-numbered">
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                        <div className="fw-bold"> Connect Stripe Account </div>
                        <button className='btn btn-primary' onClick={getOnboardingLink}> Get Onboard Link</button>
                        {onboardingLink && <a className='btn btn-secondary' href={onboardingLink.url} target="_blank" rel="noopener noreferrer"> Stripe Onboard </a>}
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                        <div className="fw-bold"> Enable Account for Payment </div>
                        <button className='btn btn-primary' onClick={verifyStripe}> Verify Stripe </button>
                        </div>
                    </li>
                </ol>
                {status && <div className={`alert ${status.error ? 'alert-danger' : 'alert-success'}`}> {status.error ? status.error : status.message} </div>}
                </div>}
            </div>
        </div>
    );
}