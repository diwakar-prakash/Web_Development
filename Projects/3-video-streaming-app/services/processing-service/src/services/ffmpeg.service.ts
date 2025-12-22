import ffmpeg from "fluent-ffmpeg";

export const transcodeVideo = (inputUrl: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const outputs: string[] = [];

    ffmpeg(inputUrl)
      .output("output-360p.mp4")
      .size("640x360")
      .on("end", () => {
        outputs.push("output-360p.mp4");
        resolve(outputs);
      })
      .on("error", reject)
      .run();
  });
};
