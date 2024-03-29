// Custom JS for the Theme

// Config 
//-------------------------------------------------------------

var companyName = "Car Rental Station"; // Enter your event title


// Initialize Tooltip  
//-------------------------------------------------------------

$('.my-tooltip').tooltip();

emailjs.init('1aIwl9oqParTGeD-V')

// Initialize jQuery Placeholder  
//-------------------------------------------------------------

$('input, textarea').placeholder();



// Toggle Header / Nav  
//-------------------------------------------------------------

$(document).on("scroll",function(){
  if($(document).scrollTop()>39){
    $("header").removeClass("large").addClass("small");
  }
  else{
    $("header").removeClass("small").addClass("large");
  }
});



// Vehicles Tabs / Slider  
//-------------------------------------------------------------

$(".vehicle-data").hide();
var activeVehicleData = $(".vehicle-nav .active a").attr("href");
$(activeVehicleData).show();

$('.vehicle-nav-scroll').click(function(){
    var direction = $(this).data('direction');
    var scrollHeight = $('.vehicle-nav li').height() + 1;
    var navHeight = $('#vehicle-nav-container').height() + 1;
    var actTopPos = $(".vehicle-nav").position().top;
    var navChildHeight = $('#vehicle-nav-container').find('.vehicle-nav').height();
    var x = -(navChildHeight - navHeight);

    var fullHeight = 0;
    $('.vehicle-nav li').each(function() {
        fullHeight += scrollHeight;
    });

    navHeight = fullHeight - navHeight + scrollHeight;

    // Scroll Down
    if ((direction == 'down') && (actTopPos > x) && (-navHeight <= (actTopPos - (scrollHeight * 2)))) {
        topPos = actTopPos - scrollHeight;
        $(".vehicle-nav").css('top', topPos);
    }

    // Scroll Up
    if (direction == 'up' && 0 > actTopPos) {
        topPos = actTopPos + scrollHeight;
        $(".vehicle-nav").css('top', topPos);
    }

    return false;
});




$(".vehicle-nav li").on("click", function(){

  $(".vehicle-nav .active").removeClass("active");
  $(this).addClass('active');

  $(activeVehicleData).fadeOut( "slow", function() {
    activeVehicleData = $(".vehicle-nav .active a").attr("href");
    $(activeVehicleData).fadeIn("slow", function() {});
  });

  return false;
});



// Vehicles Responsive Nav  
//-------------------------------------------------------------

$("<div />").appendTo("#vehicle-nav-container").addClass("styled-select-vehicle-data");
$("<select />").appendTo(".styled-select-vehicle-data").addClass("vehicle-data-select");
$("#vehicle-nav-container a").each(function() {
  var el = $(this);
  $("<option />", {
    "value"   : el.attr("href"),
    "text"    : el.text()
  }).appendTo("#vehicle-nav-container select");
});

$(".vehicle-data-select").change(function(){
  $(activeVehicleData).fadeOut( "slow", function() {
    activeVehicleData = $(".vehicle-data-select").val();
    $(activeVehicleData).fadeIn("slow", function() {});
  });

  return false;
});

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

// Initialize Datepicker
//-------------------------------------------------------------------------------
var nowTemp = new Date();
var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

var checkin = $('#pick-up-date').datepicker({
    format: 'dd/mm/yyyy',
    onRender: function (date) {
        return date.valueOf() < now.valueOf() ? 'disabled' : '';
    }
}).on('changeDate', function (ev) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate());
        checkout.setValue(newDate);
    checkin.hide();
    $('#drop-off-date')[0].focus();
}).data('datepicker');
var checkout = $('#drop-off-date').datepicker({
    format: 'dd/mm/yyyy',
    onRender: function (date) {
        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
    }
}).on('changeDate', function (ev) {
    checkout.hide();
}).data('datepicker');



// Toggle Drop-Off Location
//-------------------------------------------------------------------------------
$(".input-group.drop-off").hide();
$(".different-drop-off").on("click", function(){
	$(".input-group.drop-off").toggle();
  $(".autocomplete-suggestions").css("width", $('.pick-up .autocomplete-location').outerWidth());
  return false;
});



// Scroll to Top Button
//-------------------------------------------------------------------------------

$(window).scroll(function(){
  if ($(this).scrollTop() > 100) {
    $('.scrollup').removeClass("animated fadeOutRight");
    $('.scrollup').fadeIn().addClass("animated fadeInRight");
  } else {
    $('.scrollup').removeClass("animated fadeInRight");
    $('.scrollup').fadeOut().addClass("animated fadeOutRight");
  }
});

$('.scrollup, .navbar-brand').click(function(){
  $("html, body").animate({ scrollTop: 0 }, 'slow', function(){
    $("nav li a").removeClass('active');
  });
  return false;
});



// Location Map Function
//-------------------------------------------------------------------------------

// function loadMap(addressData){

//   var path = document.URL;
//       path = path.substring(0, path.lastIndexOf("/") + 1)

//   var locationContent = "<h2>"+companyName+"</h2>"
//   + "<p>"+addressData.value+"</p>";

//   var locationData = {
//         map: {
//             options: {
//                 maxZoom: 15,
//                 scrollwheel: false,
//             }
//         },
//         infowindow:{
//                 options:{
//                 content: locationContent
//             }
//         },
//         marker:{
//             options: {
//                 icon: new google.maps.MarkerImage(
//                     path+"img/mapmarker.png",
//                     new google.maps.Size(59, 58, "px", "px"),
//                     new google.maps.Point(0, 0),    //sets the origin point of the icon
//                     new google.maps.Point(29, 34)   //sets the anchor point for the icon
//                 )
//             }
//         }
//     };

//     if ($.isEmptyObject(addressData.latLng)) {
//         locationData.infowindow.address = addressData.value;
//         locationData.marker.address = addressData.value;
//     }
//     else{
//         locationData.infowindow.latLng = addressData.latLng;
//         locationData.marker.latLng = addressData.latLng;
//     }

//   $('#locations .map').gmap3(locationData, "autofit" );
// }

// loadMap(locations[0]);


// $("#location-map-select").append('<option value="'+locations[0].value+'">Please select a location</option>');  
// $.each(locations, function( index, value ) {
//   //console.log(index);
//   var option = '<option value="'+index+'">'+value.value+'</option>';
//   $("#location-map-select").append(option);
// });

// $('#location-map-select').on('change', function() {
//   $('#locations .map').gmap3('destroy');
//   loadMap(locations[this.value]);
// });



// Scroll To Animation
//-------------------------------------------------------------------------------

var scrollTo = $(".scroll-to");

scrollTo.click( function(event) {
  $('.modal').modal('hide');
  var position = $(document).scrollTop();
  var scrollOffset = 110;

  if(position < 39)
  {
    scrollOffset = 260;
  }

  var marker = $(this).attr('href');
  $('html, body').animate({ scrollTop: $(marker).offset().top - scrollOffset}, 'slow');

  return false;
});



// setup autocomplete - pulling from locations-autocomplete.js
//-------------------------------------------------------------------------------

$('.autocomplete-location').autocomplete({
  lookup: locations
});



// Contact Form
//-------------------------------------------------------------------------------

$( "#contact-form" ).submit(function() {

  $('#contact-form-msg').addClass('hidden');
  $('#contact-form-msg').removeClass('alert-success');
  $('#contact-form-msg').removeClass('alert-danger');

  $('#contact-form input[type=submit]').attr('disabled', 'disabled');

  $.ajax({
    type: "POST",
    url: "php/index.php",
    data: $("#contact-form").serialize(),
    dataType: "json",
    success: function(data) {

      if('success' == data.result)
      {
        $('#contact-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
        $('#contact-form-msg').html(data.msg[0]);
        $('#contact-form input[type=submit]').removeAttr('disabled');
        $('#contact-form')[0].reset();
      }

      if('error' == data.result)
      {
        $('#contact-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
        $('#contact-form-msg').html(data.msg[0]);
        $('#contact-form input[type=submit]').removeAttr('disabled');
      }

    }
  });

  return false;
});

var priceList = {
  'GENPOD (Ella)': {
    weekday: 109,
    weekdayMultiple: 89,
    weekend: 129,
    weekendMultiple: 109
  },
    'GENPOD (Upgrade Ella)': {
    weekday: 119,
    weekdayMultiple: 99,
    weekend: 139,
    weekendMultiple: 119
  },
  'GENPOD (Leo)': {
    weekday: 169,
    weekdayMultiple: 159,
    weekend: 189,
    weekendMultiple: 169
  },
}

// australia public holidays dates list for 2023 and 2024 array in the format of dd/mm/yyyy
var publicHolidays = [
  '01/01/2023',
  '02/01/2023',
  '26/01/2023',
  '27/01/2023',
  '10/04/2023',
  '25/04/2023',
  '12/06/2023',
  '02/10/2023',
  '25/12/2023',
  '26/12/2023',
  '01/01/2024',
  '02/01/2024',
  '28/01/2024',
  '29/01/2024',
  '25/03/2024',
  '10/04/2024',
  '25/04/2024',
  '10/06/2024',
  '07/10/2024',
  '25/12/2024',
  '26/12/2024'
];

// Function that takes in the model and the dates and returns the price, 
// consider the public holidays, the public holiday price is the same as the weekend price?
// the input dates are in the format of dd/mm/yyyy
function priceCalculator(model, pickupDate, dropoffDate) {
  // calculate the number of days between the pickup date and dropoff date
  model = model.trim();
  // dateformat: dd/mm/yyyy
  var date1 = convertDate(pickupDate);
  var date2 = convertDate(dropoffDate);
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  var numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

  // calculate the number of weekdays and weekends between the pickup date and dropoff date
  var weekdays = 0;
  var weekends = 0;
  var currentDate = date1;
  while (currentDate <= date2) {
    // check if the current date is a weekend
    if (currentDate.getDay() == 0 || currentDate.getDay() == 6) {
      weekends++;
    } else {
      weekdays++;
    }
    // move the current date to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // calculate the number of public holidays between the pickup date and dropoff date
  var publicHolidaysCount = 0;
  for (var i = 0; i < publicHolidays.length; i++) {
    var publicHoliday = new Date(publicHolidays[i]);
    if (publicHoliday >= date1 && publicHoliday <= date2) {
      publicHolidaysCount++;
    }
  }

  // calculate the total price
  var totalPrice = 0;
  if (publicHolidaysCount > 0) {
    totalPrice = priceList[model].weekday * weekdays + priceList[model].weekend * weekends + priceList[model].weekend * publicHolidaysCount;
  } else {
    totalPrice = priceList[model].weekday * weekdays + priceList[model].weekend * weekends;
  }

  return totalPrice;
}

function convertDate(date) {
  var dateArray = date.split('/');
  var newDate = dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2];
  return new Date(newDate);
}

// Car Select Form
//-------------------------------------------------------------------------------

$( "#car-select-form-button" ).click(function() {

  var selectedCar = $("#car-select").find(":selected").text();
  var selectedCarVal = $("#car-select").find(":selected").val();
  var selectedCarImage = $("#car-select").val();
  var pickupLocation = $("#pick-up-location").val();
  var dropoffLocation = $("#drop-off-location").val();
  var pickUpDate = $("#pick-up-date").val();
  var pickUpTime = $("#pick-up-time").val();
  var dropOffDate = $("#drop-off-date").val();
  var dropOffTime = $("#drop-off-time").val();

  var error = 0;
  if(validateNotEmpty(selectedCarImage)) { error = 1; }
  if(validateNotEmpty(pickupLocation)) { error = 1; }
  if(validateNotEmpty(pickUpDate)) { error = 1; }
  if(validateNotEmpty(dropOffDate)) { error = 1; }

  if(0 == error)
  {

    $("#selected-car-ph").html(selectedCar);
    $("#selected-car").val(selectedCar);
    $("#_model").val(selectedCar);
    $("#selected-vehicle-image").attr('src', selectedCarImage);

    $("#pickup-location-ph").html(pickupLocation);
    $("#pickup-location").val(pickupLocation);
    
    if("" == dropoffLocation)
    {
      $("#dropoff-location-ph").html(pickupLocation);
      $("#dropoff-location").val(pickupLocation);
    }
    else
    {
      $("#dropoff-location-ph").html(dropoffLocation);
      $("#dropoff-location").val(dropoffLocation);
    }
    
    $("#pick-up-date-ph").html(pickUpDate);
    $("#pick-up-time-ph").html(pickUpTime);
    $("#_pickup").val(pickUpDate+' at '+pickUpTime);

    $("#drop-off-date-ph").html(dropOffDate);
    $("#drop-off-time-ph").html(dropOffTime);
    $("#_dropoff").val(dropOffDate+' at '+dropOffTime);
    // calculate the price and display it
    var totalPrice = priceCalculator(selectedCar, pickUpDate, dropOffDate);
    $("#rental-fee").html(totalPrice);
    $("#total-price").html(totalPrice + 50);
    $("#_rentalFee").val(totalPrice);
    $("#_totalAmount").val(totalPrice + 50);
    $('#checkoutModal').modal();
  }
  else
  {
    $('#car-select-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
  }

  return false;
});

$( "#btn-reserve" ).click(function() {

  var firstName = $("#_firstname").val();
  var lastName = $("#_lastname").val();
  var email = $("#_emailaddress").val();
  var phone = $("#_phonenumber").val();

  var error = 0;

  if(validateNotEmpty(firstName)) { error = 1; }
  if(validateNotEmpty(lastName)) { error = 1; }
  if(validateNotEmpty(email)) { error = 1; }
  if(validateNotEmpty(phone)) { error = 1; }

  if (error > 0)
  {
    $('#checkout-info-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').delay(2000).fadeOut();
    return false;
  }
});


// Check Out Form
//-------------------------------------------------------------------------------

$( "#checkout-form" ).submit(function() {
  $('#checkout-form-msg').addClass('hidden');
  $('#checkout-form-msg').removeClass('alert-success');
  $('#checkout-form-msg').removeClass('alert-danger');

  $('#checkout-form input[type=submit]').attr('disabled', 'disabled');

  var serviceID = 'default_service';
  var templateID = 'template_qeavp92';

  emailjs.sendForm(serviceID, templateID, this)
   .then(() => {
    $('#checkout-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
    $('#checkout-form input[type=submit]').removeAttr('disabled');

    setTimeout(function(){
      $('.modal').modal('hide');
      $('#checkout-form-msg').addClass('hidden');
      $('#checkout-form-msg').removeClass('alert-success');

      $('#checkout-form')[0].reset();
      $('#car-select-form')[0].reset();
    }, 3000);
   }, (err) => {
    $('#checkout-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
    $('#checkout-form-msg').html(err);
    $('#checkout-form input[type=submit]').removeAttr('disabled');
   });

return false;
});



// Not Empty Validator Function
//-------------------------------------------------------------------------------

function validateNotEmpty(data){
  if (data == ''){
    return true;
  }else{
    return false;
  }
}

