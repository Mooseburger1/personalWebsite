var mymap = L.map('map', {zoomControl: false}).setView([51.9194, 19.1451], 2.5);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v8',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZWFnbGVwbHlyNDAiLCJhIjoiY2s4eW96ZXQ3MDBoNDNocW5qbmVmeXEyaiJ9.4zlY7-P3senuMXU3VbngSA'
}).addTo(mymap);


arenal = [10.4626, 84.7032]
manuel = [9.3923, 84.1370]
stockholm = [59.3293, 18.0686]
munich = [48.1351, 11.5820]
copenhagen = [55.6761, 12.5683]
hawaii = [21.3069, 157.8583]
vienna = [48.2082, 16.3738]
budapest = [47.4979, 19.0402]
bratislava = [48.1486, 17.1077]
salzburg = [47.8095, 13.0550]
prague = [50.0755, 14.4378]
brussels = [50.8503, 4.3517]
amsterdam = [52.3667, 4.8945]
maldives = [3.2028, 73.2207]
paris = [48.8566, 2.3522]
berlin = [52.5200, 13.4050]
hamburg = [52.5200, 13.4050]
frankfurt = [50.1109, 8.6821]
cologne = [50.9375, 6.9603]
madrid = [40.4168, 3.7038]
split =[43.5081, 16.4402]
dubrovnik = [42.6507, 18.0944]
hannover = [52.3759, 9.7320]