import { Router } from "express";
import { getAlbumById, getAllAlbums } from "../controller/album.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.get('/', getAllAlbums);
router.get("/:albumId", getAlbumById);

export default router;