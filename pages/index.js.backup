import { useEffect, useState } from "react";

export default function Index() {
  const [parkingStatus, setParkingStatus] = useState([]);

  // Function to fetch data from the API (GET request)
  const fetchData = async () => {
    try {
      const response = await fetch("/api/parking-status", {
        method: "GET",
      });
      const data = await response.json();
      setParkingStatus(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts and then every second
  useEffect(() => {
    fetchData(); // Fetch data immediately on mount
    const interval = setInterval(fetchData, 1000); // Fetch data every 1000ms (1 second)

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getParkingColor = (status) => (status ? "bg-green-500" : "bg-red-500");
  // Count the number of parkings with status true
  const availableParkings = Object.values(parkingStatus).filter(
    (status) => status
  ).length;

  return (
    <>
      <div className="flex justify-center items-center min-h-screen flex-col">
        <table>
          <tbody>
            <tr>
              <td className="border-4 px-4 py-6">
                Parkir Tersedia: {availableParkings}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="my-4" />
        <table>
          <tbody>
            <tr>
              <td
                className={`border-4 px-8 py-24 ${getParkingColor(
                  parkingStatus["parking1"]
                )}`}
              >
                Parking 1
              </td>
              <td
                className={`border-4 px-8 py-24 ${getParkingColor(
                  parkingStatus["parking2"]
                )}`}
              >
                Parking 2
              </td>
              <td
                className={`border-4 px-8 py-24 ${getParkingColor(
                  parkingStatus["parking3"]
                )}`}
              >
                Parking 3
              </td>
              <td
                className={`border-4 px-8 py-24 ${getParkingColor(
                  parkingStatus["parking4"]
                )}`}
              >
                Parking 4
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
