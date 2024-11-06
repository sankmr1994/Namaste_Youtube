import React from "react";

const VideoCard = ({ videoInfo }) => {
  const { snippet, statistics } = videoInfo;
  const { channelTitle, title, thumbnails } = snippet;
  return (
    <div className="p-2 m-2 w-72 shadow-lg">
      <img className="rounded-lg" alt="thumbline" src={thumbnails.medium.url} />
      <ul>
        <li className="font-bold py-2">{title}</li>
        <li>{channelTitle}</li>
        <li>{statistics.viewCount} views</li>
      </ul>
    </div>
  );
};

export const withoutStatisticsVideoCard = (VideoCard) => {
  return ({ videoInfo }) => {
    const { snippet } = videoInfo;
    const { channelTitle, title, thumbnails } = snippet;
    return (
      <div className="p-2 m-2 w-72 shadow-lg">
        <img
          className="rounded-lg"
          alt="thumbline"
          src={thumbnails.medium.url}
        />
        <ul>
          <li className="font-bold py-2">{title}</li>
          <li>{channelTitle}</li>
        </ul>
      </div>
    );
  };
};

export default VideoCard;
