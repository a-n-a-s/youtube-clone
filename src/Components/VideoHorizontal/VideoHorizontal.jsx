import React from "react";
import "./VideoHorizontal.css";
import { AiFillEye } from "react-icons/ai";
import { useEffect, useState } from "react";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
const VideoHorizontal = ({ video, searchScreen , subScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
      resourceId,
    },
  } = video;

  const isVideo = !(id.kind === 'youtube#channel' || subScreen)
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  useEffect(() => {
    const getVidoeDetails = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };

    getVidoeDetails();
  }, [id]);
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
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const history = useHistory();
  const _channelId = resourceId?.channelId || channelId
  const handleClick = () => {
    isVideo
      ? history.push(`/watch/${id.videoId}`)
      : history.push(`/channel/${_channelId}`);
  };


  const thumbnail = !isVideo && "videoHorizontal_thumbnail-channel";

  return (
    <Row
    className='py-2 m-1 videoHorizontal align-items-center'
    onClick={handleClick}>
    {/* //TODO refractor grid */}
    <Col
       xs={6}
       md={searchScreen || subScreen ? 4 : 6}
       className='videoHorizontal_left'>
       <img
          src={medium.url}
          className={`videoHorizontal_thumbnail ${thumbnail} `}
          wrapperClassName='videoHorizontal_thumbnail-wrapper'
       />
       {isVideo && (
          <span className='videoHorizontal_duration'>{_duration}</span>
       )}
    </Col>
    <Col
       xs={6}
       md={searchScreen || subScreen ? 4 : 6}
       className='p-0 videoHorizontal_right'>
       <p className='mb-1 videoHorizontal_title'>{title}</p>

       {isVideo && (
          <div className='videoHorizontal_details'>
             <AiFillEye /> {numeral(views).format('0.a')} Views •
             {moment(publishedAt).fromNow()}
          </div>
       )}

       {(searchScreen || subScreen) && (
          <p className='mt-1 videoHorizontal_desc'>{description}</p>
       )}

       <div className='my-1 videoHorizontal_channel d-flex align-items-center'>
          {isVideo && (
             <img src={channelIcon}  />
          )}
          <p className='mb-0'>{channelTitle}</p>
       </div>
       {subScreen && (
          <p className='mt-2'>
             {video.contentDetails.totalItemCount} Videos
          </p>
       )} 
    </Col>
 </Row>
  );
};

export default VideoHorizontal;
