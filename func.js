// spremenljivke //
var platno = document.getElementById('platno');
var redColorB = document.getElementById('buttonRed');
var cyanColorB = document.getElementById('buttonCyan');
var greenColorB = document.getElementById('buttonGreen');
var clearButton = document.getElementById('clearButton');

platno.ondragstart = function() { return false; };
var risba = platno.getContext('2d');
risba.strokeStyle = "black";

// risanje crte //
risba.moveTo(0, 0); //zacetne kordinate
risba.lineTo(500, 0); //koncne kordinate crte
risba.stroke(); //debelina

var mouseDown = false;
var strokeColor = "cyan";

platno.onmousedown = function(){
    mouseDown = true;
}

platno.onmouseup = function(){
    mouseDown = false;
}

platno.onmousemove = function(event){
    if(mouseDown){
        var posX = event.clientX;
        var posY = event.clientY;

        // risanje kroga //
        risba.beginPath();

        risba.strokeStyle = strokeColor; //barva debeline
        centerX = posX;
        centerY = posY;
        radij = document.getElementById("strokeSize").value;
        zacetniKot = 0 * Math.PI / 180;
        koncniKot = 360 * Math.PI / 180;

        risba.arc(centerX, centerY, radij, zacetniKot, koncniKot, false);
        risba.stroke();
        risba.closePath(); 
    }      
};

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
