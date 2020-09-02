const map = L.map('map').setView([32.964037, -96.712847], 15);
const locations = [
    {
        coordinates: [-96.727858, 32.961047],
        address: "1002 N Central Expy #116, Richardson, TX 75080",
        size: 3063,
        cost: 4300,
        diff: -1783,
        video: "https://photos.app.goo.gl/sQTqYMUHxaT1Gxe19",
        notes: [
            "Right on Arapaho Road",
            "High Visibility",
            "Ability to expand",
            "$13/SQ FT",
            "2yr lease"
        ]
    },
    {
        coordinates: [-96.7139115, 32.957717],
        address: "801 Alpha Dr #135, Richardson, TX 75081",
        size: 2600,
        cost: 1950,
        diff: 550,
        video: "https://photos.app.goo.gl/aXS47VYrYGXwb5Mc8",
        notes: [
            "3 yr lease",
            "2% increase/yr",
            "Older building",
            "Not as visible",
            "Spectrum $90/mo 200 up/down",
            "Terrible Parking/Hidden Location",
            "2 months rent for free"
        ]
    },
    {
        coordinates: [-96.7015186, 32.9560671],
        address: "1343 Columbia Dr #431",
        size: 3010,
        cost: 2800,
        diff: -300,
        video: "https://photos.app.goo.gl/GJQrejCsVTr2GDC36",
        notes: [
            "Fiber possible, ATT or Spectrum",
            "Next door to natural hair care",
            "Ground high bay door"
        ]
    },
    {
        coordinates: [-96.7062156, 32.9565463],
        address: "614 Presidential Drive",
        size: 3713,
        cost: 3465,
        diff: -960,
        video: "https://photos.app.goo.gl/sk43s3cnBAFEWxGYA",
        notes: [
            "Semi-dock high bay door",
            "2x exhaust in bay area (i.e. already roof penetration for ventilation)",
            "Hot water",
            "Could knock down wall for larger classroom",
            "Safe area:  City of Richardson repair area is nearby"
        ]
    },
    {
        coordinates: [-96.7040162, 32.956197],
        address: "1323 Columbia Dr #307, Richardson, TX 75081",
        size: 2928,
        cost: 2725,
        diff: -225,
        video: "https://photos.app.goo.gl/TRKLYFbZMU32GbAv6",
        notes: [
            "5 classrooms",
            "Dock high bay door"
        ]
    },
    {
        coordinates: [-96.7064355, 32.9590798],
        address: "1251 American Pkwy, Richardson, TX 75081",
        size: 3413,
        cost: 3171,
        diff: -671,
        video: "https://photos.app.goo.gl/DvrUeH4HSERUjD419",
        notes: [
            "Lots of individual rooms",
            "1 shared wall (all others had 2)",
            "3% increase each year",
            "Security Deposit:  2 months of last month’s rent"
        ]
    },
    {
        coordinates: [-96.7270749, 32.9618259],
        address: "1002 N Central Expy #351, Richardson, TX 75080",
        size: 4000,
        cost: 4260,
        diff: -1760,
        video: "https://photos.app.goo.gl/Xf2VrAwzo8od3SKu7",
        notes: [
            "Not “move-in ready”."
        ]
    },
    {
        coordinates: [-96.7155506, 32.9576808],
        address: "801 Alpha Dr #105, Richardson, TX 75081",
        size: 3300,
        cost: 2100,
        diff: 400,
        video: "https://photos.app.goo.gl/248AoSeW4Xdfs2pu5",
        notes: [
            "Previously a countertop store"
        ]
    },
    {
        coordinates: [-96.717211, 32.9704266],
        address: "1750 Alma Rd #104, Richardson, TX 75081",
        size: 2400,
        cost: 2100,
        diff: 400,
        video: "https://photos.app.goo.gl/D1mtE1vZmq7TQTdD8",
        notes: [
            "Retail location",
            "Faces Central Expressway",
            "Miniscule Warehouse area"
        ]
    }
];
const geoJSON = locations.map(place => {
    return {
        type: "Feature",
        properties: {
            ...place
        },
        geometry: {
            type: "Point",
            coordinates: place.coordinates
        }
    }
})
let osmLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFub3N0ZWVsZSIsImEiOiJja2VoYm1wNWgwOGVsMnNwaHExa3ZoMHduIn0.Z8LnHH5nNxiAtKykKlMEgA'
}).addTo(map);
let places = L.geoJSON(geoJSON, {
    onEachFeature: function (feature, layer) {
        const {address, cost, size, notes, diff, video} = feature.properties;
        layer.bindPopup(
          `
          ${address}
          <br/>
          Price: $${cost}/month (<span style="color: ${ diff > 0 ? `green` : `red`};">$${Math.abs(diff)}</span>)
          <br/>
          Size: ${size} sqft
          <br/>
          <a href="${video}">Video</a>
          <br/>
          Notes: <ul>${notes.map(note => { return `<li>${note}</li>`; }).join("")}</ul>
    `   
        );
              }
}).addTo(map);
