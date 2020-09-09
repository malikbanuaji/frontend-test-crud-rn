import * as Settings from './settings';
import Axios from 'axios';

const MainAxios = Axios.create({
  baseURL: Settings.BASE_URL,
  timeout: Settings.TIMEOUT,
});

export async function fetchAllContact() {
  return await MainAxios({url: '/contact'});
}

export async function fetchContact(id) {
  return await MainAxios({url: `/contact/${id}`});
}

export async function addContact({firstName, lastName, age, photo}) {
  return await MainAxios({
    url: '/contact',
    method: 'POST',
    data: {firstName, lastName, age, photo},
  });
}

export async function editContact({firstName, lastName, age, photo}) {
  return await MainAxios({
    url: '/contact',
    method: 'PUT',
    data: {firstName, lastName, age, photo},
  });
}

export async function deleteContact() {
  return await MainAxios({
    url: '/contact',
    method: 'DELETE',
  });
}
