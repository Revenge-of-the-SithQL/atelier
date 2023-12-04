import React, { useState } from 'react';
import { addAnswer } from '../lib/fetchFunctions.js';
import { validateForm } from '../lib/helperFunctions.js';
import UploadImages from './UploadImages.jsx';

const AddAnswerForm = ({ questionId, questionBody, productName, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    body: '',
    name: '',
    email: '',
    photos: [],
  });

  const [formErrors, setFormErrors] = useState([]);
  const [upload, setUpload] = useState(false);

  const updateFormDataValue = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleAddAnswer = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(formData));
    if (formErrors.length) { return; }
    addAnswer(questionId, formData)
      .then(() => {
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='qa-modal-container'>
      <div className='qa-close-modal'>
        <button type='button' onClick={() => { setIsModalOpen(false); }}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='qa fill' data-testid='close-modal'>
            <path fillRule='evenodd' d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z' clipRule='evenodd' />
          </svg>
        </button>
      </div>
      <div className='qa-form-heading'>
        <h2>SUBMIT YOUR ANSWER</h2>
        <h4>
          {`${productName}: ${questionBody}`}
        </h4>
      </div>
      <div className='qa-form-container'>
        <form data-testid='answer-form' onSubmit={handleAddAnswer} onChange={() => { setFormErrors([]); }}>
          <p className='qa-form-label'>
            Nickname
            <span className='qa-required-input'>*</span>
          </p>
          <input
            className='qa-input'
            type='text'
            placeholder='Example: jack543!'
            maxLength={60}
            onChange={(e) => { updateFormDataValue(e, 'name'); }}
          />
          <p className='qa-label-description'>For privacy reasons, do not use your full name or email address</p>
          <p className='qa-form-label'>
            Email
            <span className='qa-required-input'>*</span>
          </p>
          <input
            className='qa-input'
            type='text'
            placeholder='Example: jack@email.com'
            maxLength={60}
            onChange={(e) => { updateFormDataValue(e, 'email'); }}
          />
          <p className='qa-label-description'>For authentication reasons, you will not be emailed</p>
          <p className='qa-form-label' data-testid='qa-answer-label'>
            Answer
            <span className='qa-required-input'>*</span>
          </p>
          <textarea
            className='qa-textbox'
            type='text'
            maxLength={1000}
            onChange={(e) => { updateFormDataValue(e, 'body'); }}
          />
          {
            upload
              && <UploadImages formData={formData} setFormData={setFormData} />
          }
          <div className='qa-submit-form'>
            <button type='button' className='qa-display-upload-input' onClick={() => { setUpload(true); }}>
              UPLOAD IMAGES
            </button>
            <button type='submit'>
              SUBMIT
            </button>
          </div>
          {
            formErrors.length > 0 && (
              <div className='qa-form-error'>
                You must enter the following:
                <ul>
                  {formErrors.map((message) => (<li key={message}>{message}</li>))}
                </ul>
              </div>
            )
          }
        </form>
      </div>
    </div>
  );
};

export default AddAnswerForm;
