function getAccessToken() {
  return localStorage.getItem('token');
}
const tokenInterceptor = async (config: any) => {
  const token = getAccessToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  //   config.headers.common['correlation-id'] = authService.correlationId;
  return config;
};

export default tokenInterceptor;
