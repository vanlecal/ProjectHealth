import axios from 'axios';

//const API_URL = 'http://localhost:5000/api';

 const API_URL = import.meta.env.VITE_API_URL as string;

//Checking for API_URI variable
if (!API_URL) {
  throw new Error("VITE_API_URL is not defined in the environment variables.");
}



// User data post request run on authentication
const postRequest = async (endpoint: string, data: object) => {
  try {
    const response = await axios.post(`${API_URL}/${endpoint}`, data);
    return response.data;
  } catch (error: unknown) {
    console.error('API Error:', error);

    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw new Error('Something went wrong!');
    }
  }
};

//Testing API for patient scan post request
export const postRequesttwo = async (endpoint: string, data: object) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${API_URL}/${endpoint}`, data, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("API Error:", error);

    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw new Error("Something went wrong!");
    }
  }
};
// User data get request default
const getRequest = async (endpoint: string, token?: string) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error('API Error:', error);

    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw new Error('Something went wrong!');
    }
  }
};




export const deleteRequest = async (endpoint: string, token?: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${endpoint}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return response.data;
  } catch (error: unknown) {
    console.error("API Error:", error);

    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw new Error("Something went wrong!");
    }
  }
};



export {API_URL, postRequest, getRequest};
