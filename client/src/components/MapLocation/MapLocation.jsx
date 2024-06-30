import React, { useEffect, useState } from 'react';

const MapComponent = () => {
  const [map, setMap] = useState(null);
  // const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API;


  useEffect(() => {
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBxUFIWpz4iAGAsOkpgOsRmS36ZtGsuPh4&libraries=places`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener('load', () => {
      // Initialize the map once the Google Maps API is loaded
      const newMap = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
      setMap(newMap);
    });
  }, []);

  useEffect(() => {
    if (map) {
      // Get the user's current location using the Geolocation API
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // Add a marker at the user's location
        new window.google.maps.Marker({
          position: userLocation,
          map,
          title: 'Your Location',
        });
        map.setCenter(userLocation);
      });
    }
  }, [map]);

  return <div id="map" style={{ height: '40rem', width: '100%' }}></div>;
};

export default MapComponent;

// import React, { useEffect, useState } from 'react';

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API;

//   useEffect(() => {
//     if (!googleMapsApiKey) {
//       console.error('Google Maps API key is missing');
//       return;
//     }


//     const googleMapScript = document.createElement('script');
//     googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
//     googleMapScript.async = true;
//     googleMapScript.defer = true;

//     googleMapScript.onload = () => {
//     googleMapScript.async = true;
//     googleMapScript.defer = true;

//     googleMapScript.onload = () => {
//       const newMap = new window.google.maps.Map(document.getElementById('map'), {
//         center: { lat: -34.397, lng: 150.644 },
//         zoom: 8,
//       });
//       setMap(newMap);
//     };

//     googleMapScript.onerror = (e) => {
//       console.error('Google Maps API script could not be loaded.', e);
//     };

//     window.document.body.appendChild(googleMapScript);
//   }, [googleMapsApiKey]);
//     };

//     googleMapScript.onerror = (e) => {
//       console.error('Google Maps API script could not be loaded.', e);
//     };

//     window.document.body.appendChild(googleMapScript);
//   }, [googleMapsApiKey]);

//   useEffect(() => {
//     if (map) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const userLocation = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
//         new window.google.maps.Marker({
//           position: userLocation,
//           map,
//           title: 'Your Location',
//         });
//         map.setCenter(userLocation);
//       });
//     }
//   }, [map]);

//   return <div id="map" style={{ height: '40rem', width: '100%' }}></div>;
// };

// export default MapComponent;
