import axios from "axios";

function create(comment: string) {
  return axios.post("http://localhost:7001/PexTemplate/add", comment);
}

function update(obj: any) {
  return axios
    .post("http://localhost:7001/PexTemplate/add", obj)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
}

const CommentsAPI = {
  create,
  update,
};

export default CommentsAPI;
