import { httpCommon } from '../http-common';

const url = 'http://localhost:3000/v1';
const baseUrl = httpCommon(url, true);

function getUsers() {
  return baseUrl.get('/users');
}
function getMockUsers() {
  return baseUrl.get('/mock/users');
}
function createUser(data: any, token: string) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };
  return baseUrl.post('/users', data, config);
}
export const userService = {
  getMockUsers,
  getUsers,
  createUser,
};
