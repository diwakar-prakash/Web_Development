import Video from "../models/video.model.js";

export const createVideoMetaData = async ({
  title,
  description,
  thumbnailUrl,
  ownerId,
}) => {
  return await Video.create({
    title,
    description,
    thumbnailUrl,
    ownerId,
  });
};


export const getVideoById = async (videoId) => {
    return await Video.findById(videoId);
}

export const listPublicVideo = async () => {
    return await Video.find({
        visibility : "PUBLIC",
        status : "READY"
    });
}

export const updateVideoStatus = async (videoId, status) => {
    return await Video.findByIdAndUpdate(
        videoId,
        {
            status
        },
        {
            new : true
        }
    )
}

export const updateViewNumber = async (videoId) => {
    return await Video.findByIdAndUpdate(
        videoId,
        {
            $inc : { views : 1 }
        }
    )
}
