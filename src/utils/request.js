import 'whatwg-fetch'
import configuration from '../config'

export function request(url, requestOptions) {
  const options = optionsFactory(requestOptions);
  return fetch(url, options)
    .catch(handleError)
    .then(checkStatus)
    .then(parseJSON)
    .catch(error => {
      throw error;
    });
}

function optionsFactory (requestOptions) {
  const options = {
    ...requestOptions,
    method: requestOptions && requestOptions.method ? requestOptions.method.toUpperCase() : "GET",
    headers: { ...configuration.defaultHeaders }
  }
  return options;
}

function handleError(error) {
  error.response = {
    status: 0,
    statusText:
      "Cannot connect. Please make sure you are connected to internet."
  };
  throw error;
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return response.text().then(text => {
    return Promise.reject({
      status: response.status,
      ok: false,
      statusText: response.statusText,
      body: text ? JSON.parse(text) : {}
    });
  });
}

function parseJSON (response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
};