const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjTgOc2O83MSNYkixcevimaixL9jox0qA",
  authDomain: "movie-ticket-2c720.firebaseapp.com",
  projectId: "movie-ticket-2c720",
  storageBucket: "movie-ticket-2c720.firebasestorage.app",
  messagingSenderId: "381146524736",
  appId: "1:381146524736:web:6a3df343968952d50a83a5",
  measurementId: "G-YM8JD5T9ZC"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

async function initializeCinemas() {
    try {
        console.log('Initializing cinema data in Firebase...');
        
        const cinemas = {
            'maesot': {
                name: 'SF CINEMA (MAE SOT)',
                location: 'Mae Sot',
                showtimes: ['၁၉/၇/၂၀၂၅ ညနေ ၃:၀၀'],
                seatLayout: {
                    prices: { n: 300, p: 500, s: 800 },
                    rowLabels: ["M", "L", "K", "J", "H", "G", "F", "E", "D", "C", "B", "A", "AA"],
                    layout: [
                        "nnn_nnnnnnnnnnnnnnnn_nnn",
                        "nnn_nnnnnnnnnnnnnnnn_nnn",
                        "nnn_nnnnnnnnnnnnnnnn_nnn",
                        "nnn_nnnnnnnnnnnnnnnn_nnn",
                        "nnn_nnnnnnnnnnnnnnnn_nnn",
                        "nnn_nnnnnnnnnnnnnnnn_nnn",
                        "nnn_nnnnnnnnnnnnnnnn_nnn",
                        "nnn_nnnnnnnnnnnnnnnn_nnn",
                        "ppp_pppppppppppppppp_ppp",
                        "ppp_pppppppppppppppp_ppp",
                        "ppp_pppppppppppppppp_ppp",
                        "ppp_pppppppppppppppp_ppp",
                        "sss_sssssss_sss",
                    ]
                },
                soldSeats: [] // Initially empty
            },
            'chiangmai': {
                name: 'SFX CINEMA (MAYA CHIANGMAI)',
                location: 'Chiang Mai',
                showtimes: ['၁၉/၇/၂၀၂၅ ညနေ ၆:၀၀'],
                seatLayout: {
                    prices: { n: 300, p: 500, s: 800 },
                    rowLabels: ["N", "M", "L", "K", "J", "H", "G", "F", "E", "D", "C", "B", "A", "AA"],
                    layout: [
                        "nnnnnnnnnnnnnnnnnnnnnnnn",
                        "nnnnnnnnnnnnnnnnnnnnnnnn",
                        "nnnnnnnnnnnnnnnnnnnnnnnn",
                        "nnnnnnnnnnnnnnnnnnnnnnnn",
                        "nnnnnnnnnnnnnnnnnnnnnnnn",
                        "nnnnnnnnnnnnnnnnnnnnnnnn",
                        "nnnnnnnnnnnnnnnnnnnnnnnn",
                        "nnnnnnnnnnnnnnnnnnnnnnnn",
                        "nnnnnnnnnnnnnnnnnnnnnnnn",
                        "nnnnnnnnnnnnnnnnnnnnnnnn",
                        "pppppppppppppppppppppp",
                        "pppppppppppppppppppppp",
                        "pppppppppppppppppppppp",
                        "ss_ss_ss_ss_ss_ss",
                    ]
                },
                soldSeats: []
            },
            'mbk': {
                name: 'SF CINEMA (MBK CENTER)',
                location: 'Bangkok',
                showtimes: ['၁၉/၇/၂၀၂၅ ညနေ ၄:၀၀'],
                seatLayout: {
                    prices: { n: 300, p: 500, s: 800 },
                    rowLabels: ["P", "N", "M", "L", "K", "J", "H", "G", "F", "E", "D", "C", "B", "A", "AA"],
                    layout: [
                        "nnnnnnnnnn_nnnnnnnnnn",
                        "nnnnnnnnnn_nnnnnnnnnn",
                        "nnnnnnnnnn_nnnnnnnnnn",
                        "nnnnnnnnnn_nnnnnnnnnn",
                        "nnnnnnnnnn_nnnnnnnnnn",
                        "nnnnnnnnnn_nnnnnnnnnn",
                        "nnnnnnnnnn_nnnnnnnnnn",
                        "nnnnnnnnnn_nnnnnnnnnn",
                        "nnnnnnnnnn_nnnnnnnnnn",
                        "ppppppppp_ppppppppp",
                        "ppppppppp_ppppppppp",
                        "ppppppppp_ppppppppp",
                        "ppppppppp_ppppppppp",
                        "ppppppppp_ppppppppp",
                        "ssssss_ssssss",
                    ]
                },
                soldSeats: []
            }
        };

        for (const [cinemaId, cinemaData] of Object.entries(cinemas)) {
            const cinemaRef = doc(db, 'cinemas', cinemaId);
            await setDoc(cinemaRef, cinemaData);
            console.log(`✅ ${cinemaData.name} initialized`);
        }

        console.log('🎉 All cinema data has been successfully initialized in Firebase!');
        console.log('\nYou can now:');
        console.log('1. Start the server: npm start');
        console.log('2. Test the APIs:');
        console.log('   - GET  /api/seats/maesot - Get sold seats');
        console.log('   - POST /api/seats - Store seat bookings');
        
    } catch (error) {
        console.error('❌ Error initializing cinema data:', error);
    }
}

// Run the initialization
initializeCinemas();
