import axios from 'axios'
import React, { useState } from 'react'

function UploadVideo() {
  const id = useId();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubmit = async(e)=>{
    e.preventDefault()

    if(!title || !description || !video){
      alert("Fill in all the required fields")
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('desciption', description)
    formData.append('video', video)
    formData.append('thumbnail', thumbnail)

    try {
      const res = await axios.post('/v1/videos/', formData, {headers: {"Content-Type" : "multipart/form-data"}})
      console.log(res.data)
      alert("Video upload successful")
    } catch (error) {
      alert("Video upload  failed")
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='id-tit'>Title: (required)</label>
          <input placeholder='Enter video title'
          type='text'
          onChange={(e)=>setTitle(e.target.value)}
          value={title}
          maxLength={100}
          minLength={10}
          ref={id-tit}
          />
        </div>
        <div>
          <label htmlFor='id-desc'>Desciption: (required)</label>
          <textarea
           onChange={(e)=>setDescription(e.target.value)}
           id='id-desc'
           value={description}
          />
        </div>
        <div>
          <label htmlFor='id-vid'>Upload video: (required)</label>
          <input 
           type='file'
           accept='video/*'
           id='id-vid'
           onChange={(e)=>setVideo(e.target.files[0])}
           value={video}
           />
        </div>
        <div>
          <label htmlFor='id-thumb'>Upload thumbnail:</label>
          <input
           id='id-thumb'
           type='file'
           accept='image/*'
           onChange={(e)=>setThumbnail(e.target.files[0])}
           value={thumbnail}/>
        </div>
        <button type='submit'>
          Upload
        </button>
      </form>
    </div>
  )
}

export default UploadVideo