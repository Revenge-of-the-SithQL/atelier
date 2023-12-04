import React, { useState } from 'react';
import { v4 as key } from 'uuid';

const UploadImages = ({ formData, setFormData }) => {
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = () => {
    setFormData({ ...formData, photos: [...formData.photos, imageUrl] });
  };

  return (
    <div className='qa-upload-container'>
      {
        formData.photos.length > 0
          && (
            <div className='qa-uploaded'>
              {formData.photos.map((image) => <img key={key()} src={image} alt='user-upload' width={70} height={50} />)}
            </div>
          )
      }
      {
        formData.photos.length < 5
          && (
            <div className='qa-upload-image'>
              <input
                className='qa-input'
                type='text'
                placeholder='Enter image url here'
                onChange={(e) => { setImageUrl(e.target.value); }}
              />
              <button type='button' className='qa-upload-image' onClick={handleUpload}>Upload</button>
            </div>
          )
      }
    </div>
  );
};

export default UploadImages;
