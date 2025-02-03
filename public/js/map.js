

    // const map = L.map('map').setView([22.2587, 71.1924], 7);  // Gujarat coordinates

    // // Add OpenStreetMap tiles to the map
    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '&copy; OpenStreetMap contributors',  // Required attribution for using OSM data
    //   maxZoom: 19  // Maximum zoom level
    // }).addTo(map);

    // // Add a marker at the center (Gujarat)
    // L.marker([22.2587, 71.1924]).addTo(map)
    //   .bindPopup('Gujarat')
    //   .openPopup();


    
// map.js
// Initialize the map with default coordinates (fallback to Gujarat, India)
// const map = L.map('map').setView([22.2587, 71.1924], 7);  // Default Gujarat coordinates

// // Add OpenStreetMap tiles to the map
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; OpenStreetMap contributors',
//   maxZoom: 19
// }).addTo(map);

// // Fetch the listing data passed from the backend


// // Function to add marker on the map based on listing's location
// (function () {
//   let coordinates = [22.2587, 71.1924]; // Default coordinates (fallback)

//   // If listing has coordinates (latitude and longitude), use them directly
//   if (listing.latitude && listing.longitude) {
//     coordinates = [listing.latitude, listing.longitude];
//   }

//   // Set the map view to the coordinates
//   map.setView(coordinates, 12);

//   // Add a marker at the coordinates and bind a popup with listing details
//   L.marker(coordinates)
//     .addTo(map)
//     .bindPopup(`<b>${listing.title}</b><br>${listing.location}`)
//     .openPopup();
// })();




// const map = L.map('map').setView([22.2587, 71.1924], 7); // Default Gujarat coordinates

// // Add OpenStreetMap tiles
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; OpenStreetMap contributors',
//   maxZoom: 19
// }).addTo(map);

// // Function to get coordinates from a location
// async function getCoordinates(location) {
//   try {
//     const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
//     const data = await response.json();
//     if (data.length > 0) {
//       return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
//     }
//   } catch (error) {
//     console.error("Error fetching coordinates:", error);
//   }
//   return [22.2587, 71.1924]; // Default Gujarat coordinates as fallback
// }

// // Show marker and place details
// (async function () {
//   if (listing.location) {
//     const coordinates = await getCoordinates(listing.location);

//     // Set map view to the fetched coordinates
//     map.setView(coordinates, 12);

//     // Add marker and popup
//     L.marker(coordinates)
//       .addTo(map)
//       .bindPopup(`<b>${listing.title}</b><br>${listing.location}, ${listing.country}`)
//       .openPopup();

//     // Fetch nearby place names using reverse geocoding
//     fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates[0]}&lon=${coordinates[1]}`)
//       .then(response => response.json())
//       .then(data => {
//         if (data && data.display_name) {
//           L.popup()
//             .setLatLng(coordinates)
//             .setContent(`<b>${data.display_name}</b>`)
//             .openOn(map);
//         }
//       })
//       .catch(error => console.error("Error fetching place details:", error));
//   } else {
//     alert("No location available for this listing.");
//   }
// })();




const map = L.map('map').setView([22.2587, 71.1924], 7); // Default Gujarat coordinates

// Add OpenStreetMap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);

// Function to get coordinates from a location
async function getCoordinates(location) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
    const data = await response.json();
    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
  }
  return [22.2587, 71.1924]; // Default Gujarat coordinates as fallback
}

// Show marker, circle, and place details
(async function () {
  if (listing.location) {
    const coordinates = await getCoordinates(listing.location);

    // Set map view to the fetched coordinates
    map.setView(coordinates, 12);

    // Add a red circle around the location
    L.circle(coordinates, {
      // color: 'red',        // Circle color
      // fillColor: '#f03',   // Fill color
      // fillOpacity: 0.5,    // Opacity of fill
      // radius: 500          // Radius of circle in meters
      color: 'darkred',        // Darker circle color
      fillColor: '#ff6666',    // Lighter fill color
      fillOpacity: 0.6,        // Increased opacity
      radius: 900    
    
    }).addTo(map);

    // Add marker and popup
    L.marker(coordinates)
      .addTo(map)
      .bindPopup(`<b>${listing.title}</b><br>${listing.location}, ${listing.country}`)
      .openPopup();

    // Fetch nearby place names using reverse geocoding
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates[0]}&lon=${coordinates[1]}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.display_name) {
          L.popup()
            .setLatLng(coordinates)
            .setContent(`<b>${data.display_name}</b>`)
            .openOn(map);
        }
      })
      .catch(error => console.error("Error fetching place details:", error));
  } else {
    alert("No location available for this listing.");
  }
})();


