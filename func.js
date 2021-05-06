
var platno = document.getElementById('platno');
var redColorB = document.getElementById('buttonRed');
var cyanColorB = document.getElementById('buttonCyan');
var greenColorB = document.getElementById('buttonGreen');
var clearButton = document.getElementById('clearButton');
var textPlacement = document.getElementById('makeText');

platno.ondragstart = function() { return false; };
var risba = platno.getContext('2d');
risba.strokeStyle = "black";

var mouseDown = false;
var strokeColor = "cyan";
var canDraw = false;

platno.onmousedown = function(){
    mouseDown = true;
}

platno.onmouseup = function(){
    mouseDown = false;
    canDraw = false;
}

var PosX1;
var PosX2;
var PosY1;
var PosY2;

var count = 0;
platno.onmousemove = function(event){
    var posX;
    var posY;
    if(mouseDown && !placingText){
        posX = event.clientX;
        posY = event.clientY;  

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

        if(count == 0){
            count++;
            GetStartPoints(event);
        } else {
            count--;
            GetEndPoints(event);
        }       

        if(canDraw){
            risba.beginPath();
            risba.strokeStyle = strokeColor; 
            risba.moveTo(PosX1, PosY1); 
            risba.lineTo(PosX2, PosY2); 
            risba.lineWidth = document.getElementById("strokeSize").value * 2;
            risba.stroke();
            risba.closePath();
        }  
        canDraw = true;
    } 
    
    if(placingText && !mouseDown){
        risba.beginPath();
        risba.setLineDash([6]);
        risba.strokeRect(posX, posY, 50, 50);
        risba.closePath();
        if(count == 0){
            count++;
            GetStartPoints(event);
        } else {
            count--;
            GetEndPoints(event);
        }   
    }     
};

function GetStartPoints(event){
    PosX1 = event.clientX;
    PosY1 = event.clientY;
}

function GetEndPoints(event){
    PosX2 = event.clientX;
    PosY2 = event.clientY;
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
    risba.clearRect(0, 0, platno.width, canvas.height);
}

var placingText = false;
textPlacement.onmousedown = function(event){
    if(placingText == false){
        placingText = true;
    } else {
        placingText = false;
    }
}

