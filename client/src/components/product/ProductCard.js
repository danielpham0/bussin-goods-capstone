import React from "react";
import { Link } from "react-router-dom";
import productPlaceholder from '../../imgs/productPlaceholder.jpg'

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        cards: []
    }

    componentDidMount() {
        this.setState({ cards: this.props })
    }

    render() {
        return (
            <div className='col-md-3' >
                <div className='card border-secondary h-100'>
                    <Link to={`/Product/${this.props.cards._id}`}>
                        <img style={{'objectFit': 'cover', 'height': '18rem'}} className='img-fluid card-img-top' src={this.props.cards.pictures.length > 0 ? this.props.cards.pictures[0] : productPlaceholder} />
                    </Link>
                    <div className='card-body' style={{ 'padding-bottom': '0' }}>
                        <h5 className='card-title'><Link to={`/Product/${this.props.cards._id}`}>{this.props.cards.name} </Link> <p className="card-price" style={{ textAlign: 'right' }}>${this.props.cards.cost}</p></h5>
                        <h6 className="card-store text-muted">{this.props.cards.store.name}</h6>
                        <p className="card-info" style={{ display: 'inline-block' }}>{this.props.cards.tagline}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductCard;