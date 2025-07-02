const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');

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
