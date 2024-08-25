import axios from 'axios';
import React, { useMemo } from 'react'
import { IoIosSearch } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { setAllPosts } from '../store/slices/postSlice';

// Debouncing method on search functionality
function debounce(func, delay){
  let timerId = null;

  return function(...args){
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func(...args);
    }, delay)
  }
}

function HeroSection() {
  const dispatch = useDispatch();


  // Applied Debouncing
  async function handleSearch(e){
    console.log(e.target.value);
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + `/post/search?search=${e.target.value}`);

      const data = await res.data;
      if(data.success == true){
        dispatch(setAllPosts(data.data));
      }
    } catch (error) {
      console.error(error.response?.data.message || "Internal Server Error");
    }
  }


const debounceSearch = useMemo(() => debounce(handleSearch, 300), []);

  return (
    <div className='hero-container'>
      <div>
        <h1>Stunning Digital Image Marketplace</h1>
        <p>Over 4.9 million+ high quality stock images, videos and music shared by our talented community.</p>
        </div>
        <form>
          <div>
            <button><IoIosSearch className='search-icon'/></button>
            <input type='search' className='search' id='search' name='search' placeholder='Search for all images on Picmart' onChange={debounceSearch} />
          </div>
        </form>
    </div>
  )
}

export default HeroSection;
