import React, { useState, useEffect } from 'react';
import QuestionsAndAnswers from './qa/QuestionsAndAnswers.jsx';
import Overview from './overview/Overview.jsx';
import RatingsReviews from './ratings-reviews/RatingsReviews.jsx';
import RelatedProductsAndComparison from './related-products-and-comparison/RelatedProductsAndComparison.jsx';
import { getProductInfo } from './overview/helper-funcs/axios-requests.js';
import { getReviewMetaData } from './ratings-reviews/lib/fetchFunctions.js';
import Navbar from './components/navbar/Navbar.jsx';
import Share from './Share.jsx';

const App = () => {
  const [currentProductId, setCurrentProductId] = useState(40347);
  const [metaData, setMetaData] = useState({});
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('product_id');
    if (id) {
      setCurrentProductId(id);
    }
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      const [product, meta] = await Promise.all([getProductInfo(currentProductId), getReviewMetaData(currentProductId)]);
      setMetaData(meta.data);
      setProductInfo(product.data);
    };
    getInfo();
  }, [currentProductId]);

  return (
    <div>
      <Navbar />
      <Overview productId={currentProductId} reviewsMetaData={metaData} productInfo={productInfo} />
      <RelatedProductsAndComparison
        currentProduct={currentProductId}
        setCurrentProduct={setCurrentProductId}
        currentProductInfo={productInfo}
      />
      <QuestionsAndAnswers productId={currentProductId} productName={productInfo.name} />
      <RatingsReviews id={currentProductId} productName={productInfo.name} metaData={metaData} />
      <Share id={currentProductId} />
    </div>
  );
};

export default App;
