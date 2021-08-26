import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./Reducers/auth.reducer";
import { homeVideosReducer } from "./Reducers/videos.reducer";
import {
  selectedVideoReducer,
  relatedVideoReducer,
  searchVideosReducer,
  subscriptionChannelReducer,
  channelVideosReducer,
} from "./Reducers/videos.reducer";
import { channelDetailsReducer } from "./Reducers/channels.reducer";
import { commentListReducer } from "./Reducers/comments.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentList: commentListReducer,
  relatedVideos: relatedVideoReducer,
  searchVideos: searchVideosReducer,
  subscriptionChannel: subscriptionChannelReducer,
  channelVideos: channelVideosReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
