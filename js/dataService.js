// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCANb9a0-6_C55qeZ-YY39tqB5B79cZ0BE",
//   authDomain: "nyano-kakh.firebaseapp.com",
//   databaseURL: "https://nyano-kakh-default-rtdb.firebaseio.com",
//   projectId: "nyano-kakh",
//   storageBucket: "nyano-kakh.firebasestorage.app",
//   messagingSenderId: "1073797907279",
//   appId: "1:1073797907279:web:7ecbabb467bc7ba8b17b3a",
//   measurementId: "G-9Y9V54HVKW"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const analytics = firebase.analytics();
// const auth = firebase.auth();
// const database = firebase.database();

// // DOM Elements
// const authContainer = document.getElementById('authContainer');
// const authTitle = document.getElementById('authTitle');
// const authForm = document.getElementById('authForm');
// const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');
// const submitBtn = document.getElementById('submitBtn');
// const toggleAuthBtn = document.getElementById('toggleAuthBtn');
// const errorMessage = document.getElementById('errorMessage');
// const dashboard = document.getElementById('dashboard');
// const userEmail = document.getElementById('userEmail');
// const userId = document.getElementById('userId');
// const logoutBtn = document.getElementById('logoutBtn');
// const loadingData = document.getElementById('loadingData');
// const noDataMessage = document.getElementById('noDataMessage');
// const dataError = document.getElementById('dataError');
// const healthCards = document.getElementById('healthCards');

// // Authentication state
// let isRegistering = false;

// // Cookie configuration
// const COOKIE_OPTIONS = {
//   expires: 7, // 7 days
//   secure: true,
//   sameSite: "strict"
// };

// // Toggle between login and registration
// toggleAuthBtn.addEventListener('click', () => {
//   isRegistering = !isRegistering;
//   authTitle.textContent = isRegistering ? 'Register' : 'Login';
//   submitBtn.textContent = isRegistering ? 'Register' : 'Login';
//   toggleAuthBtn.textContent = isRegistering 
//     ? 'Already have an account? Login' 
//     : 'Need an account? Register';
// });

// // Handle form submission (login or register)
// authForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   errorMessage.classList.add('hidden');
  
//   const email = emailInput.value;
//   const password = passwordInput.value;
  
//   try {
//     let userCredential;
    
//     if (isRegistering) {
//       userCredential = await auth.createUserWithEmailAndPassword(email, password);
//     } else {
//       userCredential = await auth.signInWithEmailAndPassword(email, password);
//     }
    
//     const user = userCredential.user;
    
//     // Set auth cookie with user ID token
//     const token = await user.getIdToken();
//     Cookies.set("authToken", token, COOKIE_OPTIONS);
    
//     // Show dashboard
//     showDashboard(user);
//   } catch (error) {
//     console.error("Authentication error:", error);
//     errorMessage.textContent = error.message;
//     errorMessage.classList.remove('hidden');
//   }
// });

// // Logout functionality
// logoutBtn.addEventListener('click', async () => {
//   try {
//     await auth.signOut();
//     Cookies.remove("authToken");
//     showAuthForm();
//   } catch (error) {
//     console.error("Logout error:", error);
//   }
// });

// // Check authentication status on page load
// auth.onAuthStateChanged(user => {
//   if (user) {
//     showDashboard(user);
//   } else {
//     showAuthForm();
//   }
// });

// // Show dashboard with user info
// function showDashboard(user) {
//   authContainer.classList.add('hidden');
//   dashboard.classList.remove('hidden');
//   logoutBtn.classList.remove('hidden');
  
//   userEmail.textContent = user.email;
//   userId.textContent = user.uid;
  
//   // Fetch health data
//   fetchHealthData();
// }

// // Show auth form
// function showAuthForm() {
//   authContainer.classList.remove('hidden');
//   dashboard.classList.add('hidden');
//   logoutBtn.classList.add('hidden');
  
//   // Reset form
//   authForm.reset();
//   errorMessage.classList.add('hidden');
// }

// // Fetch health data from Firebase
// function fetchHealthData() {
//   loadingData.classList.remove('hidden');
//   healthCards.classList.add('hidden');
//   noDataMessage.classList.add('hidden');
//   dataError.classList.add('hidden');
  
//   const healthDataRef = database.ref('01');
  
//   healthDataRef.on('value', (snapshot) => {
//     loadingData.classList.add('hidden');
    
//     if (snapshot.exists()) {
//       const data = snapshot.val();
//       displayHealthData(data);
//     } else {
//       noDataMessage.classList.remove('hidden');
//     }
//   }, (error) => {
//     loadingData.classList.add('hidden');
//     dataError.textContent = `Error: ${error.message}`;
//     dataError.classList.remove('hidden');
//   });
// }

// // Display health data in cards
// function displayHealthData(data) {
//   healthCards.innerHTML = '';
  
//   if (data) {
//     // Create cards for each health metric
//     createHealthCard('Oxygen Level', data.oxValue, '%', '❤️');
//     createHealthCard('Pulse Rate', data.pulse, 'BPM', '💓');
//     createHealthCard('Temperature', data.temp, '°C', '🌡️');
    
//     healthCards.classList.remove('hidden');
//   } else {
//     noDataMessage.classList.remove('hidden');
//   }
// }

// // Create individual health card
// function createHealthCard(title, value, unit, icon) {
//   const cardElement = document.createElement('div');
//   cardElement.className = 'health-card';
  
//   cardElement.innerHTML = `
//     <div class="card-icon">${icon}</div>
//     <div class="card-content">
//       <h3>${title}</h3>
//       <div class="card-value">
//         <span class="value">${value}</span>
//         <span class="unit">${unit}</span>
//       </div>
//     </div>
//   `;
  
//   healthCards.appendChild(cardElement);
// }

// function fetchVitalsFromFirebase() {
//   const healthDataRef = database.ref('01'); // Change '01' if your path is different

//   healthDataRef.on('value', (snapshot) => {
//     if (snapshot.exists()) {
//       const data = snapshot.val();

//       // Update DOM with data
//       document.getElementById('tempValue').textContent = `${data.temp}°C`;
//       document.getElementById('pulseValue').textContent = `${data.pulse} BPM`;
//       document.getElementById('oxValue').textContent = `${data.oxValue}%`;

//       updateStatusBadge('tempStatus', data.temp, 36.5, 37.5);
//       updateStatusBadge('pulseStatus', data.pulse, 60, 100);
//       updateStatusBadge('oxStatus', data.oxValue, 95, 100);
//     } else {
//       console.warn("No data found in Firebase.");
//     }
//   }, (error) => {
//     console.error("Error fetching data:", error);
//   });
// }

// function updateStatusBadge(id, value, min, max) {
//   const badge = document.getElementById(id);
//   badge.classList.remove('green', 'yellow', 'red');

//   if (value >= min && value <= max) {
//     badge.textContent = 'Normal';
//     badge.classList.add('green');
//   } else if (value < min) {
//     badge.textContent = 'Low';
//     badge.classList.add('red');
//   } else {
//     badge.textContent = 'Elevated';
//     badge.classList.add('yellow');
//   }
// }

// function showDashboard(user) {
//   authContainer.classList.add('hidden');
//   dashboard.classList.remove('hidden');
//   logoutBtn.classList.remove('hidden');

//   userEmail.textContent = user.email;
//   userId.textContent = user.uid;

//   // 🔥 Fetch vitals data
//   fetchVitalsFromFirebase();
// }


// export function fetchVitalsFromFirebase() {
//   const healthDataRef = database.ref('01'); // Adjust if needed

//   healthDataRef.on('value', (snapshot) => {
//     if (snapshot.exists()) {
//       const data = snapshot.val();

//       document.getElementById('tempValue').textContent = `${data.temp}°C`;
//       document.getElementById('pulseValue').textContent = `${data.pulse} BPM`;
//       document.getElementById('oxValue').textContent = `${data.oxValue}%`;

//       updateStatusBadge('tempStatus', data.temp, 36.5, 37.5);
//       updateStatusBadge('pulseStatus', data.pulse, 100, 140);
//       updateStatusBadge('oxStatus', data.oxValue, 97, 100);
//     } else {
//       console.warn("No data found in Firebase.");
//     }
//   }, (error) => {
//     console.error("Error fetching data:", error);
//   });
// }

// function updateStatusBadge(id, value, min, max) {
//   const badge = document.getElementById(id);
//   if (!badge) return;

//   badge.className = "status-badge"; // Reset classes

//   if (value < min) {
//     badge.classList.add("red");
//     badge.textContent = "Low";
//   } else if (value > max) {
//     badge.classList.add("yellow");
//     badge.textContent = "Elevated";
//   } else {
//     badge.classList.add("green");
//     badge.textContent = "Normal";
//   }
// }



// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCANb9a0-6_C55qeZ-YY39tqB5B79cZ0BE",
  authDomain: "nyano-kakh.firebaseapp.com",
  databaseURL: "https://nyano-kakh-default-rtdb.firebaseio.com",
  projectId: "nyano-kakh",
  storageBucket: "nyano-kakh.firebasestorage.app",
  messagingSenderId: "1073797907279",
  appId: "1:1073797907279:web:7ecbabb467bc7ba8b17b3a",
  measurementId: "G-9Y9V54HVKW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Fetch health data from Firebase (unauthenticated)
function fetchVitalsFromFirebase() {
  const healthDataRef = database.ref('baby'); // Replace '01' if needed

  healthDataRef.on('value', (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();

      document.getElementById('tempValue').textContent = `${data.temperature}°C`;
      document.getElementById('pulseValue').textContent = `${data.pulse} BPM`;
      document.getElementById('oxValue').textContent = `${data.humidity}%`;

      updateStatusBadge('tempStatus', data.temp, 36.5, 37.5);
      updateStatusBadge('pulseStatus', data.pulse, 100, 140);
      updateStatusBadge('oxStatus', data.oxValue, 97, 100);

      console.log(data);
      
    } else {
      console.warn("No data found in Firebase.");
    }
  }, (error) => {
    console.error("Error fetching data:", error);
  });
}

function updateStatusBadge(id, value, min, max) {
  const badge = document.getElementById(id);
  if (!badge) return;

  badge.className = "status-badge"; // Reset classes

  if (value < min) {
    badge.classList.add("red");
    badge.textContent = "Low";
  } else if (value > max) {
    badge.classList.add("yellow");
    badge.textContent = "Elevated";
  } else {
    badge.classList.add("green");
    badge.textContent = "Normal";
  }
}

// Start data fetching immediately
document.addEventListener("DOMContentLoaded", () => {
  fetchVitalsFromFirebase();
});


