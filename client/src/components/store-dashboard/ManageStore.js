import {React, useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import StoreForm from './StoreForm'
import { useHistory } from "react-router-dom";

export default function ManageStore(props) {
    let history = useHistory()

    const [stripeStatus, setStripeStatus] = useState();
    const [teammateStatus, setTeammateStatus] = useState();
    const [deleteStatus, setDeleteStatus] = useState();

    const [onboardingLink, setOnboardingLink] = useState();
    const getOnboardingLink = async () => {
        let response = await fetch(`/api/v1/store/stripe/getOnboardingLink?storeID=${props.store._id}`,
            {method: "GET", credentials: 'include'})
        let responseJSON = await response.json()
        if (responseJSON.status != 'error'){
            setOnboardingLink(responseJSON)
            setStripeStatus({message: 'Successfully generated link!'})
        } else {
            setStripeStatus(responseJSON)
        }
    }
    const verifyStripe = async () => {
        let response = await fetch(`/api/v1/store/stripe/authenticateAccount?storeID=${props.store._id}`,
            {method: "GET", credentials: 'include'})
        let responseJSON = await response.json()
        if (responseJSON.status != 'error'){
            setStripeStatus({message: 'Success! Your store has been verified for payment.'})
        }else {
            setStripeStatus(responseJSON)
        }
    }
    
    const addTeammate = async (event) => {
        event.preventDefault();
        let formData = {
            teammate_email: event.target.teammate_email.value,
            storeID: props.store._id
        }
        let postFormResponse = await fetch(`/api/v1/store/addStoreOwner`,
                {method: "POST", body: JSON.stringify(formData), headers: {'Content-Type': 'application/json', 
                }, credentials: 'include'}
            )
        let postFormJSON = await postFormResponse.json()
        if (postFormJSON.status == 'error') {
            setTeammateStatus(`Error: "${postFormJSON.error}"`)
        } else {
            history.push(`/StoreDashboard/${props.store._id}`)
            history.go(0)
        }
    }

    const deleteStore = async () => {
        let postFormResponse = await fetch(`/api/v1/store/deleteStore?storeID=${props.store._id}`,
                {method: "DELETE", headers: {'Content-Type': 'application/json', 
                }, credentials: 'include'}
        )
        let postFormJSON = await postFormResponse.json()
        if (postFormJSON.status == 'error') {
            setDeleteStatus(`Error: "${postFormJSON.error}"`)
        } else {
            history.push("/StoreDashboard")
            history.go(0)
        }
    }

    const [showEditForm, setEditShow] = useState(false);
    const handleClose = () => setEditShow(false);
    const handleShow = () => setEditShow(true);

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
                {stripeStatus && <div className={`alert ${stripeStatus.error ? 'alert-danger' : 'alert-success'}`}> {stripeStatus.error ? stripeStatus.error : stripeStatus.message} </div>}
                </div>}
                <br/>
                <h4> Add a Team Member</h4>
                <form className='m-0 w-50' onSubmit={addTeammate}>
                    <div className="mb-3">
                        <label className="form-label"> What is your teammate's email? </label>
                        <input className="form-control" type="email" name="teammate_email"></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Add User</button>
                    {teammateStatus && <div className="form-text status"> {teammateStatus} </div>}
                </form>
                <br/>
                <h4> Store Information</h4> 
                <div> <strong>Name:</strong> {props.store.name} </div>
                <div> <strong>Admins:</strong> {props.store.admins.map((admin) => {return `${admin.first_name} ${admin.last_name}`}).join(', ')} </div>
                <div> <strong>Email:</strong> {props.store.email} </div>
                <div> <strong>About: </strong> {props.store.about}</div>
                <div> <strong>Tagline: </strong> {props.store.tagline}</div>
                <div> <strong>Cohort:</strong> {props.store.cohort} </div>
                <div> <strong>Social Links:</strong> {props.store.social_links.map((social) => {return social.link}).join(', ')} </div>
                <div> <strong>Type: </strong> {props.store.type}</div>
                <div> <strong>Pickup Locations:</strong> {props.store.pickup_from.join(', ')} </div>
                <div> <strong>Ships To:</strong> {props.store.ships_to.join(', ')} </div>
                <div> <strong>Private:</strong> {props.store.private ? 'Yes' : 'No'} </div>
                <div><button className='btn btn-primary mt-2' onClick={handleShow}> Edit Info </button></div>
                <Modal show={showEditForm} size="xl" onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Store Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><StoreForm store={props.store} handleClose={handleClose}/></Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    </Modal.Footer>
                </Modal>
                <br/>
                <h4> Delete Store </h4>
                <div><button onClick={deleteStore} className='btn btn-danger'>Delete Store and Products</button></div>
                {deleteStatus && <div className="form-text status"> {deleteStatus} </div>}
            </div>
        </div>
    );
}