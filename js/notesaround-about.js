NOTESAROUND_ABOUT = function() {

    var posFabio = new google.maps.LatLng( -33.873651, 151.2068896);
    var posTiago = new google.maps.LatLng(37.3864893, -122.0851565);
    var posBruno = new google.maps.LatLng(9.9644099, 106.3469401);
    var posAlves = new google.maps.LatLng(-3.7765593098768635, -65.91796875);
    var posMariana = new google.maps.LatLng(-23.820133578465683, 31.446990966796875);
    var posOpentour = new google.maps.LatLng(38.706932, -9.1356321);

    var fabioText = "The army has the marines, the navy has the seals, we have F�bio. " +
                    "When the going gets though, send F�bio ahead and get out of the way. " +
                    "He kicks ass coding, compared to him the rest of the team are choir boys." +
                    "His first daily note: Impossible is just a big word.";

    var tiagoText = "Is a perfectionist. If one day he went to the moon, he would look for Armstrong�s footprint," +
                    " and retouch it. His dictionary doesn�t have the word good, only awesome. " +
                    "He is not an Architect, but is still looking for the right word." +
                    "Permanent mental note: I will either find a way, or make one.";

    var brunoText = "He is a part-time super-hero, for three times he found the Alzheimer�s cure, but always forgot it." +
                    " He also travelled back in time, to stop an army of Justin Bieber�s mutant clones, " +
                    "from taking over the world. When he is not saving the world and so, he kicks ass coding."+
                    "His note would be: Whenever people agree with me I always feel like I must be wrong.";

    var alvesText = "He is the master, the real guru, with red plastic framed glasses and all. " +
                    "Has a thing for anything that combines social and technology. Loves a good debate, " +
                    "and the way he dominates the latin dances is unnatural for a geek." +
                    "Famous note: What are we doing here? We�re changing the world!";

    var marianaText = "A management/ HR geek. Presents herself as a professional problem solver, " +
                      "but what she really is: a professional lobbyist and shenanigans maker. " +
                      "Always knows the best place for anything in Lisbon, or knows the right person to find it."+
                     "The note she would like to drop: x is the new y.";

    var about = this;
    var aboutMarkers = [];
    var running = false;
    return {

         showAbout : function(markers,map) {
             app.clearMarkers();
             if(aboutMarkers.length == 0) {
                 this.setMarker('Fabio','img/pic_fn.jpg',fabioText,posFabio,map, markers);
                 this.setMarker('Tiago','img/pic_tp.jpg',tiagoText,posTiago,map, markers);
                 this.setMarker('Mariana','img/pic_ms.jpg',marianaText,posMariana,map, markers);
                 this.setMarker('Bruno','img/pic_bt.jpg',brunoText,posBruno,map, markers);
                 this.setMarker('Pedro','img/pic_pa.jpg',alvesText,posAlves,map, markers);
             } else {
                 for(var marker in aboutMarkers) {
                     aboutMarkers[marker].setMap(map);
                 }
             }

             map.panTo(aboutMarkers[aboutMarkers.length-1].getPosition());
             map.setZoom(3);
             running = true;
             var pos = aboutMarkers.length-1;

             var jump = function(pos) {
                 if(pos < 0) {
                     pos = aboutMarkers.length-1;
                 }

                 if(running) {
                     map.panTo(aboutMarkers[pos].getPosition());
                     map.setZoom(3);
                     setTimeout(jump(pos--),8000);
                 }
             };
             setTimeout(jump(pos),8000);
         },



         setMarker : function(name,imgURL, description,pos, map, markers) {
             var noteMarker = new google.maps.Marker({
                 position: pos,
                 map: map,
                 animation: google.maps.Animation.DROP,
                 icon: 'img/marker.png',
                 title : name
             });
             aboutMarkers.push(noteMarker);
             var contentString = '<div id="content">' +
                 '<div id="imgContent" class="imgContent"><a href="' + imgURL + '" target="_blank"><img src="' + imgURL + '"></a></div>' +
                 '<div id="bodyContent" class="bodyContent">' + description + '</div>' +
             '</div>';

             var infowindow = new google.maps.InfoWindow({content:contentString});
             infowindow.open(map, noteMarker);
         },

         hideAbout : function() {
             if (aboutMarkers) {
                 for (var i = 0; i <aboutMarkers.length; i++ ) {
                     console.log("Clearing... " + aboutMarkers[i] + " -> " + aboutMarkers[i].title);
                     aboutMarkers[i].setMap(null);
                     running = false;
                 }
             }
         }
    }
}()