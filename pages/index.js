// Import the functions you need from the SDKs you need
import firebase_app from "@/src/firebase/config";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
// Get a reference to the database
const database = getDatabase(firebase_app);
function Index() {
  const [distances, setDistances] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Create a reference to the "Distances" map
    const distancesRef = ref(database, "Distances");
    // Set up a listener for changes to the "Distances" map
    const unsubscribe = onValue(distancesRef, (snapshot) => {
      if (snapshot.exists()) {
        const distancesData = snapshot.val();
        setDistances(distancesData);
      } else {
        setDistances({});
      }
    });
    setLoading(false);
    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe(); // Unsubscribe to prevent memory leaks
    };
  }, []); // The empty dependency array means this effect runs once on component mount
  const getParkingColor = (distanceValue) => {
    // Check if the distance is less than 10
    if (distanceValue < 10) {
      return "bg-red-500"; // Green background for available parking
    } else {
      return "bg-green-500"; // Red background for unavailable parking
    }
  }; // Count the number of parkings with status tru
  const getAvailableParkings = () => {
    const availableParkings = Object.entries(distances).filter(
      ([_, distanceValue]) => distanceValue > 10
    );
    return availableParkings.map(([distanceName]) => distanceName);
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen flex-col">
        {loading ? ( // Render skeleton loading if data is not ready
          <div className="animate-pulse">
            <div className="bg-gray-300 h-6 w-40 mb-4" />
            <table>
              <tbody>
                <tr>
                  <td className="border-4 px-4 py-6 bg-gray-300">Loading...</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <>
            <table>
              <tbody>
                <tr>
                  <td className="border-4 px-4 py-6">
                    Parkir Tersedia: {getAvailableParkings().length}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="my-4" />
            <table>
              <tbody>
                <tr>
                  {Object.entries(distances).map(
                    ([distanceName, distanceValue]) => (
                      <td
                        key={distanceName}
                        className={`border-4 px-8 py-24 ${getParkingColor(
                          distanceValue
                        )}`}
                      >
                        {distanceName}
                      </td>
                    )
                  )}
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
      );
    </>
  );
}

export default Index;
