import React, { useContext, useEffect, useState } from "react";
import { idContext } from "../store/idContext";
import PostList from "./PostList";

const PostButton = () => {
  const { id } = useContext(idContext);
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState([]);
  const [userPostData, setUserPostData] = useState([]);
  const [postDataByUser, setPostDataByUser] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:9900/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:9900/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setUserPostData(data.data))
      .catch((err) => console.error(err));
  }, [postDataByUser]);

  const handleBulkClick = async () => {
    setPostDataByUser(false);
    const postData = userData.map((item) => {
      return {
        user_id: item.userId,
        title: item.title,
        body: item.body,
        name: user[0]?.name,
        company: user[0]?.company,
      };
    });

    try {
      const res = await fetch(`http://localhost:9900/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await res.json();
      if (data.message === "Posts saved successfully") {
        alert(data.message);
        setPostDataByUser(true);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadClick = async (id) => {
    try {
      window.open(`http://localhost:9900/downloadposts/${id}`, "_blank");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="m-1 p-2 flex justify-center items-center">
        {userPostData.length ? (
          <button
            className="bg-green-500 m-1 px-2 py-2 rounded"
            onClick={() => handleDownloadClick(id)}
          >
            Download in Excel
          </button>
        ) : (
          <button
            className="bg-red-500 m-1 px-2 py-2 rounded border-1"
            onClick={handleBulkClick}
          >
            Bulk Add
          </button>
        )}
      </div>
      {userData.length && <PostList userData={userData} />}
    </>
  );
};

export default PostButton;
