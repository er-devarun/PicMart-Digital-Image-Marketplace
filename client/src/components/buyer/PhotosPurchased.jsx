import React, { useEffect } from 'react'
import DashboardHeader from '../DashboardHeader';
import ImageCard from '../ImageCard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMyPosts } from '../../store/slices/postSlice';
import { FiDownload } from "react-icons/fi";
import Button from '../Button';
import { IoIosHeart } from 'react-icons/io';

function PhotosPurchased() {
    const myPosts = useSelector(state => state.post.myPosts);
    const dispatch = useDispatch();

    async function getMyPosts(){
        if(myPosts.length > 0){
            return;
        }
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + "/post/myPosts", 
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                    }
                }
            )

            const data = res.data;
            if(data.success == true){
                dispatch(setMyPosts(data.data));
            }
        } catch (error) {
            console.log("getMyPostError = ", error)
        }
    }

    useEffect(() => {
        getMyPosts();
    }, []);

    async function downloadImage(imageUrl, title){
        try {
        //  Fetch the image from image url
            const response = await fetch(imageUrl);
            if(!response.ok) throw new Error("Failed to download image");

        //  Convert the image response to blob
        const blob = await response.blob();
        
        //  Create an object url for the blob
        const url = URL.createObjectURL(blob);
        
        //  Create a temporory anchor element (a) to download the image
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title}.jpg`;

        //  Append the anchor element to the body
        document.body.appendChild(a);

        //  Trigger a click on the anchor element to start the download
        a.click();

        //  Remove the anchor element from the body and revoke the object url
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading the image ", error);
        }   
    }

  return (
    <div>
      <DashboardHeader/>

      <div className='purchase-image'>
        {myPosts?.map(({_id, postUrl, title, price, author}) => <ImageCard key={_id} id={_id} img={postUrl} title={title} price={price} author={author} icon2={<FiDownload onClick={() => downloadImage(postUrl, title)}/>} downloadImage={downloadImage}/>)}
      </div>
    </div>
  )
}

export default PhotosPurchased;
