import React, { useEffect } from 'react'
import DashboardHeader from '../DashboardHeader';
import ImageAdd from '../ImageAdd';
import MyPostContainer from '../MyPostContainer';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setMyPosts } from '../../store/slices/postSlice';
import toast from 'react-hot-toast';

function PhotoManagement() {
  const dispatch = useDispatch()

  async function getMyPosts(){
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL+"/post/myPosts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        }
      })
      const {data} = res.data;
      console.log(data);
      dispatch(setMyPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    getMyPosts();
  }, [])

  return (
      <div className='dashboard-header-container'>
        <DashboardHeader/>
        <div className='post-manage-box'>
          <ImageAdd/>
          <MyPostContainer/>
        </div>
      </div>
  )
}

export default PhotoManagement;
