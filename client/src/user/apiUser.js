export const create = (token, trip) => {
  return fetch(`${process.env.REACT_APP_API_URL}/trip/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(trip),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
