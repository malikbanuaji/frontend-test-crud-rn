import * as Settings from './settings';
import Axios from 'axios';

const config = {
  baseURL: Settings.BASE_URL,
  timeout: Settings.TIMEOUT,
};

export async function fetchAllContact() {
  return await Axios.get('/contact', config);
}

export async function fetchContact(id) {
  return await Axios.get(`/contact/${id}`, config);
}

export async function addContact({firstName, lastName, age, photo}) {
  return await Axios.post(
    '/contact',
    {firstName, lastName, age, photo},
    config,
  );
}

export async function editContact({id, firstName, lastName, age, photo}) {
  return await Axios.put(
    `/contact/${id}`,
    {firstName, lastName, age, photo},
    config,
  );
}

export async function deleteContact(id) {
  return await Axios.delete(`/contact/${id}`, config);
}
