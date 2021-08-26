import React from "react";
import "./video.css";
import { AiFillEye } from "react-icons/ai";
import { useEffect, useState } from "react";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { useHistory } from "react-router-dom";

const Video = ({ video , channelScreen}) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  const _videoId = id?.videoId || contentDetails?.videoId || id;
  const history = useHistory();
  useEffect(() => {
    const getVidoeDetails = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };

    getVidoeDetails();
  }, [_videoId]);
  useEffect(() => {
    const getChannelDetails = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default.url);
    };
    getChannelDetails();
  }, [channelId]);
  const handleVideoClick = () => {
    history.push(`/watch/${_videoId}`);
  };
  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video_top">
        <img src={medium.url} alt="" />

        <span className="duration">{_duration}</span>
      </div>
      <div className="video_title">{title}</div>
      <div className="video_details">
        <span>
          <AiFillEye />
        </span>
        <span>{numeral(views).format("0.a").toUpperCase()} Views</span>

        <span>•</span>
        <span> {moment(publishedAt).toNow()}</span>
      </div>
      {!channelScreen && (
        <div className="video_channel">
          <img src={channelIcon} alt="" />
          <p>{channelTitle}</p>
        </div>
      )}
    </div>
  );
};

export default Video;
