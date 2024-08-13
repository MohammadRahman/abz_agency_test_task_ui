import axios from 'axios';
import tokenInterceptor from './interceptors/token.interceptor';
import errorInterceptor from './interceptors/error.interceptor';

// export const httpCommon = (url: any) => {
//   const instance = axios.create({
//     baseURL: url,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   instance.interceptors.request.use(
//     (config) => {
//       const token = getLocalStorageToken();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
//   // Add a response interceptor
//   instance.interceptors.response.use(
//     (response) => {
//       // Any status code that lie within the range of 2xx cause this function to trigger
//       return response;
//     },
//     (error) => {
//       // Any status codes that falls outside the range of 2xx cause this function to trigger
//       // Handle the error globally
//       console.error('Axios error:', error);
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.error('Error data:', error.response.data);
//         console.error('Error status:', error.response.status);
//         console.error('Error headers:', error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error('Error request:', error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.error('Error message:', error.message);
//       }
//       // Optionally, you can return a custom error message or rethrow the error
//       return Promise.reject(error);
//     }
//   );
//   return instance;
// };

export const httpCommon = (url: string, useInterceptor: boolean) => {
  const instance = axios.create({
    baseURL: url,
    headers: { Pragma: 'no-cache' },
  });

  instance.interceptors.request.use(tokenInterceptor);
  if (useInterceptor) {
    instance.interceptors.response.use(
      (response) => response,
      errorInterceptor,
    );
  }
  return instance;
};
