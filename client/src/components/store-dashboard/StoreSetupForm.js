import {React, useRef, useState} from 'react';
import "./StoreSetupForm.css";
import { useHistory } from "react-router-dom";
import { STORE_TYPES, SOCIAL_TYPES } from '../../constants/constants';

export default function  StoreSetupForm() {
    let curYear = new Date().getFullYear()

    const socialLinkInput = useRef(null);
    const socialTypeInput = useRef(null);

    let history = useHistory()

    const [statusMessage, setStatusMessage] = useState('');
    const [socials, setSocials] = useState([]);

    let submitStoreSetup = async (event) => {
        event.preventDefault()
        let formData = {
            name: event.target.store_name.value,
            type: event.target.store_type.value,
            cohort: event.target.cohort.value,
            about: event.target.about.value,
            social_links: socials,
            tagline: event.target.tagline.value,
            private: event.target.private.value == 'true' ? true : false, 
            email: event.target.email.value
        }
        let postFormResponse = await fetch(`http://localhost:3001/api/v1/store/createStore`,
            {method: "POST", body: JSON.stringify(formData), headers: {'Content-Type': 'application/json', 
            }, credentials: 'include'}
        )
        let postFormJSON = await postFormResponse.json()
        if (postFormJSON.status == 'error') {
            setStatusMessage(`Error: "${postFormJSON.error}"`)
        } else {
            history.push("/StoreDashboard")
        }
    }
    let addSocialLink = async () => {
        let socialLink = socialLinkInput.current.value
        let socialType = socialTypeInput.current.value
        if (socialLink.length > 0) {
            setSocials(prevState => [...prevState, {'social_media': socialType, 'link': socialLink}])
        }
    }
    return (
        <div>
            <form className="store-setup" onSubmit={submitStoreSetup}>
                <h4> Setup your Store! </h4>
                <h5>General Information </h5>
                <div className="mb-3">
                    <label className="form-label">What is the name of your store?</label>
                    <input type='text' className="form-control" name='store_name' required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">What email should we use to send store and order updates?</label>
                    <input type='email' className="form-control" name='email' required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">What type of store is it?</label>
                    <select name="store_type" className="form-select" required>
                        {STORE_TYPES.map(type => (
                            <option value={type} key={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">What cohort is your startup?</label>
                    <input className="form-control" name="cohort" type="number" defaultValue={curYear} min={curYear-5} max={curYear} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label"> Would you like your store to be private as of now?</label>
                    <select name="private" className="form-select" required>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    <div className="form-text">You can change this later!</div>
                </div>
                <h5> About </h5>
                <div className="mb-3">
                    <label className="form-label">What would you like in your 'About' section?</label>
                    <textarea className="form-control" rows="4" name="about" placeholder="Your About" required></textarea>
                    <div className="form-text">Don't worry about getting things perfect! You can always edit this later on. </div>
                </div>
                <div className="mb-3">
                    <label className="form-label"> What would you like your 'tagline' to be?</label>
                    <textarea className="form-control" name="tagline" placeholder="Your Tagline" required></textarea>
                    <div className="form-text">This is what will appear when your store is mentioned or highlighted somewhere.</div>
                </div>
                <h5>Social Media </h5>
                <div className="mb-3">
                    <label className="form-label"> Social Type </label>
                    <select name="social_type" className="form-select" ref={socialTypeInput}>
                        {SOCIAL_TYPES.map(type => (
                            <option value={type} key={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label"> Social Link</label>
                    <input ref={socialLinkInput} type='text' className="form-control" name='social_link'/>
                </div>
                <button type="button" onClick={addSocialLink} className="btn btn-secondary mb-3">Add Social</button>
                <div className="mb-3">
                    <label className="form-label"> Added Socials: </label>
                    <ul className="list-group">
                        {socials.length > 0 ? socials.map(social => <li className="list-group-item" 
                            key={social.link}>{`${social.social_media} (${social.link})`}</li>) : 
                            <li className="list-group-item">Currently no socials have been attached.</li>}
                    </ul>
                </div>
                <button type="submit" className="btn btn-primary">Setup Store</button>
                {statusMessage && <div className="form-text status"> {statusMessage} </div>}
            </form>
        </div>
    );
}