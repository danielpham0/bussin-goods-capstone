import React from "react";
import { Link } from "react-router-dom";

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        card: [],
        type: ''
    }

    componentDidMount() {

        const url = "/api/v1/store/getAllPublicStores"

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ card: data }))
    }

    render() {
        return (


            <div className="row product-cats">

                <h2> Showing results for: {this.props.type}</h2>
                {this.props.cards.filter(e => e.type == this.props.type).length == 0 &&

                    <p>Sorry, no results were found :/</p>


                }
                {this.props.cards.filter(e => e.type == this.props.type).map((object) => {

                    return (
                        <div className='col-md-3'>
                            <div className='card border-secondary'>
                                <Link to={`/Product/${object._id}`}>

                                    <img className='img-fluid card-img-top' src={object.pictures[0]} />
                                    <div className='card-body'>
                                        <h5 className='card-title'>{object.name} <p className="card-price" style={{ textAlign: 'right' }}>${object.cost}</p></h5>
                                        <h6 className="card-store text-muted">{object.store.name}</h6>
                                        <p>{object.general_description}</p>
                                        <p className="card-info" style={{ display: 'inline-block' }}>{object.tagline}</p>

                                    </div>
                                </Link>
                            </div>

                        </div>

                    )
                })}
            </div>

        )
    }
}

export default ProductCard;