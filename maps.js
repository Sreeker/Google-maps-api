var map;
var infowindow;
var myLat;
var myLong;
var LatLng;
var markers = [];

//checking if location feature is available
function initCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(load);
  } else {
    showError("Your browser does not support Geolocation!");
  }
}

function load(position){

  myLat = position.coords.latitude; //getting current location
  myLong = position.coords.longitude;
  LatLng = new google.maps.LatLng(myLat , myLong);
  showmap(LatLng);
  nearby(LatLng);

}
//Showing the map
  function showmap(LatLng){
  map = new google.maps.Map(document.getElementById('map'), {
    center: LatLng,
    zoom: 13
  });
  //marker of your location
  var image = 'http://maps.google.com/mapfiles/kml/paddle/grn-circle.png';
  var marker = new google.maps.Marker({
      position: LatLng,
      map: map,
      icon : image
    });
  }
  //getting nearby places
  function nearby(LatLng){
    
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  var place;
  if (document.getElementById('school').checked) {
  place = "school"
  }
  else if (document.getElementById('hospital').checked) {
  place = "hospital"
  }
  else if (document.getElementById('cafe').checked) {
  place = "cafe"
  }
  else if (document.getElementById('atm').checked) {
  place = "atm"
  }

  service.nearbySearch({
    location: LatLng,
    radius: 5000,
    type: [place]
  }, callback);

  clearResults(markers);

}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      markers.push(createMarker(results[i]));
    }
  }
}
// creating the markers on all nearby places
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  google.maps.event.addListener(marker, 'mouseover', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
  return marker;
}

function clearResults(markers){
  for(var m in markers){
    markers[m].setMap(null);
  }
  markers = [];
}