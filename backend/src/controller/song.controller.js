import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
    try {
        const songs = await Song.find().sort({ createdAt: -1 }); // newest song will be at top [-1= Descending; 1= Ascending]
        res.status(200).json(songs);
    } catch (error) {
        console.log("Error in getAllSongs", error);
        next(error);
    }
};

export const getFeaturedSongs = async (req, res, next) => {
    try {
        // fetch 6 random songs using mongodb's aggregate function
        const songs = await Song.aggregate([
            { $sample: { size: 6 } }, // The '$sample' stage randomly selects a specified number of documents from the collection based on size
            {   // The '$project' stage is used to include or exclude specific fields in the documents returned by the query [1= include; 0= exclude]
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])

        res.status(200).json(songs);
    } catch (error) {
        console.log("Error in getFeaturedSongs", error);
        next(error);
    }
};

export const getMadeForYouSongs = async (req, res, next) => {
    try {
        // fetch 4 random songs using mongodb's aggregate function
        const songs = await Song.aggregate([
            { $sample: { size: 4 } },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])

        res.status(200).json(songs);
    } catch (error) {
        console.log("Error in getMadeForYouSongs", error);
        next(error);
    }
};

export const getTrendingSongs = async (req, res, next) => {
    try {
        // fetch 4 random songs using mongodb's aggregate function
        const songs = await Song.aggregate([
            { $sample: { size: 4 } },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])

        res.status(200).json(songs);
    } catch (error) {
        console.log("Error in getMadeForYouSongs", error);
        next(error);
    }
};