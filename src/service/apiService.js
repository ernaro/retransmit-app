import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  responseType: "json",
});

export const axiosFetcher = (url) => axios.get(url).then((res) => res.data);

export const createChannel = (channel) => {
  return axios.post("/channels", channel);
};

export const updateChannelById = (id, channel) => {
  return axios.put(`/channels/${id}`, channel);
};

export const deleteChannelById = (id) => {
  return axios.delete(`/channels/${id}`);
};

export const addInput = (channelId, input) => {
  return axios.put(`/channels/${channelId}/inputs`, input);
}

export const editInputById = (inputId, input) => {
  return axios.put(`/inputs/${inputId}`, input);
}

export const deleteInputById = (inputId) => {
  return axios.delete(`/inputs/${inputId}`);
}

export const addOutput = (channelId, output) => {
  return axios.put(`/channels/${channelId}/outputs`, output);
}

export const editOutputById = (outputId, output) => {
  return axios.put(`/outputs/${outputId}`, output);
}

export const deleteOutputById = (outputId) => {
  return axios.delete(`/outputs/${outputId}`);
}

export const startOutputById = (id) => axios.post(`/outputs/${id}/start`);

export const stopOutputById = (id) => axios.post(`/outputs/${id}/stop`);

export const getServerInfo = () => {
  return axios.get("/server-info");
};
