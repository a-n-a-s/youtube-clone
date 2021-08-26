import React from "react";
import { useEffect } from "react";
import { Col  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../../Components/Categories/Categories";
import Video from "../../Components/Video/Video";
import { getMostPopularVideos, getVidoesByCategory } from "../../Redux/Actions/videos.action";
import "./HomeScreen.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeletons from "../../Components/Skeletons/Skeletons";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMostPopularVideos());
  }, [dispatch]);
  const { videos , activeCategory , loading } = useSelector((state) => state.homeVideos);
  const fetchData = () => {
    if(activeCategory === 'ALL') dispatch(getMostPopularVideos());
    else{
      dispatch(getVidoesByCategory(activeCategory))
    }
  };
  return (
    <div className="container">
      <Categories />
      
        <InfiniteScroll
          dataLength={100}
          next={fetchData}
          hasMore={true}
          loader={
            <div className="spinner-border text-danger d-block mx-auto "></div>
          }
          className="row hide"
        >
          {!loading ? videos?.map((video) => (
            <Col lg={3} md={4}>
              <Video video={video} key={video.id} />
            </Col>
          )  
          ) : [...Array(20)].map(()=>(
            <Col lg={3} md ={4}>
              <Skeletons/>
            </Col>
          ))}
        </InfiniteScroll>
    </div>
  );
};

export default HomeScreen;
