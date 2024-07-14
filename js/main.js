/*
Scripting 2
Assignment 1
Name: Alexander Liew 
Pem Group: 1
Admin Number: 191755G
*/
$sceneMgr.setStage('.scene'); //Set staging scene
//Defining global variables for all code and functions
var json2hrfc,areafcarray,jsonairtemp,areaairarray,region,regionshort,westPlace,northPlace,centralPlace,northeastPlace,southeastPlace,rgselect,card;
//encapsulate live data loading into a function
function LoadWeatherData(){
    //Weather Data
    $.ajax({
        type: "GET",
        url: "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast",
        dataType: "json"
    })
        .done(function(json) {
        json2hrfc=json;
        console.log(json2hrfc);
        areafcarray=json2hrfc.items[0].forecasts;
        console.log(areafcarray);
        updateTS=json2hrfc.items[0].update_timestamp;
        //Load second data
        LoadTemperatureData();
    })
        .fail(function() {
        console.log("Opps something went wrong, please try again later");
    });
}
function LoadTemperatureData(){
    $.ajax({
        type: "GET",
        url: "https://api.data.gov.sg/v1/environment/air-temperature",
        dataType: "json"
    })
        .done(function(json) {
        jsonairtemp=json;
        console.log(jsonairtemp);
        areaairarray=jsonairtemp.items[0].readings;
        console.log(areaairarray);
        //Show data
        ShowData();
    })
        .fail(function() {
        console.log("Opps something went wrong, please try again later");
    });
}
//Getting the day
function dayExtract(ts){
    return ts.slice(8,10);
}
//Getting the date
function monthExtract(ts){
    return ts.slice(5,7);
}
//Getting the year
function yearExtract(ts){
    return ts.slice(0,4);
}
//Getting the time
function timeExtract(ts){
    return ts.slice(11,16);
}
/* Displaying data after successful loading */
function ShowData(){ 
    //Region array
    region =["West","North","Central","North East","South East"];
    regionshort=["west","north","central","northeast","southeast"]
    //Timestamp
    var myDay = parseInt(dayExtract(updateTS));
    var exMonth = parseInt(monthExtract(updateTS))-1;
    //Month array
    var month=[ "January","Feburary","March","April","May","June","July","August","September","October","November","December"]
    var myYear = yearExtract(updateTS);
    var myTime = timeExtract(updateTS);
    //Lising time for all pages
    var html=`${myDay} ${month[exMonth]} ${myYear} ${myTime}`;
    $(".time").append(html);
    //Listing temperature in home page
    var temp = parseInt(areaairarray[2].value);
    $(".temperature").html(`${temp}°C`);

    //Listing Weather
    var forecast = areafcarray[0].forecast;
    console.log(forecast);
    var fc = DataConvert(forecast); //Shorten data of weather
    console.log(fc);
    //Conditions if weather is windy, cloudy, rain...
    if(fc=="windy"){
        $(".weatherArt").addClass(`${fc}`);
        $(".weather").html(`${forecast}`);
    }
    else if(fc=="party-cloudy_day"||"cloudy"){
        $(".weatherArt").addClass(`${fc}`);
        $(".weather").html(`${forecast}`);
    }
    else if(fc=="light-rain"||"light-showers"){
        $(".weatherArt").addClass(`${fc}`);
        $(".weather").html(`${forecast}`);
    }
    else if(fc=="moderate-rain"||"showers"){
        $(".weatherArt").addClass(`${fc}`);
        $(".weather").html(`${forecast}`);
    }
    else if(fc=="heavy-rain"||"heavy-showers"){
        $(".weatherArt").addClass(`${fc}`);
        $(".weather").html(`${forecast}`);
    }
    else if(fc=="passing-showers"){
        $(".weatherArt").addClass(`${fc}`);
        $(".weather").html(`${forecast}`);
    }
    else if(fc=="thundery-showers"){
        $(".weatherArt").addClass(`${fc}`);
        $(".weather").html(`${forecast}`);
    }
    else if(fc=="heavy-thundery-showers"){
        $(".weatherArt").addClass(`${fc}`);
        $(".weather").html(`${forecast}`);
    }
    else if(fc=="heavy-thundery-showers-with-gusty-winds"){
        $(".weatherArt").addClass(`${fc}`);
        $(".weather").html(`${forecast}`);
    }
    else{
        $(".weather").html(`${forecast}`);
    }
}
//Shorten data
function DataConvert(str)
{
    newstr=str.replace(/\s+/g,"-");
    newstr=newstr.replace("(","_");
    newstr=newstr.replace(")","_");
    newstr=newstr.replace("&","N");
    newstr=newstr.toLowerCase();
    return newstr;
}

/* Click events */
//Done in side-navigation and home page
function pinHandler(){
    closeNav();
    dataId=$(this).data("id");
    console.log(dataId);
    var rg = DataConvert(region[dataId]);
    console.log(rg);
    console.log(rg+"Map");

    //When user click on pin in home scene or side-navigation, load selected region
    var select=`<h1>Select place</h1><div>${region[dataId]}</div><div class="${rg+"Map"}"><div class="${rg}"></div><div class="mapPin0" data-id=0></div><div class="mapPin1" data-id=1></div><div class="mapPin2" data-id=2></div></div>`
    $("#select-scene .area").html(select);

    //Load select array based on selected region
    if(rg=="west"){
        rgselect=[{name:"Jurong Central Park",temp:`${parseInt(areaairarray[0].value)}°C`,weather:areafcarray[18].forecast,getThere:"<h3>How to get there</h3><p>MRT: Boon Lay<br>Bus: 79, 246, 249</p>",img1:"jurongCentral1",img2:"jurongCentral2"},{name:"Jurong Lake Gardens",temp:`${parseInt(areaairarray[0].value)}°C`,weather:areafcarray[16].forecast,getThere:"<h3>How to get there</h3><p>MRT: Lakeside<br>Bus: 154, 180, 246</p>",img1:"jurongLake1",img2:"jurongLake2"},{name:"West Coast Park",temp:`${parseInt(areaairarray[0].value)}°C`,weather:areafcarray[30].forecast,getThere:"<h3>How to get there</h3><p>MRT: Haw Par Villa<br>Bus: 175, 176</p>",img1:"westCoast1",img2:"westCoast2"}];
    }
    else if(rg=="north"){
        rgselect=[{name:"Admiralty Park",temp:`${parseInt(areaairarray[1].value)}°C`,weather:areafcarray[45].forecast,getThere:"<h3>How to get there</h3><p>MRT: Woodlands<br>Bus: 169, 903</p>",img1:"woodlands1",img2:"woodlands2"},{name:"Sembawang Park",temp:`${parseInt(areaairarray[1].value)}°C`,weather:areafcarray[32].forecast,getThere:"<h3>How to get there</h3><p>MRT: Sembawang<br>Bus: 882</p>",img1:"sembawang1",img2:"sembawang2"},{name:"Yishun Dam",temp:`${parseInt(areaairarray[1].value)}°C`,weather:areafcarray[46].forecast,getThere:"<h3>How to get there</h3><p>MRT: Yishun<br>Bus: 103, 117</p>",img1:"yishun1",img2:"yishun2"}];
    }
    else if(rg=="central"){
        rgselect=[{name:"Bishan Park",temp:`${parseInt(areaairarray[2].value)}°C`,weather:areafcarray[2].forecast,getThere:"<h3>How to get there</h3><p>MRT: Bishan<br>Bus: 53, 55, 133, 135</p>",img1:"bishan1",img2:"bishan2"},{name:"Marina Bay",temp:`${parseInt(areaairarray[2].value)}°C`,weather:areafcarray[12].forecast,getThere:"<h3>How to get there</h3><p>MRT: Bayfront<br>Bus: 36, 56, 77, 857</p>",img1:"marina1",img2:"marina2"},{name:"Punggol Waterway Park",temp:`${parseInt(areaairarray[2].value)}°C`,weather:areafcarray[29].forecast,getThere:"<h3>How to get there</h3><p>MRT: Punggol<br>Bus: 43, 50, 62, 136</p>",img1:"punggol1",img2:"punggol2"}];
    }
    else if(rg=="north-east"){
        rgselect=[{name:"Pasir Ris Park",temp:`${parseInt(areaairarray[3].value)}°C`,weather:areafcarray[24].forecast,getThere:"<h3>How to get there</h3><p>MRT: Pasir Ris<br>Bus: 3, 5, 6, 12</p>",img1:"pasirris1",img2:"pasirris2"},{name:"Lorong Halus Bridge",temp:`${parseInt(areaairarray[3].value)}°C`,weather:areafcarray[29].forecast,getThere:"<h3>How to get there</h3><p>MRT: Punggol<br>Bus: 50, 381</p>",img1:"redbridge1",img2:"redbridge2"},{name:"Tampines Eco Green",temp:`${parseInt(areaairarray[3].value)}°C`,weather:areafcarray[38].forecast,getThere:"<h3>How to get there</h3><p>MRT: Tampines<br>Bus: 4, 8, 15, 18</p>",img1:"tampines1",img2:"tampines2"}];
    }
    else if(rg=="south-east"){
        rgselect=[{name:"East Coast Park",temp:`${parseInt(areaairarray[4].value)}°C`,weather:areafcarray[22].forecast,getThere:"<h3>How to get there</h3><p>MRT: Paya Lebar<br>Bus: 15, 43, 134, 135</p>",img1:"eastCoast1",img2:"eastCoast2"},{name:"Bedok Park",temp:`${parseInt(areaairarray[4].value)}°C`,weather:areafcarray[1].forecast,getThere:"<h3>How to get there</h3><p>MRT: Bedok North<br>Bus: 23, 60, 87, 137</p>",img1:"bedok1",img2:"bedok2"},{name:"Changi Village",temp:`${parseInt(areaairarray[4].value)}°C`,weather:areafcarray[9].forecast,getThere:"<h3>How to get there</h3><p>MRT: Pasir Ris<br>Bus: 2, 29, 59, 109</p>",img1:"village1",img2:"village2"}];
    }

    //Load places on cards based on selected region
    card=`<div id="${rg+"Card"}">
<div id="card0" class="card left">
<div class="cardplace">
<h3>${rgselect[0].name}</h3>
<div class="temperature">${rgselect[0].temp}</div>
<div class="weather">${rgselect[0].weather}</div>
<div class="btn" data-id=0>Bring me there</div>
</div>
</div>
<div id="card1" class="card">
<div class="cardplace">
<h3>${rgselect[1].name}</h3>
<div class="temperature">${rgselect[1].temp}</div>
<div class="weather">${rgselect[1].weather}</div>
<div class="btn" data-id=1>Bring me there</div>
</div>
</div>
<div id="card2" class="card right">
<div class="cardplace">
<h3>${rgselect[2].name}</h3>
<div class="temperature">${rgselect[2].temp}</div>
<div class="weather">${rgselect[2].weather}</div>
<div class="btn" data-id=2>Bring me there</div>
</div>
</div>
</div>`

    $("#select-scene .cardArea").html(card);
    
    // Setting starting animation for select scene
    gsap.set('.mapPin0,.mapPin1,.mapPin2', {
        clearProps: "all"
    });
    gsap.from('.mapPin1', {
        y: 20,
        scale: 3,
        repeat: -1,
        yoyo: true,
        duration: 1
    });
    //When user clicks on selected pin or button. Bring user to next scene with the selected place data
    $(".btn,.mapPin0,.mapPin1,.mapPin2").on("click",btnHandler);
    $('.btn,.mapPin0,.mapPin1,.mapPin2').on("click", () => {
        $sceneMgr.gotoScene("section", "fade")
    });
    //Swipe interactivity for cards
    swipeHandler();
}
//Swipe function for cards
function swipeHandler(){
    var myCard0 = document.getElementById('card0');
    var mC0 = new Hammer(myCard0);
    mC0.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
    mC0.on("swipeleft tap", function(ev){
        if(ev.type=="swipeleft"){ //select card1
            gsap.from('.mapPin1', {
                y: 20,
                scale: 3,
                repeat: -1,
                yoyo: true,
                duration: 1
            });
            gsap.set('.mapPin0,.mapPin2', {
                clearProps: "all"
            });
            gsap.killTweensOf(".mapPin0,.mapPin2");
            $("#card0").addClass("left");
            $("#card1").removeClass("right");
            $("#card2").removeClass("farright");
            $("#card2").addClass("right");
        }
        if(ev.type=="tap"){ //select card0
            gsap.from('.mapPin0', {
                y: 20,
                scale: 3,
                repeat: -1,
                yoyo: true,
                duration: 1
            });
            gsap.set('.mapPin1,.mapPin2', {
                clearProps: "all"
            });
            gsap.killTweensOf(".mapPin1,.mapPin2");
            $("#card0").removeClass("farleft");
            $("#card0").removeClass("left");
            $("#card1").removeClass("left");
            $("#card1").addClass("right");
            $("#card2").addClass("farright");
        }
    });
    var myCard1 = document.getElementById('card1');
    var mC1 = new Hammer(myCard1);
    mC1.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
    mC1.on("swipeleft swiperight tap", function(ev){
        if(ev.type=="swipeleft"){ //select card2
            gsap.from('.mapPin2', {
                y: 20,
                scale: 3,
                repeat: -1,
                yoyo: true,
                duration: 1
            });
            gsap.set('.mapPin0,.mapPin1', {
                clearProps: "all"
            });
            gsap.killTweensOf(".mapPin0,.mapPin1");
            $("#card0").addClass("farleft");
            $("#card1").addClass("left");
            $("#card1").removeClass("right");
            $("#card2").removeClass("right");
            $("#card2").removeClass("farright");
        }
        if(ev.type=="swiperight"){ //select card0
            gsap.from('.mapPin0', {
                y: 20,
                scale: 3,
                repeat: -1,
                yoyo: true,
                duration: 1
            });
            gsap.set('.mapPin1,.mapPin2', {
                clearProps: "all"
            });
            gsap.killTweensOf(".mapPin1,.mapPin2");
            $("#card0").removeClass("farleft");
            $("#card0").removeClass("left");
            $("#card1").removeClass("left");
            $("#card1").addClass("right");
            $("#card2").addClass("farright");
        }
        if(ev.type=="tap"){ //select card1
            gsap.from('.mapPin1', {
                y: 20,
                scale: 3,
                repeat: -1,
                yoyo: true,
                duration: 1
            });
            gsap.set('.mapPin0,.mapPin2', {
                clearProps: "all"
            });
            gsap.killTweensOf(".mapPin0,.mapPin2");
            $("#card0").removeClass("farleft");
            $("#card0").addClass("left");
            $("#card1").removeClass("left");
            $("#card1").removeClass("right");
            $("#card2").removeClass("farright");
            $("#card2").addClass("right");
        }
    });
    var myCard2 = document.getElementById('card2');
    var mC2 = new Hammer(myCard2);
    mC2.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
    mC2.on("swiperight tap", function(ev){
        if(ev.type=="swiperight"){ //select card1
            gsap.from('.mapPin1', {
                y: 20,
                scale: 3,
                repeat: -1,
                yoyo: true,
                duration: 1
            });
            gsap.set('.mapPin0,.mapPin2', {
                clearProps: "all"
            });
            gsap.killTweensOf(".mapPin0,.mapPin2");
            $("#card0").removeClass("farleft");
            $("#card0").addClass("left");
            $("#card1").removeClass("left");
            $("#card2").addClass("right");
        }
        if(ev.type=="tap"){ //select card2
            gsap.from('.mapPin2', {
                y: 20,
                scale: 3,
                repeat: -1,
                yoyo: true,
                duration: 1
            });
            gsap.set('.mapPin0,.mapPin1', {
                clearProps: "all"
            });
            gsap.killTweensOf(".mapPin0,.mapPin1");
            $("#card0").addClass("farleft");
            $("#card1").addClass("left");
            $("#card1").removeClass("right");
            $("#card2").removeClass("right");
            $("#card2").removeClass("farright");
        }
    });
}
//When user clicks on a button or pin in the select scene, go to next next scene with selected place data
function btnHandler(){
    placeId=$(this).data("id");
    console.log(placeId);
    console.log(rgselect[placeId].name);
    $(".place").html(`<h2>${rgselect[placeId].name}</h2>`);
    $(".placeInfo .temperature").html(rgselect[placeId].temp);
    $(".placeInfo .weather").html(rgselect[placeId].weather);
    $(".getThere").html(rgselect[placeId].getThere);
    $(".image").html(`<div class="img1 ${rgselect[placeId].img1}"></div><div class="img2 ${rgselect[placeId].img2}"></div>`);
    var pl =DataConvert(rgselect[placeId].weather);
    console.log(pl);
    $('.placeWeather .weatherArt').removeClass().addClass(`weatherArt ${pl}`);
}
//Side-navigation open
function sideNav(){
    $(".sideNav").removeClass("hide");
}
//Side-navigation close
function closeNav(){
    $(".sideNav").addClass("hide");
}
/* Home Scene */
function startHome() {
    gsap.set('.sgWeather', {
        clearProps: "all"
    });
    gsap.from('.sgWeather', {
        y: 100,
        duration: 1
    });
    $('#West,#North,#Central,#northEast,#southEast').on("click", () => {
        $sceneMgr.gotoScene("select", "fade")
    });
    $("#West,#North,#Central,#northEast,#southEast").on("click", pinHandler);

}
function endHome() {
    gsap.killTweensOf(".sgWeather");
    $('#West,#North,#Central,#northEast,#southEast').off("click");
}
$sceneMgr.addScene("#home-scene", 1, "home", {
    startScene: startHome,
    endScene: endHome,
});

/* Select Scene */
function startSelect() {
    $('.backbutton').on("click", () => {
        $sceneMgr.goPrev("fade")
    });
    $("#West,#North,#Central,#northEast,#southEast").on("click", pinHandler);

}
function endSelect() {
    $('.backbutton').off("click");
    $('#West,#North,#Central,#northEast,#southEast').off("click");

}
$sceneMgr.addScene("#select-scene", 2, "select", {
    startScene: startSelect,
    endScene: endSelect,
});
/* Place info scene */
function startSection() {
    gsap.set('.placeInfo', {
        clearProps: "all"
    });
    gsap.from('.placeInfo', {
        y: 100,
        duration: 1
    });

    $('.backbutton').on("click", () => {
        $sceneMgr.goPrev("fade")
    });
    $('#West,#North,#Central,#northEast,#southEast').on("click", () => {
        $sceneMgr.gotoScene("select", "fade")
    });
    $("#West,#North,#Central,#northEast,#southEast").on("click", pinHandler);
}
function endSection() {
    gsap.killTweensOf(".placeInfo");
    $('.backbutton').off("click");
    $('#West,#North,#Central,#northEast,#southEast').off("click");
}
$sceneMgr.addScene("#sect", 3, "section", {
    startScene: startSection,
    endScene: endSection,
});
//Ready function for app
$sceneMgr.ready(function () {
    $sceneMgr.start("home");
    //
    LoadWeatherData();
    $('.hamburger').on("click",sideNav);
    $('.close').on("click", closeNav);
    $('#home').on("click", () => {
        closeNav();
        $sceneMgr.gotoScene("home","fade");
    });
});