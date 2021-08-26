import axios from "axios";

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params: {
    key: 'AIzaSyDiihXK0YJH_dbEVBtoXmoK_4O58xueI14',
  },
});
export default request;
