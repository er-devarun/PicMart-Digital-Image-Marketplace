import React, { useEffect } from 'react'
import ImageCard from './ImageCard';
import { FaShoppingCart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setAllPosts } from '../store/slices/postSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function PhotoGallery() {
  const allPosts = useSelector(state => state.post.allPosts);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function getAllPosts(){
    if(allPosts.length > 0){
      return;
    }

    try {
      const res = await axios.get(import.meta.env.VITE_API_URL+"/post/getAll");
      const data = res.data;
      if(data.success == true){
        console.log(data);
        dispatch(setAllPosts(data.data));
      }
    } catch (error) {
      console.log("Error is ", error);
    }
  }

  async function purchaseImage(price, id, postUrl, author, title) {
    if(!isAuthenticated){
      toast.error("Please login to purchase asset");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/payment/generate", 
        {
          price,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        }
      );


      console.log( "Razorpay success", res);
      const data = res.data;
      if(data.success == true){
        handlePaymentVerify(data.data, id, postUrl, author, title, price);
      }

    } catch (error) {
      console.log("Razorpay error", error);
      // toast.error(error.response.data.messaage);
    }
  }

  async function handlePaymentVerify(data, id, postUrl, author, title, price) {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Arun Devadiga",
      order_id: data.id,
      theme: {
        color: "#5f63b8",
      },
      handler: async (response) => {
        try {
          const res = await axios.post(import.meta.env.VITE_API_URL + "/payment/verify", 
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              postId: id,
              postUrl,
              author,
              title,
              price,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
              withCredentials: true,
            }
          )

          console.log(res);
          const data = res.data;
          toast.success(data.message);
          
        } catch (error) {
          console.log("getting error", error);
          // toast.error(error.response.data.message);
        }
      }
    }

    const razorpayWindow = new window.Razorpay(options);
    razorpayWindow.open();
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  console.log("All posts = ", allPosts);

  return (
    <div className='photo-gallery'>
      <h3>Photo Gallery</h3>
      <div className="gallery">
        {allPosts?.map(({_id, image, title, price, author, authorId}) => <ImageCard key={_id} id={_id} img={image} title={title} price={price} author={author} authorId={authorId} icon1={<FaShoppingCart title='Cart' onClick={() => purchaseImage(price, _id, image, author, title)}  className='icon'/>} icon2={<IoIosHeart className='icon heart'/>} purchaseImage={purchaseImage}/>)}
      </div>
    </div>
  )
}

export default PhotoGallery;
