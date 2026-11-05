(function () {
  const localHosts = ['localhost', '127.0.0.1'];
  const localApiPorts = ['5000', '5001', '5200'];
  const defaultApiOrigin = localHosts.includes(window.location.hostname)
    ? (localApiPorts.includes(window.location.port) ? window.location.origin : 'http://localhost:5200')
    : 'https://mytravel-pk-api.onrender.com';

  window.MYTRAVEL_API_ORIGIN = window.MYTRAVEL_API_ORIGIN || defaultApiOrigin;
  window.MYTRAVEL_API_BASE_URL = `${window.MYTRAVEL_API_ORIGIN.replace(/\/+$/, '')}/api`;
})();
