import { User } from "../models/user.models.js";
import { Video } from "../models/video.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



// Get public channel videos
const getPublicChannelVideos = asyncHandler(async (req, res) => {
  const { userName } = req.params;
  const user = await User.findOne({ userName: userName.toLowerCase() });
  
  if (!user) {
    throw new ApiError(404, "Channel not found");
  }

  const videos = await Video.find({ 
    owner: user._id,
    isPublished: true 
  }).select("title thumbnail duration views createdAt");

  return res.status(200).json(
    new ApiResponse(200, { videos }, "Videos fetched successfully")
  );
});

// Get public channel stats
const getPublicChannelStats = asyncHandler(async (req, res) => {
  const { userName } = req.params;
  const user = await User.findOne({ userName: userName.toLowerCase() });
  
  if (!user) {
    throw new ApiError(404, "Channel not found");
  }

  const stats = {
    totalSubscribers: await Subscriptions.countDocuments({ channel: user._id }),
    totalVideos: await Video.countDocuments({ 
      owner: user._id,
      isPublished: true 
    }),
    totalViews: await Video.aggregate([
      { 
        $match: { 
          owner: user._id,
          isPublished: true 
        } 
      },
      { 
        $group: { 
          _id: null, 
          total: { $sum: "$views" } 
        } 
      }
    ]).then(res => res[0]?.total || 0)
  };

  return res.status(200).json(
    new ApiResponse(200, stats, "Channel stats fetched successfully")
  );
});


export {getPublicChannelVideos, getPublicChannelStats}