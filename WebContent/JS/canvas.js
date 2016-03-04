//------ CANVAS FUNCTIONS -------------------------------------------


// --------Game Objects

var myGamePiece = new component(30, 30, "red", 10, 10);;

var myFood = [];

var myObstacles = [];

var myObstacles2 = [];

var myGameArea = {
		canvas : document.getElementById("area"),
		start : function() {
			this.canvas.width = 800;
			this.canvas.height = 800;
			this.context = this.canvas.getContext("2d");
			this.frameNo = 0;

			this.interval = setInterval(updateGameArea, 20);
		},
		clear : function() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		},

		stop : function() {
			clearInterval(this.interval);
		}

	};



function startGame() {

myGameArea.start();


}



// ---------------------------  Move Controls

var selectMove = function(e) {

	console.log("In select move ");

	console.log(e.keyCode);

	switch (e.keyCode) {
	case 38:
		console.log("Up ");

		myGamePiece.clearSpeed();
		myGamePiece.clearSpeed();
		myGamePiece.speedY -= 30;
		myGamePiece.newPos();

		console.log(myGamePiece);

		break;
	case 40:
		console.log("Down ");

		myGamePiece.clearSpeed();
		myGamePiece.speedY += 30;
		myGamePiece.newPos();
		console.log(myGamePiece);

		break;

	case 37:
		console.log("Left ");

		myGamePiece.clearSpeed();
		myGamePiece.speedX -= 30;
		myGamePiece.newPos();
		console.log(myGamePiece);

		break;
	case 39:
		console.log("Right ");

		myGamePiece.clearSpeed();
		myGamePiece.speedX += 30;
		myGamePiece.newPos();
		console.log(myGamePiece);

		break;
	}

};



function everyinterval(n) {
	if ((myGameArea.frameNo / n) % 1 == 0) {
		return true;
	}
	return false;
}



//---------------------------  Component Constructor


function component(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.color = color;
	this.speedX = 0;
	this.speedY = 0;

	this.x = x;
	this.y = y;

	this.update = function() {
		ctx = myGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	};

	this.clearSpeed = function() {
		this.speedX = 0;
		this.speedY = 0;
	}

	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) || (mytop > otherbottom)
				|| (myright < otherleft) || (myleft > otherright)) {
			crash = false;
		}
		return crash;
	}

};


//---------------------------  Game Logic



function updateGameArea() {

	var x, height, gap, minHeight, maxHeight, minGap, maxGap;
	
	for (i = 0; i < myObstacles.length; i += 1) {
		if (myGamePiece.crashWith(myObstacles[i])) {
			
			

			onClickStopFunction(); // call stop function from xrm to persist
			// the score
			
			//myGameArea.stop();  above function call this one

			

			return;
		}
	}

	for (y = 0; y < myObstacles2.length; y += 1) {
		if (myGamePiece.crashWith(myObstacles2[y])) {

			onClickStopFunction(); // call stop function from xrm to persist
			// the score

			
			
			
			//myGameArea.stop();

			
			return;
		}
	}
	
	for (t = 0; t < myFood.length; t += 1) {
		if (myGamePiece.crashWith(myFood[t])) {

			time = time + 5;
			
			myFood[t].width = 0;
			myFood[t].height = 0;

		}
	}
	
	
	

	myGameArea.clear();
	myGameArea.frameNo += 1;

	if (myGameArea.frameNo == 1 || everyinterval(150)) {
		x = myGameArea.canvas.width;
		minHeight = 20;
		maxHeight = 200;
		height = Math.floor(Math.random() * (maxHeight - minHeight + 1)
				+ minHeight);
		minGap = 50;
		maxGap = 200;
		gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

		myObstacles.push(new component(10, height, "brown", x, 0));
		myObstacles.push(new component(10, x - height - gap, "brown", x, height + gap));

		myObstacles2.push(new component(10, height, "yellow", x, 0));
		myObstacles2.push(new component(10, x - height - gap, "yellow", x, height + gap));
		
		
		myFood.push(new component(20, 20, "green", x, Math.floor(Math.random() * myGameArea.canvas.height)));
		//myFood.push(new component(10, x - height - gap, "green", x, height + gap));		

	}
	
	for (i = 0; i < myObstacles.length; i += 1) {
		myObstacles[i].x += -1;
		myObstacles[i].update();
	}

	for (y = 0; y < myObstacles2.length; y += 1) {
		myObstacles2[y].x += -2;
		myObstacles2[y].update();
	}
	
	for (t = 0; t < myFood.length; t += 1) {
		myFood[t].x += -5;
		myFood[t].update();
	}
	
	myGamePiece.update();
};

