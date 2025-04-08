import axios from "axios";


const APP_URL = "http://172.28.0.193:8000";
const IMAGE_URL = `${APP_URL}/storage/images`;
const VIDEO_URL = `${APP_URL}/storage/videos`;

const post = async (endpoint, data, Token) => {
    try {
      const response = await axios.post(`${APP_URL}/api/${endpoint}`, data, {
        headers: { Token },
      });
      return response;
    } catch (error) {
      console.log(`API ERROR\nMethod: POST\nEndpoint: ${endpoint}\nError: ${error}`);
      return null;
    }
  };

const get = async (endpoint, Token) => {
    try {
      const response = await axios.get(`${APP_URL}/api/${endpoint}`, {
        headers: { Token },
      });
      return response;
    } catch (error) {
      console.log(`API ERROR\nMethod: GET\nEndpoint: ${endpoint}\nError: ${error}`);
      return null;
    }
};

const remove = async (endpoint, Token ) => {
    try {
      const response = await axios.delete(`${APP_URL}/api/${endpoint}`, {
        headers: { Token: Token },
      });
      return response;
    } catch (error) {
      console.log(`API ERROR\nMethod: DELETE\nEndpoint: ${endpoint}\nError: ${error}`);
      return null;
    }
};

const put = async (endpoint, Token, data) => {
    try {
      const response = await axios.put(`${APP_URL}/api/${endpoint}`, data, {
        headers: { Token },
      });
      return response;
    } catch (error) {
      console.log(`API ERROR\nMethod: PUT\nEndpoint: ${endpoint}\nError: ${error}`);
      return null;
    }
};

export default {post,get,remove,put,APP_URL,IMAGE_URL,VIDEO_URL};