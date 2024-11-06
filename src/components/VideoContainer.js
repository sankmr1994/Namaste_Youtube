import React, { useEffect } from "react";
import { YOUTUBE_API } from "../utils/constants";
import VideoCard, { withoutStatisticsVideoCard } from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addVideos } from "../utils/videoSlice";

const VideoContainer = () => {
  const videos = useSelector((store) => store.video.videos);
  const dispatch = useDispatch();
  const VideoCardWithoutStatistics = withoutStatisticsVideoCard(VideoCard);

  let videoId;

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_API);
    const json = await data.json();
    dispatch(addVideos(json.items));
  };

  if (videos.length === 0) {
    return null;
  }

  return (
    videos.length && (
      <div className="flex flex-wrap">
        {videos.map((video, index) => {
          videoId = !video.statistics ? video.id.videoId : video.id;
          return (
            <Link key={index} to={"/watch?v=" + videoId}>
              {video.statistics ? (
                <VideoCard videoInfo={video} />
              ) : (
                <VideoCardWithoutStatistics videoInfo={video} />
              )}
            </Link>
          );
        })}
      </div>
    )
  );
};

export default VideoContainer;
