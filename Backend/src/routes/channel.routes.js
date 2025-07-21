import { Router } from "express";
import {getPublicChannelStats, getPublicChannelVideos} from '../controllers/PublicChannel.controller.js'

const router = Router()

router.route("/c/:userName/videos").get(getPublicChannelVideos);
router.route("/c/:userName/stats").get(getPublicChannelStats);

export default router