import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from '../star-rating/StarRating.jsx';
import Price from '../overview/Price.jsx';
import './styles/productCardStyles.css';

const ProductCard = ({ id, productCardClick }) => {
  const [imageURL, setImageURL] = useState('https://i.imgur.com/mYzivnl.png');
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [originalPrice, setOriginalPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios.get(`/products/${id}/styles`)
      .then(({ data }) => {
        var defaultIndex = data.results.findIndex((style) => style['default?'] === true);
        defaultIndex === -1 ? defaultIndex = 0 : defaultIndex = defaultIndex;
        setOriginalPrice(data.results[defaultIndex].original_price);
        setSalePrice(data.results[defaultIndex].sale_price);
        if (data.results[defaultIndex].photos[0].url) {
          setImageURL(data.results[defaultIndex].photos[0].url);
        }
      })
      .catch((err) => {
        console.log(`Failed to retrieve styles for product ID: ${id}`)
      })
    axios.get(`/products/${id}`)
      .then(({ data }) => {
        setName(data.name);
        setCategory(data.category);
      })
      .catch((err) => {
        console.log('Failed to retrieve product information')
      })
    axios.get(`/reviews/meta/?product_id=${id}`)
      .then(({ data }) => {
        var r = data.ratings;
        setRating((Number(r[1]) + (Number(r[2]) * 2) + (Number(r[3]) * 3) + (Number(r[4]) * 4) + (Number(r[5]) * 5)) / (Number(r[1]) + Number(r[2]) + Number(r[3]) + Number(r[4]) + Number(r[5])))
      })
  }, [id]);

  return (
    <div onClick={() => {productCardClick(id)}} className="product-card">
      <div className="image-container"><img src={imageURL}></img></div>
      <h5>{category}</h5>
      <h3>{name}</h3>
      <Price selectedStyle={{original_price: originalPrice, sale_price: salePrice}} />
      <StarRating rating={rating} />
    </div>
  );
};

export default ProductCard;