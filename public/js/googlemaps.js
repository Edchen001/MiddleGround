//  var mapOptions = {
//     center: { lat: 40.70668, lng: -74},
//     zoom: 15

//   };

//   // var map = new google.maps.Map(document.getElementById('map-canvas'),
//   //   mapOptions);
// var map = new google.maps.Map(document.getElementById('map-canvas'),
//     mapOptions);



// DIRECTIONS

// var directionsDisplay;
// var directionsService = new google.maps.DirectionsService();
// var map;



//  directionsDisplay = new google.maps.DirectionsRenderer();
//   var wall_st = new google.maps.LatLng(40.70668, -74);
//   var mapOptions = {
//     zoom:15,
//     center: wall_st
//   };
//   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//   directionsDisplay.setMap(map);

function CreateMap(center) {
  this.mapOptions = {
    center: center,
    zoom: 15
  };
}

  function calcRoute(start, end, directionsService, directionsDisplay) {
    console.log('CALCROUTE');
    console.log(start)
    console.log(end)
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
      else{
        console.log("DESTINATION");
    }
    });
  }


  // JS READY DOCUMENT
$(document).ready(function() {
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var coordinates = new google.maps.LatLng(40.70668, -74);
  var start = new google.maps.LatLng(40.70668, -74);
  var end = new google.maps.LatLng(40.70668, -64);
  var map = new CreateMap(coordinates);
  map = new google.maps.Map(document.getElementById('map-canvas'), map.mapOptions);
  directionsDisplay.setMap(map);
  var directionsService = new google.maps.DirectionsService();
  // var start = coordinates;

  // var end = "gallup, nm";
  // initialize();
  // google.maps.event.addDomListener(window, 'load', initialize);
  calcRoute(start, end, directionsService, directionsDisplay);
});
    // var coordinates = {lat: 40.70668, lng: -74}
    // var map1 = new CreateMap(coordinates)
    // var map = new google.maps.Map(document.getElementById('map-canvas'),
    //   map1.mapOptions);



