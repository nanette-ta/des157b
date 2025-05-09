(function () {
  "use strict";

  var map = L.map("map").setView([38.546719, -121.744339], 14);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 20,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var sushi = L.marker([38.560312, -121.756716]).addTo(map);
  sushi.bindPopup("<b>This is my number 1 food spot!</b><br>").openPopup();

  var dumpling = L.marker([38.542177, -121.725239]).addTo(map);
  dumpling
    .bindPopup("<b>This is my second favorite food spot!</b><br>")
    .openPopup();

  var curry = L.marker([38.5447, -121.738841]).addTo(map);
  curry.bindPopup("<b>This is my third food spot!</b><br>").openPopup();

  //   var circle = L.circle([51.508, -0.11], {
  //     color: "red",
  //     fillColor: "#f03",
  //     fillOpacity: 0.5,
  //     radius: 500,
  //   }).addTo(map);

  //   var polygon = L.polygon([
  //     [51.509, -0.08],
  //     [51.503, -0.06],
  //     [51.51, -0.047],
  //   ]).addTo(map);

  marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  //   circle.bindPopup("I am a circle.");
  //   polygon.bindPopup("I am a polygon.");
})();
