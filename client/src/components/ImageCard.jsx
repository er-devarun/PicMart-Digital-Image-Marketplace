import React, { useState } from 'react'
import PopupModal from './PopupModal';

function ImageCard({id, img, title, price, author, authorId, icon1, icon2, purchaseImage, downloadImage}) {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <div className="card-container" onClick={() => setIsOpen(true)}>
        <div className="photo-container">
            <img src={img} alt="" />
        </div>
    </div>
    <PopupModal isOpen={isOpen} img={img} title={title} price={price} author={author} authorId={authorId} icon1={icon1} icon2={icon2} setIsOpen={setIsOpen} purchaseImage={purchaseImage} id={id} downloadImage={downloadImage}/>
    </>
  )
}

export default ImageCard;
