import React, { useState } from 'react';
import axios from 'axios';

const AddQuestionForm = ({ productId, productName, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    body: '',
    name: '',
    email: '',
    product_id: productId,
  });
  const [formErrors, setFormErrors] = useState([]);

  const isValidEmail = (email) => {
    if (email.indexOf('@') === -1) {
      return false;
    }

    const fromIndex = email.indexOf('@') + 1;
    if (email.indexOf('.', fromIndex) === -1) {
      return false;
    }

    return true;
  };

  const validateForm = (form) => {
    const errors = [];
    if (!form.body || !form.name || !form.email) {
      errors.push('Please fill out the required (*) fields');
    }
    if (form.email && isValidEmail(form.email) === false) {
      errors.push('Please make sure the email is formatted correctly');
    }
    return errors;
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(formData));
    if (formErrors.length) { return; }
    axios.post('/qa/questions', formData)
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
        <button type='button' onClick={() => { setIsModalOpen(false); }}>X</button>
      </div>
      <div className='qa-form-heading'>
        <h2>ASK YOUR QUESTION</h2>
        <h4>{`About the ${productName}`}</h4>
      </div>
      <div className='qa-form-container'>
        <form onSubmit={handleAddQuestion}>
          <div className='qa-form-row'>
            <label htmlFor='nickname-input' className='qa-input-label'>
              Nickname
              <span className='qa-required-input'> *</span>
            </label>
            <input
              id='nickname-input'
              className='qa-input'
              name='nickname-input'
              type='text'
              placeholder='Example: jackson11!'
              maxLength={60}
              onChange={(e) => { setFormData({ ...formData, name: e.target.value }); }}
            />
            <p>For privacy reasons, do not use your full name or email address</p>
            <label htmlFor='email-input' className='qa-input-label'>
              Email
              <span className='qa-required-input'> *</span>
            </label>
            <input
              id='email-input'
              className='qa-input'
              name='email-input'
              type='text'
              placeholder='Example: jack@email.com'
              maxLength={60}
              onChange={(e) => { setFormData({ ...formData, email: e.target.value }); }}
            />
            <p>For authentication reasons, you will not be emailed</p>
          </div>
          <div className='qa-form-row'>
            <label htmlFor='question-input' className='qa-input-label'>
              Question
              <span className='qa-required-input'> *</span>
            </label>
            <textarea
              id='question-input'
              className='qa-input'
              name='question-input'
              type='text'
              maxLength={1000}
              onChange={(e) => { setFormData({ ...formData, body: e.target.value }); }}
            />
          </div>
          <button type='submit'>
            Submit
          </button>
          {
            formErrors.length > 0 && (
              <div className='qa-form-error-message'>
                You must enter the following:
                <ul>
                  {
                    formErrors.map((message) => <li key={message}>{message}</li>)
                  }
                </ul>
              </div>
            )
          }
        </form>
      </div>
    </div>
  );
};

export default AddQuestionForm;
