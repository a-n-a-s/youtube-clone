import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./WatchScreen.css";
import WatchMetaData from "../../Components/WatchMetaData/WatchMetaData";
import VideoHorizontal from "../../Components/VideoHorizontal/VideoHorizontal";
import Comments from "../../Components/Comments/Comments";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRelatedVideos,
  getVideoById,
} from "../../Redux/Actions/videos.action";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const WatchScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  const { video, loading } = useSelector((state) => state.selectedVideo);

  const { videos, loading: relatedVideos } = useSelector(
    (state) => state.relatedVideos
  );
  return (
    <Row>
      <Col lg={8}>
        <div className="watchscreen_player">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allowFullScreen
            title={video?.snippet?.title}
          ></iframe>
        </div>
        {!loading ? (
          <WatchMetaData video={video} videoId={id} />
        ) : (
          <h6>Loading</h6>
        )}
        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>
      <Col lg={4}>
        {!loading ? (
          videos
            ?.filter((video) => video.snippet)
            .map((video) => (
              <VideoHorizontal video={video} key={video.id.videoId} />
            ))
        ) : (
          <SkeletonTheme color="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="130px" count={20} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
