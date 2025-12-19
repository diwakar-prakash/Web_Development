import * as VideoService from '../services/video.service.js'

export const createVideoInfo = async ( req , res ) => {
    try {
        const { title, description, thumbnailUrl } = req.body;

        if(!title || !thumbnailUrl ) {
            return res.status(400).json({
                message : "Insufficient Credentials"
            })
        }

        const createMeta = await VideoService.createVideoMetaData({
            title,
            description,
            thumbnailUrl,
            ownerId: req.user.userId
        })

        res.status(201).json({
            message : "The video metadata has been created."
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : " An error in uploading the video meta data"
        })
    }
}


export const getVideo = async ( req , res ) => {
    try {
        const videoId = req.params.id;

        if(!videoId) {
            return res.status(400).json({
                message : "The videoId is not present in the get video section"
            })
        }

        const findIfVideoExists = await VideoService.getVideoById(videoId);
        if(!findIfVideoExists) {
            return res.status(401).json({
                message : "No such video found with the video id"
            })
        }

        if(findIfVideoExists.visibility === "PRIVATE" && findIfVideoExists.ownerId.toString() !== req.user.userId) {
            return res.status(401).json({
                message : "Forbidden"
            })
        }

        res.status(200).json({
            message : "The following is the information about the video",
            video : findIfVideoExists
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : "Error in getting the video"
        })
    }
}


export const getAllVideo = async ( req , res ) => {
    try {
        const getVideo = await VideoService.listPublicVideo();

        res.status(200).json({
            message : "The following are all the videos of the users",
            allVideos: getVideo
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : "Received Error in getting all the videos"
        })
    }
}

export const updateStatus = async ( req , res ) => {
    try {
        const { status } = req.body;
        const videoId = req.params.id;

        if(!status || !videoId) {
            return res.status(400).json({
                message : "Status or VideoId not present to change the video status in ( Video Service )"
            })
        }

        const update = await VideoService.updateVideoStatus(videoId, status);

        res.status(200).json({
            message : "The status of the video has been updated to the following (video-service)",
            status : update.status,
            video : update
        })
    }
    catch ( err ) {
        res.status(401).json({
            message : "Error in updating the status of video in video-service"
        })
    }
}

export const updateView = async ( req , res ) => {
    try {
        const videoId = req.params.id;

        const updateViews = await VideoService.updateViewNumber(videoId);

        res.status(200).json({
            message : "The Video Views have been updated",
            views : updateViews.views
        })
    }
    catch ( err ) {
        res.status(500).json({
            message : "Error in updating the view counter {video-service}"
        })
    }
}