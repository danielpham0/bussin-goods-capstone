import React from "react";
import { Link } from "react-router-dom";

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


            <div className='col-md-3'>
                <div className='card border-secondary'>
                    <Link to={`/Product/${this.props.cards._id}`}>
                        <img className='img-fluid card-img-top' src={this.props.cards.pictures[0]} />
                        <div className='card-body'>
                            <h5 className='card-title'>{this.props.cards.name} <p className="card-price" style={{ textAlign: 'right' }}>${this.props.cards.cost}</p></h5>
                            <h6 className="card-store text-muted">{this.props.cards.store.name}</h6>
                            <p>{this.props.cards.general_description}</p>
                            <p className="card-info" style={{ display: 'inline-block' }}>{this.props.cards.tagline}</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default ProductCard;