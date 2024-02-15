import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { idContext } from "../store/idContext";

const Button = ({ item }) => {
  const [data, setData] = useState([]);
  const [dataFromBackend, setDataFromBackend] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [check, setCheck] = useState(false);
  const { setId } = useContext(idContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:9900/user")
      .then((res) => res.json())
      .then((data) => {
        setDataFromBackend(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [check]);

  let elementFound = false;

  for (let i = 0; i < dataFromBackend.length; i++) {
    if (dataFromBackend[i].userId === item.id) {
      elementFound = true;
      break;
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleClick = async (item) => {
    setCheck(false);
    const res = await fetch("http://localhost:9900/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        website: item.website,
        city: item.address.city,
        company: item.company.name,
      }),
    });

    const data = await res.json();
    if (data.message === "User saved successfully") {
      alert("User saved successfully");
      setCheck(true);
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <div className="m-1 p-2">
      {elementFound ? (
        <button
          className="bg-red-500 m-1 px-2 py-2 rounded border-1"
          onClick={() => {
            setId(item.id);
            navigate("/post");
          }}
        >
          Open
        </button>
      ) : (
        <button
          className="bg-green-500 m-1 px-2 py-2 rounded"
          onClick={() => handleClick(item)}
        >
          Add
        </button>
      )}
    </div>
  );
};

export default Button;
