import Axios from "axios";

const axios = Axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  responseType: 'json'
})

export const axiosFetcher = url => axios.get(url).then(res => res.data);

export const getChannelById = (id) => {
  return axios.get(`/channels/${id}`);
}

export const createChannel = (channel) => {
  let updatedChannel;
  if(!channel.inputUrl.startsWith("srt")){
    const { inputMode, inputLatency, ...filtered } = channel;
    updatedChannel = { ...filtered };
  } else if (!channel.outputUrl.startsWith("srt")){
    const { outputMode, outputLatency, ...filtered } = channel;
    updatedChannel = { ...filtered };
  } else if (!channel.inputUrl.startsWith("srt") && !channel.outputUrl.startsWith("srt")) {
    const { inputMode, inputLatency, outputMode, outputLatency, ...filtered } = channel;
    updatedChannel = { ...filtered };
  } else {
    updatedChannel = { ...channel }
  }
  return axios.post("/channels", updatedChannel);
}

export const updateChannelById = (id, channel) => {
  return axios.put(`/channels/${id}`, channel);
}

export const deleteChannelById = (id) => {
  return axios.delete(`/channels/${id}`);
}

export const startChannelById = (id) => axios.post(`/channels/${id}/start`);

export const stopChannelById = (id) => axios.post(`/channels/${id}/stop`);

export const getServerInfo = () => {
  return axios.get("/server-info");
}