import _ from 'lodash';
import axios from 'axios';
import toast from 'react-hot-toast';
import network from '../network';

// const errorInterceptor = (error: any) => {
//   let title = `Error ${_.get(error, 'response.status', '')}`;
//   let text = '';

//   // Status codes that will be shown as "Red Error" [400, 404, etc...]
//   const knownStatusCodes = [400, 401, 403, 404, 422];
//   // Status codes that you want to hide form client [499, etc...]
//   const hiddenStatusCodes = [499];
//   // If bad request contains supportId and statusCode is not specified in arrays above
//   // "Blue Error" will be shown to the user with "Send to support team" button

//   // Will filter out all errors when user lost connection
//   if (network.status === 'offline' || axios.isCancel(error)) {
//     return Promise.reject(error);
//   }
//   // Will filter out Axios canceled requests
//   if (
//     !error.response ||
//     error.response.data instanceof Blob ||
//     hiddenStatusCodes.includes(error.response.status)
//   ) {
//     return Promise.reject(error);
//   }

//   // Will filter out CORS noise
//   if (!error.response) {
//     return Promise.reject(error);
//   }

// if (error.response && error.response.data instanceof Blob) {
//   return Promise.reject(error);
// }

// if (hiddenStatusCodes.includes(error.response.status)) {
//   return Promise.reject(error);
// }

//   const errors = _.get(error.response, 'errors', null);
//   if (_.isObjectLike(errors)) {
//     if (!_.isArray(errors)) {
//       const isExistArray = _.find(errors, (item) => _.isArray(item));
//       if (isExistArray) {
//         // Typical bad response form .net core with errors object
//         title = _.get(error, 'response.data.title', title);
//         _.forOwn(errors, (item) => {
//           text += `<p>${item.join('<br>')}</p>`;
//         });
//       } else {
//         // Typical bad response form node.js with errors object
//         title = _.get(error.response, 'data._message');
//         text = _.get(error.response, 'data.message');
//       }
//     }
//     // Typical bad response form node.js with errors array
//     // TODO: Add some additional logic for different type of arrays
//     if (_.isArray(errors)) {
//       _.forEach(errors, (item) => {
//         console.log(item);
//         text += `${item.param} ${item.msg} ${item.value}`;
//       });
//     }
//   }

//   if (error.response?.message) {
//     text = error.response.message;
//   }

//   if (_.isEmpty(text)) {
//     text = _.get(error, 'response.statusText', '');
//   }

//   if (
//     error.response.data &&
//     error.response.data.code === 11000 &&
//     error.response.data.name === 'MongoServerError'
//   ) {
//     text = 'Duplicate Found';
//   }

//   toast.error(error);
//   return Promise.reject(error);
// };

// Response interceptor for error handling
const errorInterceptor = (error: any) => {
  // Handle offline or canceled requests
  if (network.status === 'offline' || axios.isCancel(error)) {
    return Promise.reject(error);
  }

  // Handle cases without a response or CORS issues
  if (!error.response) {
    toast.error('No response from the server');
    return Promise.reject(error);
  }

  // Handle specific backend error structure
  const backendError = _.get(error, 'response.data');
  if (backendError && !backendError.success && backendError.message) {
    toast.error(backendError.message);
  } else {
    // Fallback for other error formats
    const fallbackMessage = `Error ${error.response.status}: ${
      error.response.statusText || 'Unknown error'
    }`;
    toast.error(fallbackMessage);
  }

  return Promise.reject(error);
};

export default errorInterceptor;
