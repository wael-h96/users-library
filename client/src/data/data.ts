import axios from "axios";

const URL = "https://randomuser.me/api";

export const getUsers = (limit: number = 10) =>
  axios
    .get(`${URL}/?results=${limit}`)
    .then((res) => res.data.results)
    .catch((err) => console.log(err));
