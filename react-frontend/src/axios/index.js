import axios from "axios";

export const axiosAWSInstance = axios.create({
  baseURL: "https://n33nrlm71a.execute-api.us-west-2.amazonaws.com/dev/",
});
