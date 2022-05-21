const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase/auth')

const firebaseApp = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});
const auth = getAuth(firebaseApp);
initializeApp();

const db = getFirestore();

// ------------------------------------------------------------

const {
    reservations,
    restaurants,
    dateAvailabilities,
    reviews,
} = require("./testData");

function populateCollection(collectionName, items) {
    return Promise.all(
        items.map((item) => {
            const { id, ...data } = item;
            return db.collection(collectionName).doc(id).set(data);
        })
    );
}

Promise.all([
    populateCollection("reservations", reservations),
    populateCollection("reviews", reviews),
    populateCollection("restaurants", restaurants),
    populateCollection("dateAvailabilities", dateAvailabilities),
])
    .then(() => {
        console.log("Done!");
        process.exit(0);
    })
    .catch((err) => {
        console.log(err);
    });
