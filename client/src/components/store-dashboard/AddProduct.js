import {React, useState, useRef} from 'react';
import {PRODUCT_TYPES} from '../../constants/constants.js'

export default function AddProduct(props) {
    let store = props.store;

    const sectionTitleInput = useRef(null);
    const sectionDescriptionInput = useRef(null);

    const [statusMessage, setStatusMessage] = useState('');
    const [sections, setSections] = useState([]);

    let submitStoreSetup = async (event) => {
        event.preventDefault()
        let formData = {
            storeID: store._id,
            name: event.target.product_name.value,
            tagline: event.target.tagline.value,
            cost: event.target.price.value,
            type: event.target.product_type.value,
            general_description: event.target.about.value,
            additonal_information: sections
        }

        let files = event.target.product_pictures.files
        let fileUrls = []
        if (files && files.length > 0){
            let fileArray = Array.from(files)
            for (let i = 0; i < fileArray.length; i++) {
                let file = fileArray[i]
                const urlResponse = await fetch('/api/v1/s3/getUploadUrl')
                const urlJSON = await urlResponse.json()
                await fetch(urlJSON.upload_url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    body: file
                });
                const imageUrl = urlJSON.upload_url.split('?')[0]
                fileUrls.push(imageUrl)
            }
        }
        formData.pictures = fileUrls
        let postFormResponse = await fetch(`/api/v1/product/createProduct`,
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
    return (
        <div>
            <form onSubmit={submitStoreSetup}>
                <h3> Add a new Product! </h3>
                <h4>General Information </h4>
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
                <h4> Pricing </h4>
                <div className="mb-3">
                    <label className="form-label">What price would you like to list the product at?</label>
                    <input className="form-control" name="price" type="number" defaultValue={0.00} min={0} step={.01} required/>
                </div>
                <h4> Additional Information</h4>
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