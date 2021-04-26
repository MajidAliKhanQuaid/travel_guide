import { useEffect, useState } from "react";
import axios from "./../../interceptor";
const ListFoods = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    axios
      .get("/foods")
      .then(function ({ data }) {
        //handle success
        console.log(data);
        setFoods(data);
        console.log(data);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }, []);
  return (
    <>
      <h1>List of Foods</h1>
      {foods.map((x) => (
        <div>{x.name}</div>
      ))}
    </>
  );
};
export default ListFoods;
