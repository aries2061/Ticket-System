// Load environment variables first
require('dotenv').config();

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

async function testFirebaseConnection() {
    try {
        console.log('🔄 Testing Firebase connection...');
        
        // Try to write a simple test document
        const testRef = doc(db, 'test', 'connection');
        await setDoc(testRef, {
            message: 'Firebase connection successful!',
            timestamp: new Date().toISOString()
        });
        
        console.log('✅ Write test successful');
        
        // Try to read the document back
        const docSnap = await getDoc(testRef);
        if (docSnap.exists()) {
            console.log('✅ Read test successful');
            console.log('📄 Document data:', docSnap.data());
        } else {
            console.log('❌ Document not found after write');
        }
        
        console.log('🎉 Firebase is working correctly!');
        console.log('✅ You can now run: node init-firebase.js');
        
    } catch (error) {
        console.error('❌ Firebase connection failed:');
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        if (error.code === 'permission-denied') {
            console.log('\n🔧 To fix this error:');
            console.log('1. Go to https://console.firebase.google.com/project/movie-ticket-2c720');
            console.log('2. Click "Firestore Database" in the sidebar');
            console.log('3. Click "Create database"');
            console.log('4. Choose "Start in test mode"');
            console.log('5. Select a location and click "Done"');
            console.log('6. After setup, run this test again');
        }
    }
}

// Run the test
testFirebaseConnection();
