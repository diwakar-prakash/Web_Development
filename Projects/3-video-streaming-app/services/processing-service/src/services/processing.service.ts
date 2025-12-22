import { VideoUploadedEvent } from "../types/events.js";
import { transcodeVideo } from "./ffmpeg.service.js";

export const processVideo = async ( event : VideoUploadedEvent ) => {
    console.log("Processing Video: ", event.videoId);

    const outputs = await transcodeVideo(event.rawVideoUrl); 

    console.log("Generated Outputs: ", outputs);
}