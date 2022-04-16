import axios from "axios";

const url_api = "http://localhost:8080/api";

export async function _getToken() {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    return null;
  }
}

export async function fetchAPIGet(params) {
  // prams ={url}
  const token = await _getToken();
  console.log('token', token);
  try {
    const response = await axios({
      method: "GET",
      url: `${url_api}/${params.url}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
    return response;
  } catch (error) {}
}

export async function fetchAPIPost(params) {
  // prams = {url, body}
  const token = await _getToken();
  try {
    const response = await axios({
      method: "POST",
      url: `${url_api}/${params.url}`,
      data: params.body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
    return response;
  } catch (error) {}
}
export async function fetchAPIPostFormData(params) {
  // prams = {url, body}
  const token = await _getToken();
  try {
    const response = await axios({
      method: "POST",
      url: `${url_api}/${params.url}`,
      data: params.body,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
    return response;
  } catch (error) {}
}
