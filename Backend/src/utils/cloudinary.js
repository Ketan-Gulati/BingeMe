/* import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async function(localFilePath){
    try {
        if(!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto",
            // timeout: 30000 // 30 seconds timeout
        })
        // console.log("file has been uploaded on cloud")
        fs.unlinkSync(localFilePath)
        // console.log("file has been removed from local server")
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null
    }

}

export {uploadOnCloudinary} */


import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configuration with validation
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const uploadOnCloudinary = async (localFilePath, resourceType = 'auto') => {
  try {
    // Validate file exists
    if (!localFilePath || !fs.existsSync(localFilePath)) {
      throw new Error('File not found');
    }

    // Determine resource type from extension
    const ext = path.extname(localFilePath).toLowerCase();
    const finalResourceType = ['mp4', 'mov', 'webm'].includes(ext.slice(1)) 
      ? 'video' 
      : resourceType;

    // Upload options
    const options = {
      resource_type: finalResourceType,
      chunk_size: 6000000, // 6MB chunks for videos
      timeout: 120000, // 2 minutes
      use_filename: true,
      unique_filename: false,
      overwrite: true
    };

    // Upload
    const response = await cloudinary.uploader.upload(localFilePath, options);
    
    // Cleanup
    fs.unlinkSync(localFilePath);
    
    return {
      success: true,
      url: response.secure_url,
      public_id: response.public_id,
      resource_type: response.resource_type,
      duration: response.duration
    };
  } catch (error) {
    // Cleanup and format error
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    
    console.error('Cloudinary Error:', error);
    
    throw {
      success: false,
      status: error.http_code || 500,
      message: error.message || 'Upload failed',
      error: error.error?.message || error.toString()
    };
  }
};

const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    await cloudinary.uploader.destroy(publicId, { 
      resource_type: resourceType 
    });
    return { success: true };
  } catch (error) {
    throw {
      success: false,
      status: error.http_code || 500,
      message: 'Failed to delete file'
    };
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };

//reference from doc
// (async function() {
//     const results = await cloudinary.uploader.upload('./images/my_image.jpg');
//     console.log(results);
//   })();