import { httpCommon } from '../http-common';

const url = 'https://aprikt.online/v1';
// const url = 'http://localhost:3000/v1';
const baseUrl = httpCommon(url, true);

function getToken() {
  return baseUrl.get('/token');
}
function getLocalStorageToken() {
  return localStorage.getItem('token');
}
function deleteLocalStorageToken() {
  return localStorage.removeItem('token');
}
export const tokenService = {
  getToken,
  getLocalStorageToken,
  deleteLocalStorageToken,
};
