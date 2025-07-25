import { Router } from "express";
import {changeCurrentPassword, getCurrentUser, getUserChannelProfile, getUserWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateUserAvatar, updateUserCoverImage, updateUserDetails} from "../controllers/user.controller.js"
import {Upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
//

const router = Router()

/* router.route("/register").post(
    Upload.fields([                  // to use multer for file uploads - as a middleware
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "coverImage",
            maxCount : 1
        }
    ]),
    registerUser
) */

router.route("/register").post(
  Upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  (err, req, res, next) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: "File too large (max 5MB)" });
      }
      return res.status(400).json({ error: err.message });
    }
    next();
  },
  registerUser
);
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateUserDetails)
router.route("/update-avatar").patch(verifyJWT, Upload.single("avatar"), updateUserAvatar)
router.route("/update-coverImage").patch(verifyJWT, Upload.single("coverImage"), updateUserCoverImage)
router.route("/c/:userName").get(getUserChannelProfile)         // "/c/:userName" =>  because we need to get username from params(url)
router.route("/history").get(verifyJWT, getUserWatchHistory)

export default router;