import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.js";

class ProductResults extends React.Component {
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
                        <ProductCard cards={object} key={object._id}/>
                    )
                })}
            </div>

        )
    }
}

export default ProductResults;