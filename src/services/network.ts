const network = { status: null };

window.addEventListener('load', () => {
  const updateOnlineStatus = (event: any) => {
    network.status = navigator.onLine ? 'online' : 'offline';
    console.log(`Event: ${event.type}; Status: ${network.status}`);
  };
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});

export default network;
