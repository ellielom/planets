
$(document).ready(function(){
    $.ajax({
            type:"GET",
            url : "planets.json",
            dataType: "json",
            success: load,
            error: function (e){
                alert("Cannot load AJAX file");
            }
        }
    );
});

let planets;

function load(data) {

    let counter = 0;
    let divClass = "leftGrid"
    planets = data.solarSystem.planets;

    planets.forEach(function (planet){


        let output = "<tr><td class='planetTD'>"+`<a href="planet.html" onclick="save('${planet.planetName}')">` +
                     '<img src="images/' + planet.image +'"></a></td><td class="textTD">' + planet.planetName + "</td></tr>";

        if (counter < 4)
            $("#planetsLeft").append(output);
        else
            $("#planetsRight").append(output);

        counter++;

    });
}


function save(planetName) {
    planets.forEach(function (planet) {
        if (planetName == planet.planetName){
            localStorage.setItem("planet", JSON.stringify(planet));
        }
    })
}


function planet() {


    let planet = JSON.parse(localStorage.getItem("planet"));

    output =
        "<Planet Colour: " + planet.planetColor +"<br> Planet Radius: " + planet.planetRadiusKM + "KM <br>" +
        " Distance" +
        " from the Sun: " + planet.distInMillionsKM.fromSun +
        "KM <br> Distance from Earth: " + planet.distInMillionsKM.fromEarth + "KM ";


    $("h1").html("Information about "+planet.planetName);
    $("p").html(output);


    let css = {
        "background-image": "url('images/" + planet.image+"')",
        "background-repeat": "no-repeat",
        "background-size": "cover"
        };
    $("body").css(css);



}

function back(){
    window.location.replace("index.html");
}