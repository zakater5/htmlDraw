
// Config //
var Xoffset = -8;
var Yoffset = -8;
var strokeColor = "cyan";

// Elements //
var platno = document.getElementById('platno');
var redColorB = document.getElementById('buttonRed');
var cyanColorB = document.getElementById('buttonCyan');
var greenColorB = document.getElementById('buttonGreen');
var clearButton = document.getElementById('clearButton');
var textPlacement = document.getElementById('makeText');
var testFunctionB = document.getElementById('testFunction');

platno.ondragstart = function() { return false; };
var risba = platno.getContext('2d');
risba.strokeStyle = "black";

var mouseDown = false;
var canDraw = false;

platno.onmousedown = function(event){
    mouseDown = true;
    drawDot(event.clientX + Xoffset, event.clientY + Yoffset);
}

platno.onmouseup = function(){
    mouseDown = false;
    canDraw = false;
}

///////////////////////////////////////////////////////////////////////////

function insertElements(){
    document.write("<h1>Glavni naslov za primer v js</h1>");
    document.write("<p><b>Bessedilo v odstavku</b></p>");
    document.write("<div style='background-color: lightblue;'>Uporaba div narekovanji</div>");
    document.write("<div style='background-color: lightyellow;'>eh</div>");
    document.write("<ul> <li>postavka 1</li> <li>postavka 2</li> <li>postavka 3</li> </ul>")
    document.write("<a href='http://www.sc-krsko.si/'>" +
                    "<img src='00.jpg' alr='slika></a>");
}
testFunctionB.onclick = function(){
    insertElements();
}

///////////////////////////////////////////////////////////////////////////

var PosX1;
var PosX2;
var PosY1;
var PosY2;

var count = 0;
platno.onmousemove = function(event){
    var posX;
    var posY;
    if(mouseDown && !placingText){
        posX = event.clientX + Xoffset;
        posY = event.clientY + Yoffset;  
        drawDot(posX, posY);

        if(count == 0){
            count++;
            GetStartPoints(event);
        } else {
            count--;
            GetEndPoints(event);
        }       

        if(canDraw){
            drawConnectionLine();
        }  
        canDraw = true;
    } 
    
    if(placingText && !mouseDown){
        textRect.centerX = event.clientX;
        textRect.centerY = event.clientY;
    }     
};

function drawDot(posX, posY){
    risba.beginPath();
    risba.fillStyle = strokeColor;
    centerX = posX;
    centerY = posY;
    radij = document.getElementById("strokeSize").value;
    zacetniKot = 0 * Math.PI / 180;
    koncniKot = 360 * Math.PI / 180;
    risba.arc(centerX, centerY, radij, zacetniKot, koncniKot, false);
    risba.fill();
    risba.closePath();
}

function drawConnectionLine(){
    risba.beginPath();
    risba.strokeStyle = strokeColor; 
    risba.moveTo(PosX1, PosY1); 
    risba.lineTo(PosX2, PosY2); 
    risba.lineWidth = document.getElementById("strokeSize").value * 2;
    risba.stroke();
    risba.closePath();
}

function GetStartPoints(event){
    PosX1 = event.clientX + Xoffset;
    PosY1 = event.clientY + Yoffset;
}

function GetEndPoints(event){
    PosX2 = event.clientX + Xoffset;
    PosY2 = event.clientY + Yoffset;
}

redColorB.onclick = function(){
    strokeColor = "red";
}

cyanColorB.onclick = function(){
    strokeColor = "cyan";
}

greenColorB.onclick = function(){
    strokeColor = "green";
}

clearButton.onclick = function(){
    risba.clearRect(0, 0, platno.width, platno.height);
}

var placingText = false;
var textRect;
textPlacement.onmousedown = function(event){
    if(placingText == false){
        placingText = true;
        risba.setLineDash([6]);
        textRect = risba.strokeRect(event.clientX + Xoffset, event.clientY + Xoffset, 50, 50);
    } else {
        placingText = false;
    }
}

// Key pressed //
document.addEventListener("keypress", function(event){
    var key = event.key;
    if(key == 'z'){
        alert(key);
    }  
});

var controlDown = false;
document.addEventListener("keydown", function(event){
    var key = event.key;
    if(key == 'Control'){
        alert(key);
    }  
});


