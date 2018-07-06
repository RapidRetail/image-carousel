import ReactDOM from 'react-dom';
import React from 'react';
import Carousel from './Carousel.jsx';

const url = window.location.pathname;

fetch(`/product/${url.split('/')[2]}/images`).then(response => response.json().then((body) => {
  console.log('client side response body:', body);
  const { details, images } = body;
  ReactDOM.render(<Carousel productType={details} images={images} />, document.getElementById('carousel'));
}));
