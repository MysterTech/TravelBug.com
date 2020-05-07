export const create = (userId, token, trip) => {
  return fetch(`${process.env.REACT_APP_API_URL}/trip/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: trip,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const list = (page) => {
  return fetch(`${process.env.REACT_APP_API_URL}/trips/?page=${page}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const singleTrip = (tripId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/trip/${tripId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listByUser = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/trips/by/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const remove = (tripId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/trip/${tripId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const update = (tripId, token, trip) => {
  console.log(tripId, token, trip);
  return fetch(`${process.env.REACT_APP_API_URL}/trip/${tripId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: trip,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
