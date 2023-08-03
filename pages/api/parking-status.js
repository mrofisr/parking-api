import firebase_app from "@/src/firebase/config";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const db = getFirestore(firebase_app);
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        // Fetch all data from the "parking status" document
        const parkingStatusRef = doc(db, "parking", "parking status");
        const parkingStatusDoc = await getDoc(parkingStatusRef);
        if (parkingStatusDoc.exists()) {
          const parkingData = parkingStatusDoc.data();
          res.status(200).json(parkingData);
        } else {
          res
            .status(404)
            .json({ message: "parking status document not found" });
        }
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ error: "Error fetching data from parking status document" });
      }
      break;

    case "PUT":
      try {
        const { collectionName, status } = req.body;

        // Fetch the existing data from the "parking status" document
        const parkingStatusRef = doc(db, "parking", "parking status");
        const parkingStatusDoc = await getDoc(parkingStatusRef);

        if (!parkingStatusDoc.exists()) {
          res
            .status(404)
            .json({ message: "parking status document not found" });
          return;
        }

        // Get the existing parking data from the document or initialize if it doesn't exist
        const parkingData = parkingStatusDoc.data() || {};

        // Update the collection field with the provided status
        if (collectionName && status !== undefined) {
          parkingData[collectionName] = status;
        } else {
          res.status(400).json({ message: "Invalid request body" });
          return;
        }

        // Save the updated data back to the "parking status" document
        await setDoc(parkingStatusRef, parkingData);

        res.status(200).json(parkingData);
      } catch (error) {
        res
          .status(500)
          .json({ error: "Error updating data in parking status document" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
      break;
  }
}
