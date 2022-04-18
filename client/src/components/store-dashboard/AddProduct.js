import {React, useState, useRef} from 'react';
import {PRODUCT_TYPES, COUNTRIES} from '../../constants/constants.js'

export default function  AddProduct(props) {
    let store = props.store;

    const sectionTitleInput = useRef(null);
    const sectionDescriptionInput = useRef(null);
    const pickupAreaInput = useRef(null);

    const [statusMessage, setStatusMessage] = useState('');
    const [sections, setSections] = useState([]);
    const [pickupAreas, setPickupAreas] = useState([]);
    const [regions, setRegions] = useState([]);

    let submitStoreSetup = async (event) => {
        event.preventDefault()

        let imageUrls = []
        let files = event.target.product_pictures.files
        if (files && files.length > 0){
            Array.from(files).forEach(async(file) => {
                const urlResponse = await fetch('http://localhost:3001/api/v1/s3/getUploadUrl')
                const urlJSON = await urlResponse.json()
                await fetch(urlJSON.upload_url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    body: file
                });
                const imageUrl = urlJSON.upload_url.split('?')[0]
                imageUrls.push(imageUrl)
            });
        }

        let formData = {
            storeID: store._id,
            name: event.target.product_name.value,
            tagLine: event.target.tagline.value,
            cost: event.target.price.value,
            type: event.target.product_type.value,
            pictures: imageUrls,
            shipsTo: regions,
            pickupFrom: pickupAreas,
            generalDesc: event.target.about.value,
            additonalInfo: sections
        }
        let postFormResponse = await fetch(`http://localhost:3001/api/v1/product/createProduct`,
            {method: "POST", body: JSON.stringify(formData), headers: {'Content-Type': 'application/json', 
            }, credentials: 'include'}
        )
        let postFormJSON = await postFormResponse.json()
        if (postFormJSON.status == 'error') {
            setStatusMessage(`Error: "${postFormJSON.error}"`)
        } else {
            setStatusMessage(`Successfully added new product!`)
        }
    }

    let addSectionInformation = async () => {
        let sectionTitle = sectionTitleInput.current.value
        let sectionDescription = sectionDescriptionInput.current.value
        if (sectionTitle.length > 0) {
            setSections(prevState => [...prevState, {'title': sectionTitle, 'description': sectionDescription}])
        }
    }
    let addPickupArea = async () => {
        let pickupArea= pickupAreaInput.current.value
        if (pickupArea.length > 0) {
            setPickupAreas(prevState => [...prevState, pickupArea])
        }
    }
    return (
        <div>
            <form onSubmit={submitStoreSetup}>
                <h4> Add a new Product! </h4>
                <h5>General Information </h5>
                <div className="mb-3">
                    <label className="form-label">What is the name of the product?</label>
                    <input type='text' className="form-control" name='product_name' required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">What type of product is it?</label>
                    <select name="product_type" className="form-select" required>
                        {PRODUCT_TYPES.map(type => (
                            <option value={type} key={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">What is the general description of your product?</label>
                    <textarea className="form-control" rows="4" name="about" required></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">What is the tagline of the product? </label>
                    <textarea className="form-control" name="tagline" required></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Please attach some photos of your product. </label>
                    <input className="form-control" type="file" name="product_pictures" accept="image/png, image/jpeg, image/jpg" multiple></input>
                </div>
                <h5> Pricing and Shipping </h5>
                <div className="mb-3">
                    <label className="form-label">What price would you like to list the product at?</label>
                    <input className="form-control" name="price" type="number" defaultValue={0.00} min={0} step={.01} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Which of the following regions are you open to shipping to?</label>
                    <div className="form-check">
                        {COUNTRIES.map(country => (
                            <div key={country}>
                                <input onChange={(e) => {
                                    if (e.target.checked) {
                                        setRegions([...regions, e.target.value])
                                    } else {
                                        setRegions(regions.filter(region => region != e.target.value))
                                    }
                                }} className="form-check-input" type="checkbox" value={country}/>
                                <label className="form-check-label">
                                    {country}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="form-text">If you don't check any, your product will be listed only for pickup. </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">What areas will your product be available for pickup?</label>
                    <input ref={pickupAreaInput} type='text' className="form-control" name='pickup_location'/>
                </div>
                <button type="button" onClick={addPickupArea} className="btn btn-secondary mb-3">Add Pickup Area</button>
                <div className="mb-3">
                    <label className="form-label"> Added Pickup Areas: </label>
                    <ul className="list-group">
                        {pickupAreas.length > 0 ? pickupAreas.map(pickupArea => <li className="list-group-item" 
                            key={pickupArea}>{`${pickupArea}`}</li>) : 
                            <li className="list-group-item">Currently no areas have been added.</li>}
                    </ul>
                </div>

                <h5> Additional Information</h5>
                <div className="form-text"> Attach any additional information sections you would like for your product. </div>
                <div className="mb-3">
                    <label className="form-label"> Section Title </label>
                    <input ref={sectionTitleInput} type='text' className="form-control" name='section_title'/>
                </div>
                <div className="mb-3">
                    <label className="form-label"> Section Description</label>
                    <textarea ref={sectionDescriptionInput} className="form-control" name="section_description"></textarea>
                </div>
                <button type="button" onClick={addSectionInformation} className="btn btn-secondary mb-3">Add Product Section</button>
                <div className="mb-3">
                    <label className="form-label"> Added Sections: </label>
                    <ul className="list-group">
                        {sections.length > 0 ? sections.map(section => <li className="list-group-item" 
                            key={section.title}>{`${section.title}: ${section.description}`}</li>) : 
                            <li className="list-group-item">Currently no sections have been added.</li>}
                    </ul>
                </div>
                <button type="submit" className="btn btn-primary">Add new Product</button>
                {statusMessage && <div className="form-text status"> {statusMessage} </div>}
            </form>
        </div>
    );
}