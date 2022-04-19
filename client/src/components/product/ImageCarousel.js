import {React} from 'react';
import Carousel from 'react-bootstrap/Carousel'
export default function  ImageCarousel(props) {
    let imageUrls = props.imageUrls
    return (
        <Carousel variant="dark">
            {imageUrls.map(url => (
                <Carousel.Item key={url}>
                    <img
                        className="d-block w-100"
                        src={url}
                        alt={url}
                    />
                </Carousel.Item>))}
        </Carousel>
    );
}