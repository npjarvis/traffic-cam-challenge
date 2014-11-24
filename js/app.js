// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";


$(document).ready(function() {
    // reference div element from html, set starting center
    var mapElem = document.getElementById('map');
    var center = {
        lat: 47.6,
        lng: -122.3
    };

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    var cams;
    var infowindow = new google.maps.InfoWindow();
    var markers = [];

    // reference Seattle cams json file
    $.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
        .done(function(data) {
            cams = data;
            // sets unique icon
            var img = 'img/cone.png';
            data.forEach(function(locate) {
                // creates marker with default position
                var marker = new google.maps.Marker({
                    position: {
                        lat: Number(locate.location.latitude),
                        lng: Number(locate.location.longitude)
                    },
                    map: map,
                    image: locate.imageurl.url,
                    icon: img
                });
                markers.push(marker);
                // adds seattle camera images/markers
                google.maps.event.addListener(marker, 'click', function(){
                    map.panTo(marker.getPosition());
                    var htmlcode = '<h2>' + locate.cameralabel + '</h2>';
                    htmlcode += '<img src="' + marker.image + '">';
                    infowindow.setContent(htmlcode);
                    infowindow.open(map, this);
                    marker.setAnimation(google.maps.Animation.DROP);
                });
                google.maps.event.addListener(map, 'click', function() {
                    infowindow.close();
                });
                var searchVal;
                // implements search function
                $('#search').bind("search keyup", function() {
                    searchVal = $('#search').val().toLowerCase();
                    var camera = locate.cameralabel.toLowerCase();
                    if (camera.indexOf(searchVal)< 0) {
                        marker.setMap(null);
                    } else {
                        marker.setMap(map);
                    }
                });
            })
        })
        // alerts connection error
        .fail(function(err){
            alert(err);
        })
        .always(function(){


        });

});

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

