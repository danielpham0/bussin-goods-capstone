import {React, useState} from "react";
import Modal from 'react-bootstrap/Modal'
import { Link } from "react-router-dom";
import productPlaceholder from '../../imgs/productPlaceholder.jpg'
import ProductForm from '../store-dashboard/ProductForm'

export default function  ProductCard(props) {
    const product = props.product
    
    const [deleteStatus, setDeleteStatus] = useState();

    const [showEditForm, setEditShow] = useState(false);
    const handleClose = () => setEditShow(false);
    const handleShow = () => setEditShow(true);
    
    let deleteProduct = async () => {
        let postFormResponse = await fetch(`/api/v1/product/deleteProduct?productID=${product._id}`,
                {method: "DELETE", headers: {'Content-Type': 'application/json', 
                }, credentials: 'include'}
        )
        let postFormJSON = await postFormResponse.json()
        if (postFormJSON.status == 'error') {
            setDeleteStatus(`Error: "${postFormJSON.error}"`)
        } else {
            history.go(0)
        }
    }

    return (
        <div className={props.manage ? 'col-md-4' : 'col-md-3'} style={{'marginBottom':'2rem'}}>
            <div className='card border-secondary h-100'>
                <Link to={`/Product/${product._id}`}>
                    <img style={{'objectFit': 'cover', 'height': '18rem'}} className='img-fluid card-img-top' src={product.pictures.length > 0 ? product.pictures[0] : productPlaceholder} />
                </Link>
                <div className='card-body' style={{ 'paddingBottom': '0' }}>
                    <h5 className='card-title'><Link to={`/Product/${product._id}`}>{product.name} </Link> <p className="card-price" style={{ textAlign: 'right' }}>${product.cost}</p></h5>
                    <h6 className="card-store text-muted">{product.store.name}</h6>
                    <p className="card-info" style={{ display: 'inline-block' }}>{product.tagline}</p>
                </div>
                {props.manage ? 
                <div className="card-footer">
                    <button onClick={handleShow} className="btn btn-primary m-1">Edit</button>
                    <Modal show={showEditForm} size="xl" onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><ProductForm product={product} handleClose={handleClose}/></Modal.Body>
                        <Modal.Footer>
                        <button className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </button>
                        </Modal.Footer>
                    </Modal>
                    <button onClick={deleteProduct} className="btn btn-danger m-1">Delete</button>
                    {deleteStatus && <div className="form-text status"> {deleteStatus} </div>}
                </div> : null}
            </div>
        </div>
    );
}