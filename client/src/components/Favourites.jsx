import axios from 'axios';
import React, { useEffect } from 'react'
import DashboardHeader from './DashboardHeader';
import ImageCard from './ImageCard';
import { useDispatch, useSelector } from 'react-redux';
import { setMyFavourites } from '../store/slices/postSlice';
import toast from 'react-hot-toast';
import { FaShoppingCart } from 'react-icons/fa';

function Favourites() {
  const favourites = useSelector(state => state.post.myFavourites);
  const dispatch = useDispatch();
  
  async function getFavouritesPosts(){
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/post/favourites", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        }
      })

      const data = await res.data;
      if(data.success == true){
        dispatch(setMyFavourites(data.data));
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Internal Server Error");
    }
  }

  useEffect(() => {
    getFavouritesPosts();
  }, [])

  return (
    <div>
      <DashboardHeader/>

      <div className='purchase-image'>
        {favourites?.map(({_id, image, title, price, author}) => <ImageCard key={_id} id={_id} img={image} title={title} price={price} author={author} icon2={<FaShoppingCart/>}/>)}
      </div>
    </div>
  )
}

export default Favourites;
