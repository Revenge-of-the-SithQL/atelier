import React from 'react';

const ImgMain = ({ url, expanded, changeView }) => (

  <button
    className='overview-img-main-default'
    id='overview-img-main'
    type='button'
    aria-label='imgMain'
    style={{
      backgroundImage: `url('${url}')`,
      backgroundSize: '100% 100%',
      objectFit: 'fill',
    }}
    onClick={() => {
      if (!expanded) {
        const thisImg = document.getElementById('overview-img-main');
        const container = document.getElementById('overview');
        container.style.marginTop = '4%';
        container.style.marginBottom = '10%';
        thisImg.style.marginTop = '4%';
        thisImg.style.transform = 'scale(2, 1.25)';
        thisImg.style.left = '27vw';
      } else {
        const thisImg = document.getElementById('overview-img-main');
        const container = document.getElementById('overview');
        container.style.marginTop = '2vh';
        container.style.marginBottom = null;
        thisImg.style.marginTop = null;
        thisImg.style.transform = 'scale(1, 1)';
        thisImg.style.left = null;
      }
      changeView();
    }}
  />
);

export default ImgMain;
