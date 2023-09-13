window.onload = document.getElementById("r").innerHTML = localStorage.getItem("record");
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var pepe = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

pepe.src = "pepe.png";
bg.src = "bg.png";
fg.src = "fg.png";
pipeUp.src = "pU.png";
pipeBottom.src = "pB.png";

var speed = 1;
var score = 0;
var gap = 110;
var xPos = 10;
var yPos = 150;
var grav = 1.7;
var num = 33;

document.addEventListener("keydown", moveUp);
function moveUp(){
    grav--;
	yPos -= num;
	grav++;
}

var pipe = [];
pipe[0] = {
	x : cvs.width,
	y : 0
}
function draw(){
	ctx.drawImage(bg,0,0);
	for(var i = 0;i < pipe.length;i++){
	ctx.drawImage(pipeUp,pipe[i].x,pipe[i].y);
	ctx.drawImage(pipeBottom,pipe[i].x,pipe[i].y + pipeUp.height + gap);
	pipe[i].x -= speed;
	
	if(pipe[i].x == 60){
		pipe.push({
			x : cvs.width,
			y : Math.floor(Math.random()*pipeUp.height) - pipeUp.height
		});
	}
	
	if(xPos + pepe.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + pepe.height >= pipe[i].y + pipeUp.height + gap) || yPos + pepe.height >= cvs.height - fg.height) {
	grav = 0;
	speed--;
	num = 0;
	document.getElementById("m").innerHTML = "<br/><br/><br/><button onclick = 'location.reload()'>New Game!</button>";
	if (Number(localStorage.getItem("record")) < score){
	localStorage.setItem("record",String(score));
	document.getElementById("r").innerHTML = localStorage.getItem("record");
	}
 }
	if(pipe[i].x == 5) {
		score++;
 }
	}
	
	ctx.drawImage(fg,0,cvs.height - fg.height);
	ctx.drawImage(pepe,xPos,yPos);
	
	yPos += grav;
	
	ctx.fillStyle = "#000";
	ctx.font = "24px Verdana";
	ctx.fillText("Score: " + score, 10, cvs.height - 20);

	requestAnimationFrame(draw);
}

pipeBottom.onload = draw;