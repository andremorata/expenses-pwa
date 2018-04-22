
// register service-worker
if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

// initialize Firebase
var config = {
  apiKey: "AIzaSyBfJicYI7YFsrpnKFhb4SM9e9fbvx4g0-4",
  authDomain: "expenses-be4ec.firebaseapp.com",
  databaseURL: "https://expenses-be4ec.firebaseio.com",
  projectId: "expenses-be4ec",
  storageBucket: "expenses-be4ec.appspot.com",
  messagingSenderId: "1016103512111"
};
firebase.initializeApp(config);
