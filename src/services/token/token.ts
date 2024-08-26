import { httpCommon } from '../http-common';

const url = 'https://aprikt.online/v1';
const baseUrl = httpCommon(url, true);

function getToken() {
  return baseUrl.get('/token');
}
function getLocalStorageToken() {
  return localStorage.getItem('token');
}
export const tokenService = {
  getToken,
  getLocalStorageToken,
};
