import React, { useEffect, useState } from "react";

const PostListItem = ({ item }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9900/user/${item.userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data[0]))
      .catch((err) => console.error(err));
  }, [item.userId]);

  return (
    <div className="text-center">
      {user && (
        <>
          <li>
            <strong>Title : </strong> {item.title}
          </li>
          <li>
            <strong>Body : </strong> {item.body}
          </li>
          <li>
            <strong>Name : </strong> {user.name}
          </li>
          <li>
            <strong>Company : </strong> {user.company}
          </li>
        </>
      )}
    </div>
  );
};

export default PostListItem;
