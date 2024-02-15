import Button from "./Button";

const ListItem = ({ item }) => {
  return (
    <div className="text-center">
      <li>Name : {item.name}</li>
      <li>Email : {item.email}</li>
      <li>Phone : {item.phone}</li>
      <li>Website : {item.website}</li>
      <li>City : {item.address.city}</li>
      <li>Company : {item.company.name}</li>
      <Button item={item} />
    </div>
  );
};

export default ListItem;
