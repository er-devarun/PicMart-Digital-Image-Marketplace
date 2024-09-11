import React from 'react'
import { IoClose } from "react-icons/io5";
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';
import toast from 'react-hot-toast';

function PopupModal({ isOpen, img, title, price, author, authorId, icon1, icon2, setIsOpen, purchaseImage, id, downloadImage }) {
  const {pathname} = useLocation()

  async function addToFavourites(authorId, postId){
    try {
      const res = await axios.put(import.meta.env.VITE_API_URL + `/post/addToFavourites/${postId}`, 
        {
          authorId: authorId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          }
        }
    )

    const data = res.data;
    if(data.success == true){
      toast.success(data.message);
    }
    } catch (error) {
      toast.error(error.response?.data.message || "Internal Server Error");
    }
  }

  return (
    createPortal(
      <div className={`popup-modal ${isOpen  ? "active" : ""}`} onClick={(e) => setIsOpen(false)}>
        <div className='popup-content' onClick={(e) => e.stopPropagation()}>
          <IoClose className='popup-close' onClick={() => setIsOpen(false)}/>
          <div className='popup-image-title'>
              <div className='title'>{title}</div>
              <div className='price'>Price: ${price}</div>
          </div>
          <hr />
          <div className='info-container'>
              <div className="author-info">
                  <div className='b1'>{author.charAt(0).toUpperCase()}</div>
                  <div className='b2'>{author.charAt(0).toUpperCase() + author.slice(1)}</div>
              </div>
  
              <div className="image-info">
                  <div className='like-icon' onClick={() => {pathname == "/buyer/profile" ? downloadImage(img, title) : pathname == "/" && addToFavourites(authorId, id)}}>
                   {icon2} { pathname == "/seller/profile" ? "Favourite" : pathname == "/buyer/profile" ? "Download" : "Favourite"}
                  </div>

                  { pathname == "/" &&  <div className='purchase-icon' onClick={() => purchaseImage(price, id, img, author, title)}>
                   {icon1} Purchase
                  </div>}
              </div>
          </div>
          <div className='popup-image-container'>
              <img src={img} alt="" />
          </div>
        </div>
      </div>,
      document.querySelector("#portal")
    )
  )
}

export default PopupModal;
