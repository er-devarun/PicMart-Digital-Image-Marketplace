import React from 'react'
import ImageCard from './ImageCard';
import { IoIosHeart } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function MyPostContainer() {
    const myPosts = useSelector(state => state.post.myPosts);
  return (
    <div className='my-post-container'>
        {myPosts?.map(({_id, image, title, price, author}) => <ImageCard id={_id} img={image} title={title} price={price} author={author} icon1={<FaShoppingCart className='icon'/>} icon2={<IoIosHeart className='icon heart'/>}/>)}
    </div>
  )
}

export default MyPostContainer;
