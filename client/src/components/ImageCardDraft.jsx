import React, { useState } from 'react'
import PopupModal from './PopupModal';

function ImageCard({id, img, title, price, author, icon1, icon2}) {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <div className="card-container" onClick={() => setIsOpen(true)}>
        <div className="photo-container">
            <img src={img} alt="" />
        </div>
        <span className='author'>{"@" + author.charAt(0).toUpperCase() + author.slice(1)}</span>
        <div className='card-info'>
            <div className='card-text'>
                <h3>{title}</h3>
                <p>Price: ${price}</p>
            </div>
            <div className='card-icon-container'>
                {icon1}
                {icon2}
            </div>
        </div>
    </div>
    <PopupModal isOpen={isOpen} img={img} title={title} price={price} author={author} icon1={icon1} icon2={icon2} setIsOpen={setIsOpen}/>
    </>
  )
}

export default ImageCard;
