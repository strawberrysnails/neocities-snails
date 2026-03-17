/***************************\
*     Let It Snow Effect    *
*(c)2004-13 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
\***************************/
// ==============================
// Side Snow Effect (excluding <main> on small devices)
// ==============================

var speed = 33;          // lower number = faster
var flakes = 100;        // number of flakes
var colour = "rgba(255, 241, 242, 0.34)";
var mainWidth = 1200;    // width of your <main> content
var minWidth = 1400;     // ❄ minimum screen width to enable snow
var flks = [], flkx = [], flky = [], fldy = [];
var swide, shigh;
var snowContainers = [];
var snowActive = false;

function createDiv(height, width, colour){
    var d = document.createElement("div");
    d.style.position = "absolute";
    if(height) d.style.height = (typeof height === "number"? height + "px" : height);
    if(width) d.style.width = (typeof width === "number"? width + "px" : width);
    d.style.overflow = "hidden";
    if(colour) d.style.backgroundColor = colour;
    return d;
}

function addLoadEvent(funky){
    var oldonload = window.onload;
    if(typeof oldonload != "function") window.onload = funky;
    else window.onload = function(){ if(oldonload) oldonload(); funky(); };
}

function set_width(){
    swide = window.innerWidth;
    shigh = window.innerHeight;
}

function baby_its_cold_outside(){
    set_width();

    // Clear any old snow
    snowContainers.forEach(c => c.remove());
    snowContainers = [];
    flks = []; flkx = []; flky = []; fldy = [];

    // Stop if device is too small
    if(swide < minWidth){
        snowActive = false;
        return;
    }

    snowActive = true;

    var sideWidth = Math.max((swide - mainWidth)/2,0);

    ["left","right"].forEach(side=>{
        if(sideWidth <= 0) return;

        var container = document.createElement("div");
        container.style.position = "fixed";
        container.style.top = "0";
        container.style.height = "100%";
        container.style.width = sideWidth + "px";
        container.style.backgroundColor = "transparent";
        container.style.overflow = "visible";
        container.style.zIndex = "0";

        if(side==="left") container.style.left = "0";
        else container.style.right = "0";

        document.body.appendChild(container);
        snowContainers.push(container);

        for(var i=0; i<flakes/2; i++){
            var flake = createDiv(3,3,colour);
            flkx.push(Math.random() * sideWidth);
            flky.push(Math.random() * shigh);
            fldy.push(2 + Math.floor(Math.random()*4));
            flake.style.left = flkx[flkx.length-1] + "px";
            flake.style.top = flky[flky.length-1] + "px";
            container.appendChild(flake);
            flks.push(flake);
        }
    });
}

function let_it_snow(){
    if(!snowActive) return;
    for(var i=0;i<flks.length;i++){
        flky[i]+=fldy[i];
        var container = flks[i].parentNode;
        var width = container.offsetWidth;
        if(flky[i] > shigh){
            flky[i] = 0;
            fldy[i] = 2 + Math.floor(Math.random()*4);
            flkx[i] = Math.random() * width;
        }
        flks[i].style.top = flky[i] + "px";
        flks[i].style.left = flkx[i] + "px";
    }
}

window.onresize = baby_its_cold_outside;
addLoadEvent(baby_its_cold_outside);
setInterval(let_it_snow, speed);
