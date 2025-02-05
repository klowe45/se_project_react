const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error ${res.status}`);
  }
}

const authorization = {
  "Content-Type": "application/json",
  authorization: `Bearer ${localStorage.getItem("jwt")}`,
};

const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: authorization,
  }).then(checkResponse);
};

const addItems = ({ name, weather, imageUrl }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: authorization,
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(checkResponse);
};

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: authorization,
  }).then(checkResponse);
};

export const api = {
  getItems,
  addItems,
  deleteItem,
};
