// Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

// Firebase imports
const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc, updateDoc, arrayUnion } = require('firebase/firestore');

const app = express();
const PORT = process.env.PORT || 3000;

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
console.log("Get firestore:", getFirestore(firebaseApp));
console.log('Firebase initialized successfully.');

// Debug: Check if environment variables are loaded
console.log('Environment variables loaded:');
console.log('MAESOT_CINEMA_CODE:', process.env.MAESOT_CINEMA_CODE);
console.log('CHIANGMAI_CINEMA_CODE:', process.env.CHIANGMAI_CINEMA_CODE);
console.log('MBK_CINEMA_CODE:', process.env.MBK_CINEMA_CODE);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// API Endpoints

// 1. Get stored seat numbers from Firebase
app.get('/api/seats/:cinemaId', async (req, res) => {
    try {
        const cinemaId = parseInt(req.params.cinemaId, 10);

        console.log('Received cinemaId:', cinemaId);

        if (isNaN(cinemaId)) {
            return res.status(400).json({ error: 'Cinema ID must be a number' });
        }
        let cinemaCode = '';
        
        switch (cinemaId) {
            case 1:
                cinemaCode = process.env.MAESOT_CINEMA_CODE; // SF CINEMA (MAE SOT)
                break;
            case 2:
                cinemaCode = process.env.CHIANGMAI_CINEMA_CODE; // SFX CINEMA
                break;
            case 3:
                cinemaCode = process.env.MBK_CINEMA_CODE; // SF CINEMA (MBK CENTER)
                break;
            default:
                return res.status(400).json({ error: 'Invalid cinema ID' });
        }

        console.log('Cinema code from env:', cinemaCode);

        if (!cinemaCode) {
            return res.status(500).json({ error: 'Cinema code not configured for this cinema ID' });
        }

        const cinemaRef = doc(db, 'cinemas', cinemaCode);
        const cinemaSnap = await getDoc(cinemaRef);
        
        if (!cinemaSnap.exists()) {
            return res.status(404).json({ error: 'Cinema not found' });
        }
        
        const cinemaData = cinemaSnap.data();
        const soldSeats = cinemaData.soldSeats || [];
        
        res.json({
            success: true,
            cinemaId: cinemaId,
            soldSeats: soldSeats
        });
    } catch (error) {
        console.error('Error getting seats:', error);
        res.status(500).json({ error: error.message });
    }
});

// 2. Store seat numbers to Firebase
app.post('/api/seats', async (req, res) => {
    try {
        const {
            cinemaId,
            selectedSeats
        } = req.body;

        if (!cinemaId || !selectedSeats || !Array.isArray(selectedSeats)) {
            return res.status(400).json({ 
                error: 'Missing required fields: cinemaId and selectedSeats array' 
            });
        }

        // Get current cinema data to check if seats are available
        const cinemaRef = doc(db, 'cinemas', cinemaId);
        const cinemaSnap = await getDoc(cinemaRef);
        
        if (!cinemaSnap.exists()) {
            return res.status(404).json({ error: 'Cinema not found' });
        }

        const cinemaData = cinemaSnap.data();
        const currentSoldSeats = cinemaData.soldSeats || [];
        const seatIds = selectedSeats.map(seat => seat.id || seat);
        
        // Check if any seats are already sold
        const unavailableSeats = seatIds.filter(seatId => currentSoldSeats.includes(seatId));
        
        if (unavailableSeats.length > 0) {
            return res.status(400).json({ 
                error: 'Some seats are no longer available', 
                unavailableSeats 
            });
        }

        // Update cinema with new sold seats
        await updateDoc(cinemaRef, {
            soldSeats: arrayUnion(...seatIds)
        });

        res.status(201).json({
            success: true,
            message: 'Seats stored successfully',
            cinemaId: cinemaId,
            storedSeats: seatIds
        });
    } catch (error) {
        console.error('Error storing seats:', error);
        res.status(500).json({ error: error.message });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the application`);
    console.log('API Endpoints:');
    console.log(`  GET  /api/seats/:cinemaId - Get sold seats for a cinema`);
    console.log(`  POST /api/seats - Store new seat bookings`);
});
