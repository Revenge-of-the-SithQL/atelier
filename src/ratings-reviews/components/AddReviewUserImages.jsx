import React, { memo } from 'react';

const AddReviewUserImages = ({ photos }) => (
  <div className='user-image-wrapper'>
    {
      photos.map((image) => <img key={image} src={image} alt='User upload' />)
    }
  </div>
);

export default memo(AddReviewUserImages);
