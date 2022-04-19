import {React, useState} from 'react';
export default function  AboutProduct(props) {
    let aboutItem = {'title': 'About', 'description': props.product.general_description}
    let infoItems = [aboutItem].concat(props.product.additional_information)
    const [selectedSection, setSelectedSection] = useState(aboutItem);

    return (
        <div className='about-product'>
            <hr/>
            <div className="btn-group" role="group" aria-label="Select about section.">
                {infoItems.map(item => (
                    <button type="button" key={item.title} onClick={() => setSelectedSection(item)}
                        className={`btn btn-outline-dark ${item.title == selectedSection.title ? 'active' : ''}`}>
                            {item.title}</button>
                ))}
            </div>
            <hr/>
            <div className='about-contents'>
                <h3>{selectedSection.title}</h3>
                <p>{selectedSection.description}</p>
            </div>
            <hr/>
        </div>
    );
}