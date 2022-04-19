import {React} from 'react';

export default function  CartItem(props) {
    const product = props.product
    const quantity = props.quantity
    return (
        <div className="card mb-3 item-card" style={{'maxWidth': '100%'}}>
            <div className="row no-gutters">
                <div className="col-md-3 item-img">
                    <img src={product.pictures[0]} className="card-img" alt="..."/>
                </div>
                <div className="col-md-8 item-body">
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Subtotal: {(quantity * product.cost).toLocaleString('en-US', { 
                            style: 'currency',currency: 'USD'})}</p>
                        <p className="card-text"><small className="text-muted">{product.general_description}</small></p>
                        <div className='card-text'>
                            <button className='quantity-btn btn btn-secondary'>-</button>
                            {/* <button className='quantity-btn btn btn-secondary' onClick={() => props.removeFromCart(product)}>-</button> */}
                            <span className='quantity-text'>{quantity}</span>
                            <button onClick={() => props.addToCart({quantity: 1, product: product})} className='quantity-btn btn btn-secondary'>+</button>
                            {/* <button onClick={() => props.deleteFromCart(product)} className='remove-btn btn btn-danger'> Remove Product </button> */}
                            <button className='remove-btn btn btn-danger'> Remove Product </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}