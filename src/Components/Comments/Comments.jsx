import React from "react";
import "./Comments.css";
import Comment from "../Comment/Comment";
import { useEffect ,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsOfVideoById , addComment } from "../../Redux/Actions/comments.action";
const Comments = ({ videoId , totalComments }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [videoId, dispatch]);

  const comments = useSelector((state) => state.commentList.comments);
  const [text, setText] = useState('');
  const _comments = comments?.map(
    (comments) => comments.snippet?.topLevelComment?.snippet
  );
  const handleComment = (e) => {
    e.preventDefault();
    if(text.length === 0) return
    dispatch(addComment(videoId ,text ))
    setText('')
  };
  return (
    <div className="comments mt-5">
      <p>{totalComments} Comments</p>
      <div className="comment_form d-flex w-100 my-2">
        <img
          src="https://yt3.ggpht.com/IEWg4-eNZ6CLh_Y3Q5exPKhAc28B_V7QzufdZ2FUrlgtjBpiQwxS9yiiBLS1r1ngFSn8k3NWhw=s88-c-k-c0x00ffffff-no-rj-mo"
          alt=""
          className="rounded-circle mr-3"
        />
        <form
          className="comments_form d-flex flex-grow-1"
          onSubmit={handleComment}
        >
          <input
            type="text"
            className="flex-grow-1 px-4"
            placeholder="Write a Comment..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button className=" border-0 btn-sm py-2">Comment</button>
        </form>
      </div>
      <div className="comment_list mt-3 ">
        {_comments?.map((comment , i) => (
          <Comment comment={comment} key ={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
