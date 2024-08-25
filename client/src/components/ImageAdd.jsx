import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useUpload } from '../hooks/useUpload';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ProgressBar from '@ramonak/react-progress-bar';

function ImageAdd() {
  const [progress, setProgress] = useState(0);
  const DEFAULT_IMG_URL = "https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw"
  const [addImageForm, setAddImageForm] = useState({
    title: "",
    price: "",
    image: "",
  })


  const author = useSelector(state => state.auth.author);

  function onUploadProgress(progressEvent){
    setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
  }

  const handleChange = (e) => {
    setAddImageForm((prevData) => {
      if(e.target.name != "image"){
        return {...prevData, [e.target.name]: e.target.value}
      } else{
        return {...prevData, [e.target.name]: e.target.files[0]}
      }
    })
  }

  // console.log(addImageForm);
  // console.log("Create object", URL.createObjectURL(objectURL));




  async function handleSubmit(e){
    e.preventDefault();
    try {
      if(!addImageForm.title || !addImageForm.price){
        return toast.error("Please fill all the fields.");
      }
      if(addImageForm.title.trim() == "" || addImageForm.price.trim() == ""){
        return toast.error("Please fill all the fields.");
      }
      const { public_id, secure_url } = await useUpload({image:addImageForm.image, onUploadProgress});
      if(!public_id || !secure_url){
        return toast.error("Please fill all the fields.");
      }

      const res = await axios.post(import.meta.env.VITE_API_URL+"/post/create", 
      {
        title: addImageForm.title,
        price: addImageForm.price,
        image: secure_url,
        publicId: public_id,
        author,
      }, 
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        }
      })

      const data = await res.data;
      if(data.success === true){
        toast.success(data.message);
        setAddImageForm({
          title: "",
          price: "",
          image: "",
        })
        setProgress(0);
        e.target.reset();
      }


    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='add-img-card'>
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <div className='add-img'>
            <img src={ addImageForm.image ? URL.createObjectURL(addImageForm.image) : DEFAULT_IMG_URL} alt="" />
        </div>

        {/* Progress Bar */}
        {progress > 0 && <ProgressBar completed={progress} transitionTimingFunction="ease-in-out"/>}

        <div className='input-field upload-img'>
            <label htmlFor="image">Image</label>
            <input type="file" name="image" id="image" onChange={handleChange}/>
        </div>

        <div className='input-field title-img'>
            <label htmlFor="title">Title</label>
            <input type="text" name='title' id='title' placeholder='Himalaya Mountain' onChange={handleChange}/>
        </div>

        <div className='input-field price-img'>
            <label htmlFor="price">Price ($)</label>
            <input type="text" name='price' id='price' placeholder='45' onChange={handleChange}/>
        </div>
        <button>Add Product</button>
      </form>
    </div>
  )
}

export default ImageAdd
