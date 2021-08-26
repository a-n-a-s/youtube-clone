import React, { useEffect } from "react";
import "./SubscriptionScreen.css";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getVideosByChannel } from "../../Redux/Actions/videos.action";
import { Container } from "react-bootstrap";
import VideoHorizontal from '../../Components/VideoHorizontal/VideoHorizontal'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const SubscriptionScreen = () => {
  const { query } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosByChannel());
  }, [query, dispatch]);

  const { loading, videos } = useSelector((state) => state.subscriptionChannel);

  return <Container fluid>{!loading ? videos?.map(video => (
      <VideoHorizontal video ={video} key={video.id} subScreen />
  )) : (
      <SkeletonTheme color ="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count ={10} />
      </SkeletonTheme>
  )}</Container>;
};

export default SubscriptionScreen;
