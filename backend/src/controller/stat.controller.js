import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";

export const getTotalStats = async (req, res, next) => {
    try {
        // const totalSongs = await Song.countDocuments();
        // const totalUsers = await User.countDocuments();
        // const totalAlbum = await Album.countDocuments();

        // get all total stats together at one time
        const [totalSongs, totalUsers, totalAlbum] = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),

            // fetch all the songs
            Song.aggregate([
                {
                    // combine the songs collection with the albums collection
                    $unionWith: {
                    coll: "albums",
                    pipeline: [], // empty pipeline indicates no additional operations are performed on the albums collection during the union
                    },
                },
                {
                    // the '$group' stage groups all documents by the 'artist' field
                    $group: { _id: "$artist", }, // each unique artist will represent one group
                },
                {
                    $count: "count", // the '$count' stage counts the total number of unique groups
                },
            ]),
        ]);

        res.status(200).json({ 
            totalSongs, 
            totalUsers, 
            totalAlbum,
            totalArtists: uniqueArtist[0]?.count || 0
        });
    } catch (error) {
        console.log("Error in getTotalStats", error);
        next(error);
    }
}