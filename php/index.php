<?php
// Database configuration
$host = "localhost"; // Replace with your MySQL server host
$username = "root"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$database = "db_parkir"; // Replace with the name of your MySQL database

// Create a connection to the MySQL database
$mysqli = new mysqli($host, $username, $password, $database);

// Check the connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}


// Now you can use the $mysqli object to interact with the database.
// For example, you can execute SQL queries using $mysqli->query().

// Perform a SELECT query to retrieve all data from the 'parkir' table
$query = "SELECT * FROM parkir";

$result = $mysqli->query($query);
$row = "";
if ($result) {
    // Check if there are rows returned
    if ($result->num_rows > 0) {
        // Loop through the result set and process each row
        while ($row = $result->fetch_assoc()) {
            // Access data from each row, e.g., $row['column_name']
            var_dump($row);
            // You can perform additional operations or store the data as needed
        }
    } else {
        echo "No data found in the 'parkir' table.";
    }   
    // Free the result set
    $result->free();
} else {
    echo "Error executing the query: " . $mysqli->error;
}

// Close the database connection when you are done
$mysqli->close();
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Parking Status</title>
</head>

<body>
    <div class="flex justify-center items-center min-h-screen flex-col">
        <table>
            <tbody>
                <tr>
                    <td class="border-4 px-4 py-6">
                        Parkir Tersedia: <span id="availableParkings"></span>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="my-4"></div>
        <table>
            <tbody>
                <tr>
                    <td id="a1" class="border-4 px-8 py-24 bg-green-500">
                        Parking 1
                    </td>
                    <td id="a2" class="border-4 px-8 py-24 bg-green-500">
                        Parking 2
                    </td>
                    <td id="a3" class="border-4 px-8 py-24 bg-green-500">
                        Parking 3
                    </td>
                    <td id="a4" class="border-4 px-8 py-24 bg-green-500">
                        Parking 4
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <script>
        // Define the time interval in milliseconds (e.g., 5000ms for a 5-second delay)
        const refreshInterval = 5000;

        // Function to reload the page after a specified delay
        function autoReloadPage() {
            setTimeout(function () {
                location.reload();
            }, refreshInterval);
        }

        // Function to update the background color of an element based on its value
        function updateBackgroundColor(elementId, value) {
            const element = document.getElementById(elementId);
            if (value === 'false') {
                element.classList.remove('bg-green-500');
                element.classList.add('bg-red-500');
            }
        }

        // Call the autoReloadPage function when the document is ready
        $(document).ready(function () {
            autoReloadPage();
            // Assuming you have values for a1, a2, a3, a4 from your PHP code
            // Update the background color for each element
            updateBackgroundColor('a1', '<?php echo $row['a1']; ?>');
            updateBackgroundColor('a2', '<?php echo $row['a2']; ?>');
            updateBackgroundColor('a3', '<?php echo $row['a3']; ?>');
            updateBackgroundColor('a4', '<?php echo $row['a4']; ?>');
        });
    </script>
</body>
</html>