import React from 'react';

const ImgMain = ({ url, inExpandedView, changeView }) => {
  return (
    <div>
      {!inExpandedView
        ? <img className='overview-img-main-default' src={url} onClick={() => { changeView() }} />
        : <img className='overview-img-main-expanded' src={url} onClick={() => { console.log('Zoom!') }} />
      }
    </div>
  );
}

export default ImgMain;