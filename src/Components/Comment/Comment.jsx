import React from "react";
import "./Comment.css";
import moment from "moment";
const Comment = ({comment}) => {
 const {authorDisplayName ,authorProfileImageUrl , textDisplay , publishedAt} = comment; 

  return (
    <div className="comment p-2 d-flex my-4">
      <img
        src={authorProfileImageUrl}
        alt=""
        className="rounded-circle mr-3"
      />
      <div className="comment_body mx-2">
        <div className="comment_header d-flex align-items-start flex-column mt-n1">
          <h5>{authorDisplayName}•{moment(publishedAt).fromNow()}</h5>
          <p className='mb-0 '>{textDisplay}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
