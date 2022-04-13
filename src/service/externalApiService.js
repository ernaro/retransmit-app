import Axios from "axios";

const axios = Axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  responseType: 'json'
})

export const getAllChannels = () => {
  return axios.get("/channels");
}

export const getChannelById = (id) => {
  return axios.get(`/channels/${id}`);
}

export const createChannel = (channel) => {
  return axios.post("/channels", channel);
}

export const updateChannelById = (id, channel) => {
  return axios.put(`/channels/${id}`, channel);
}

export const deleteChannelById = (id) => {
  return axios.delete(`/channels/${id}`);
}

export const startChannelById = (id) => axios.post(`/channels/${id}/start`);

export const stopChannelById = (id) => axios.post(`/channels/${id}/stop`);


export const getServerInterfaces = () => {
  return axios.get("/interfaces");
}