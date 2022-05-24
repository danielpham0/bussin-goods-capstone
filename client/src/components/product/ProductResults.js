import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard.js";

class ProductResults extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        card: [],
        type: '',
        btn: false
    }

    componentDidMount() {

        const url = "/api/v1/store/getAllPublicStores"

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({ card: data }))
    }

    render() {
        const bntfiltered = this.props.cards.filter(e => e.type == this.props.type)

        const filtered = this.props.cards.filter(
            e => {
                var inp = this.props.type.toLowerCase()
                return (
                    e.name.toLowerCase().includes(inp) ||
                    e.type.toLowerCase().includes(inp) ||
                    e.tagline.toLowerCase().includes(inp) ||
                    e.general_description.toLowerCase().includes(inp) ||
                    e.store.name.toLowerCase().includes(inp)
                )
            }
        )

        return (

            <div className="row product-cats">
                <h2> Showing results for: {this.props.type}</h2>
                {this.props.btn == true ? (
                    bntfiltered.length == 0 ?
                        <p>Sorry, no results were found :/</p>
                        : (
                            bntfiltered.map((object) => {
                                return (
                                    <ProductCard product={object} key={object._id} />
                                )
                            }))) : (
                    filtered.length == 0 ?
                        <p>Sorry, no results were found :/</p>
                        : (
                            filtered.map((object) => {
                                return (
                                    <ProductCard product={object} key={object._id} />
                                )
                            })))
                }
            </div>
        )
    }
}

export default ProductResults;