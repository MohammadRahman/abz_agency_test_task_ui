interface NetworkStatus {
  status: string | null;
}

const network: NetworkStatus = { status: null };

window.addEventListener('load', () => {
  const updateOnlineStatus = (event: Event) => {
    network.status = navigator.onLine ? 'online' : 'offline';
    console.log(`Event: ${event.type}; Status: ${network.status}`);
  };
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});

export default network;
