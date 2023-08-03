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

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const getParkingColor = (status) => (status ? "bg-red-500" : "bg-green-500");
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
                  parkingStatus["parking-1"]
                )}`}
              >
                Parking 1
              </td>
              <td
                className={`border-4 px-8 py-24 ${getParkingColor(
                  parkingStatus["parking-2"]
                )}`}
              >
                Parking 2
              </td>
              <td
                className={`border-4 px-8 py-24 ${getParkingColor(
                  parkingStatus["parking-3"]
                )}`}
              >
                Parking 3
              </td>
              <td
                className={`border-4 px-8 py-24 ${getParkingColor(
                  parkingStatus["parking-4"]
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
