import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './ProductList.jsx';
import './styles/relatedProductsAndComparisonStyles.css';

const RelatedProductsAndComparison = ({ currentProduct, setCurrentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [outfitProducts, setOutfitProducts] = useState([-1]);

  useEffect(() => {
    axios.get(`/products/${currentProduct}/related`)
      .then(({ data }) => {
        const uniqueRelatedProducts = data.filter((value, index, array) => array.indexOf(value) === index);
        setRelatedProducts(uniqueRelatedProducts);
      })
      .catch((err) => {
        console.log(`Failed to retrieve related products for Product ID: ${currentProduct}`);
      })
  }, [currentProduct]);

  const productCardClickHandler = (id) => {
    setCurrentProduct(id);
  };

  const addToOutfitHandler = () => {
    if (outfitProducts.includes(currentProduct)) {
      console.log(`Product ID: ${currentProduct} already in Your Outfit`);
    } else {
      setOutfitProducts([-1, currentProduct].concat(outfitProducts.slice(1)));
      console.log(`Product id: ${currentProduct} added to Your Outfit`);
    }
  };

  const removeFromOutfitHandler = (id) => {
    setOutfitProducts(outfitProducts.filter((productId) => productId !== id));
    console.log(`Product id: ${id} removed from Your Outfit`);
  };

  return (
    <div>
      <h2>RELATED PRODUCTS</h2>
      <ProductList  products={relatedProducts} productCardClick={productCardClickHandler} isYourOutfit={false} />
      <h2>YOUR OUTFIT</h2>
      <ProductList  products={outfitProducts} productCardClick={removeFromOutfitHandler} isYourOutfit={true} addToOutfit={addToOutfitHandler} />
    </div>
  )
};

export default RelatedProductsAndComparison;