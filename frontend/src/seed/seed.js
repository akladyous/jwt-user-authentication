import { db } from "../auth/firebaseInit.js";
import { collection, addDoc } from "firebase/firestore";

const {
    reservations,
    restaurants,
    dateAvailabilities,
    reviews,
} = require("../seed/testData.js");


export const seed = () =>{
    function populateCollection(collectionName, items) {
        return Promise.all(
            items.map((item) => {
                const { id, ...data } = item;
                // return db.collection(collectionName).doc(id).set(data);
                return addDoc(collection(db, collectionName), data);
            })
        );
    }

    const handleSeed = () => {
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
    };
}