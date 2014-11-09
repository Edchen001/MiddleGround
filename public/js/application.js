

$(document).ready(function() {

  $("form").keyup(function(event){
    if(event.keyCode == 13){
        $(".btn btn-primary btn-lg").click();
    }
});

  initializeMapping();

  View.populateField("formatted_address_1", "coords1");
  View.populateField("formatted_address_2", "coords2");

  $('form').on('submit', function(event) {
    event.preventDefault();
    $form = $(event.target);

    Trip.request["origin"] = $form.find('input[name=coords1]').val();
    Trip.request["destination"] = $form.find('input[name=coords2]').val();
    Trip.calcRoute();

  })

});

function initializeMapping() {
  var newjersey = new google.maps.LatLng(40.1430241,-74.7311156);
  var mapOptions = {
    zoom: 8,
    center: newjersey
  };
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  directionsDisplay.setMap(map);
}



Trip = {
  request: {
    travelMode: google.maps.TravelMode.WALKING
  },

  calcRoute: function(responseExtraction) {
    directionsService.route(this.request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        Response.main(response);
      } else {
        View.displayError();
      }
    });
  }
}


Response = {

  main: function(responseFromGoogle) {
    console.log(responseFromGoogle);
    total_time = this.totalTripTime(responseFromGoogle);
    midPointTime = this.midPointTripTime(total_time);

    this.showAllSteps(responseFromGoogle);

    console.log("Total time: " + total_time);
    console.log("Midpoint time: " + midPointTime);

    stepObject = this.findPhysicalMidStep(responseFromGoogle, midPointTime);

    // THIS RETURNS THE PHYSICAL MID POINT BY DRIVING TIME
    console.log(this.findPhysicalMidPoint(stepObject, midPointTime));

  },

  totalTripTime: function(response) {
    return response.routes[0].legs[0].duration.value;
  },

  midPointTripTime: function(total_time) {
    return Math.floor(total_time / 2);
  },

  showAllSteps: function(routeObject) {
    steps = routeObject.routes[0].legs[0].steps;
    
    counter = 0;
    step_sum = 0;
    for(i = 0; i < steps.length; i++){
      console.log("Step " + counter + " duration:" + steps[i].duration.value);

      step_sum += steps[i].duration.value;
      console.log("Step " + counter + " total duration:" + step_sum);

      counter++;
    }
  },

  findPhysicalMidStep: function(routeObject, midPointTime) {
    steps = routeObject.routes[0].legs[0].steps;
    console.log(steps);

    step_sum = 0;
    next_step_sum = 0;
    for(i = 0; i < steps.length; i++){
      if(step_sum < midPointTime && next_step_sum > midPointTime){
        // console.log("The step that contains midpoint:");
        console.log(steps[i]);
        return { 
          step: steps[i],
          step_sum: step_sum
        }
      } else {
        step_sum += steps[i].duration.value;
        next_step_sum = step_sum + steps[i + 1].duration.value;
        // console.log(step_sum);
      }
    }
  },

  findPhysicalMidPoint: function(stepObject, midPointTime) {
    midPointTime_in_step = midPointTime - stepObject.step_sum;
    total_step_time = stepObject.step.duration.value;

    coord_of_midpoint = Math.floor((midPointTime_in_step * stepObject.step.path.length) / total_step_time);

    // console.log("midPointTime_in_step: " + midPointTime_in_step);
    // console.log("total_step_time: " + total_step_time);
    // console.log("step length: " + stepObject.step.path.length);

    // console.log("step length: " + coord_of_midpoint);

    return stepObject.step.path[coord_of_midpoint];
    
  }

}



View = {
  populateField: function(inputField, populateField) {
    $("input[name=" + inputField + "]").geocomplete().bind("geocode:result", function(event, result){
      coordsObject = result.geometry.location;
      $("input[name=" + populateField + "]").val(coordsObject.k + ", " + coordsObject.B);
      console.log(result.geometry.location);
    });
  },

  displayError: function() {
    $('#error').append('<p><strong>This is not a valid route!</strong></p>');
  }
}