var mymap = L.map('map', {zoomControl: false}).setView([51.9194, 19.1451], 2.5);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v8',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZWFnbGVwbHlyNDAiLCJhIjoiY2s4eW96ZXQ3MDBoNDNocW5qbmVmeXEyaiJ9.4zlY7-P3senuMXU3VbngSA'
}).addTo(mymap);


places = [

    {Location: 'Arenal Volcano, Costa Rica', lat:10.4626, long:-84.7031},
    {Location: 'Manuel Antonio, Costa Rica', lat:9.3923, long:-84.1370},
    {Location: 'Stockholm, Sweden', lat:59.3293,  long:18.0686},
    {Location: 'Munich, Germany', lat:48.1351, long:11.5820},
    {Location: 'Copenhagen, Denmark', lat:55.6761,  long:12.5683},
    {Location: 'Honolulu, Hawaii', lat:21.3069, long:157.8583 },
    {Location: 'Vienna, Austria', lat:48.2082, long:16.3738 },
    {Location: 'Budapest, Hungary', lat:47.4979, long: 19.0402},
    {Location: 'Bratislava, Slovakia', lat:48.1486,long: 17.1077 },
    {Location: 'Salzburg, Austria', lat:47.8095, long: 13.0550},
    {Location: 'Prague, Czech Republic', lat:50.0755, long:  14.4378 },
    {Location: 'Brussls, Belgium', lat:50.8503, long: 4.3517 },
    {Location: 'Amsterdam, Netherlands', lat:52.3667,long: 4.8945},
    {Location: 'Centara Grand, Maldives', lat:3.2028,long:  73.2207},
    {Location: 'Paris, France', lat:48.8566,long: 2.3522},
    {Location: 'Bermin, Germany', lat:52.5200, long: 13.4050},
    {Location: 'Hamburg, Germany', lat:52.5200, long: 13.4050},
    {Location: 'Frankfurt, Germany', lat:50.1109, long:  8.6821},
    {Location: 'Cologne, Germany', lat:50.9375,long: 6.9603 },
    {Location: 'Madrid, Spain', lat:40.4168, long:-3.7038},
    {Location: 'Split, Croatia', lat:43.5081, long: 16.4402 },
    {Location: 'Dubrovnik, Croatia', lat:42.6507, long: 18.0944},
    {Location: 'Hannover, Germany', lat:52.3759, long:  9.7320},
    {Location: 'Venice, Italy', lat:45.4408, long: 12.3155},
    {Location: 'Rome, Italy', lat:41.9028, long: 12.4964},
    {Location: 'Pompeii, Italy', lat:40.7642, long: 14.4989},
    {Location: 'Mt. Vesuvius, Italy', lat:40.8224, long:14.4289},
    {Location: 'Athens, Greece', lat:37.9838, long:23.7275},
    {Location: 'Santorini, Greece', lat:36.3932, long:25.4615},
    {Location: 'Beirut, Lebanon', lat:33.8938, long:35.5018}

]

places.forEach(function(d){
    L.marker([d.lat, d.long]).addTo(mymap).bindPopup(d.Location)
});