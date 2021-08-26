import {
  HOME_VIDEO_FAIL,
  HOME_VIDEO_REQUEST,
  HOME_VIDEO_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  RELATED_VIDEO_FAIL,
  SEARCH_VIDEO_REQUEST,
  SEARCH_VIDEO_FAIL,
  SEARCH_VIDEO_SUCCESS,
  SUBSCRIPTIONS_CHANNEL_REQUEST,
  SUBSCRIPTIONS_CHANNEL_SUCCESS,
  SUBSCRIPTIONS_CHANNEL_FAIL,
  CHANNEL_VIDEOS_SUCCESS,
  CHANNEL_VIDEOS_FAIL,
  CHANNEL_VIDEOS_REQUEST,
} from "../actionType";
import request from "../../api";
export const getMostPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEO_REQUEST,
    });
    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });
    dispatch({
      type: HOME_VIDEO_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: "ALL",
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: HOME_VIDEO_FAIL,
      error: error.message,
    });
  }
};
export const getRelatedVideos = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RELATED_VIDEO_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 20,
        type: "video",
      },
    });
    dispatch({
      type: RELATED_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: RELATED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};
export const getVidoesByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEO_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        q: keyword,
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        type: "video",
      },
    });
    dispatch({
      type: HOME_VIDEO_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: HOME_VIDEO_FAIL,
      error: error.message,
    });
  }
};
export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST,
    });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,statistics",
        id: id,
      },
    });
    dispatch({
      type: SELECTED_VIDEO_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SELECTED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getVidoesBySearch = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_VIDEO_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        q: keyword,
        maxResults: 20,

        type: "video , channel",
      },
    });
    dispatch({
      type: SEARCH_VIDEO_SUCCESS,
      payload: {
        videos: data.items,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SEARCH_VIDEO_FAIL,
      error: error.message,
    });
  }
};
export const getSubscribedChannels = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_REQUEST,
    });
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet,contentDetails",

        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: SUBSCRIPTIONS_CHANNEL_FAIL,
      payload: error.response.data,
    });
  }
};

export const getVideosByChannel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_VIDEOS_REQUEST,
    });

    // 1. get upload playlist id
    const {
      data: { items },
    } = await request("/channels", {
      params: {
        part: "contentDetails",
        id: id,
      },
    });
    const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;
    // 2. get the videos using the id
    const { data } = await request("/playlistItems", {
      params: {
        part: "snippet,contentDetails",
        playlistId: uploadPlaylistId,
        maxResults: 30,
      },
    });

    dispatch({
      type: CHANNEL_VIDEOS_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: CHANNEL_VIDEOS_FAIL,
      payload: error.response.data,
    });
  }
};
