# Movie Ticket System with Firebase

A movie ticket booking system that uses Firebase Firestore for data storage.

## Setup Instructions

### 1. Enable Firebase Firestore

You need to enable the Firestore API for your Firebase project:

1. Go to [Google Cloud Console](https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=movie-ticket-2c720)
2. Click "Enable" to enable the Firestore API
3. Go to [Firebase Console](https://console.firebase.google.com/project/movie-ticket-2c720/firestore)
4. Click "Create database" and choose "Start in test mode" for development

### 2. Install Dependencies

```bash
npm install
```

### 3. Initialize Firebase Data

After enabling Firestore, run:

```bash
node init-firebase.js
```

### 4. Start the Server

```bash
npm start
# or for development with auto-restart:
npm run dev
```

The server will run on `http://localhost:3000`

## API Endpoints

### 1. Get Sold Seats
```http
GET /api/seats/:cinemaId
```

**Example:**
```bash
curl http://localhost:3000/api/seats/maesot
```

**Response:**
```json
{
  "success": true,
  "cinemaId": "maesot",
  "soldSeats": ["A1", "B5", "C10"]
}
```

### 2. Store Seat Bookings
```http
POST /api/seats
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/seats \
  -H "Content-Type: application/json" \
  -d '{
    "cinemaId": "maesot",
    "selectedSeats": [
      {"id": "A5", "price": "500"},
      {"id": "A6", "price": "500"}
    ]
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Seats stored successfully",
  "cinemaId": "maesot",
  "storedSeats": ["A5", "A6"]
}
```

## Firebase Database Structure

### Collections:

**cinemas** - stores cinema information and sold seats
```javascript
{
  // Document ID: "maesot", "chiangmai", "mbk"
  name: "SF CINEMA (MAE SOT)",
  location: "Mae Sot",
  showtimes: ["၁၉/၇/၂၀၂၅ ညနေ ၃:၀၀"],
  seatLayout: {
    prices: { n: 300, p: 500, s: 800 },
    rowLabels: ["M", "L", "K", ...],
    layout: ["nnn_nnnnnnnnnnnnnnnn_nnn", ...]
  },
  soldSeats: ["A1", "B5", "C10"] // Array of sold seat IDs
}
```

## Integration with index.html

The `index.html` file should send data to the server when the user clicks the "Confirm" button (`confirmBookingBtn`). 

**Expected data format:**
```javascript
{
  cinemaId: "maesot",
  selectedSeats: [
    { id: "A5", price: "500" },
    { id: "A6", price: "500" }
  ]
}
```

The server will:
1. Check if seats are available
2. Store the seat numbers in Firebase
3. Return success/error response

## Development

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-restart
- `node init-firebase.js` - Initialize Firebase with cinema data

## Troubleshooting

1. **Permission denied**: Make sure Firestore API is enabled
2. **Connection issues**: Check your Firebase configuration
3. **Missing data**: Run `node init-firebase.js` to initialize cinema data
