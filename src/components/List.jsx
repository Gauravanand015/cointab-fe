import ListItem from "./ListItem";

const List = ({ list }) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 w-[850px]">
        {list.map((elem) => (
          <ul className="border-2 border-black m-1 p-2" key={elem.id}>
            <ListItem item={elem} />
          </ul>
        ))}
      </div>
    </div>
  );
};

export default List;
