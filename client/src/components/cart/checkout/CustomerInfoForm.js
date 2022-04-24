import {React} from 'react';

export default function  CustomerInfoForm(props) {
    let submitCustInfo = async (event) => {
        event.persist();
        event.preventDefault()
        props.setOrderInfo(prevState => ({
            ...prevState,
            customer_info: {
                ...prevState.customer_info,
                first_name: event.target.first_name.value,
                last_name: event.target.last_name.value,
                email: event.target.email.value,
                phone_number: event.target.phone_number.value
            }
        }))
        props.setCurTab('shipping-info')
    }
    return (
        <form className="customer-info" onSubmit={submitCustInfo}>
            <h3>Customer Information</h3>
            <h4>Name</h4>
            <div className="mb-3">
                <label className="form-label">First Name</label>
                <input type='text' className="form-control" name='first_name' required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input type='text' className="form-control" name='last_name' required/>
            </div>
            <h4>Contact</h4>
            <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type='tel' className="form-control" name='phone_number' required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email </label>    
                <input type='email' className="form-control" name='email' required/>
            </div>
            <button type="submit" className="btn btn-primary">Proceed to Shipping</button>
        </form>
    );
}