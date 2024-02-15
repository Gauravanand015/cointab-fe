import React from "react";
import PostListItem from "./PostListItem";

const PostList = ({ userData }) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 w-[850px]">
        {userData.map((elem) => (
          <ul className="border-2 border-black m-1 p-2" key={elem.id}>
            <PostListItem item={elem} />
          </ul>
        ))}
      </div>
    </div>
  );
};

export default PostList;
