import { useState } from "react";
import List from "../components/List";

const HomePage = () => {
  const [userData, setUserData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const clickHandler = () => {
    setClicked((prevState) => !prevState);
    if (!clicked) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <button
          className="border-2 m-2 p-1 px-2 py-2 rounded bg-teal-500 text-white"
          onClick={clickHandler}
        >
          All Users
        </button>
      </div>
      {clicked && <List list={userData} />}
    </>
  );
};

export default HomePage;
