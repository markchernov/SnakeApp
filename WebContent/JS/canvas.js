//------ CANVAS FUNCTIONS -------------------------------------------


// Move Controls


var selectMove = function(e) {

	console.log("In select move ");

	console.log(e.keyCode);

	

	switch (e.keyCode) {
	case 38:
		console.log("Up ");

		
		
		myGamePiece.clearSpeed();
		myGamePiece.clearSpeed();
		myGamePiece.speedY -=30;
		myGamePiece.newPos();
		
        console.log(myGamePiece);
		
		break;
	case 40:
		console.log("Down ");


		
		myGamePiece.clearSpeed();
		myGamePiece.speedY +=30; 
		myGamePiece.newPos();
		console.log(myGamePiece);
		
		break;

	case 37:
		console.log("Left ");


		myGamePiece.clearSpeed();
		myGamePiece.speedX -=30;
		myGamePiece.newPos();
		console.log(myGamePiece);

		break;
	case 39:
		console.log("Right ");

		myGamePiece.clearSpeed();
		myGamePiece.speedX +=30;
		myGamePiece.newPos();
		console.log(myGamePiece);
		
		break;
	}

};



//Game Objects



var myGamePiece;

var myWallLeft;
var myWallRight;
var myWallTop;
var myWallBottom;


function startGame() {
    myGameArea.start();
    
    myGamePiece = new component(30, 30, "red", 10, 10);
    
    
    myWallLeft = new component(10, 200, "green", 300, 120);
    
    myWallRight = new component(30, 400, "yellow", 400, 200);
    
    myWallTop = new component(30, 300, "brown", 500, 100);
    
    myWallBottom = new component(30,500, "blue", 600, 300);
    
}






var myGameArea = {
	    canvas : document.getElementById("area"),
	    start : function() {
	        this.canvas.width = 800;
	        this.canvas.height = 800;
	        this.context = this.canvas.getContext("2d");
	        //document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	        this.interval = setInterval(updateGameArea, 20);
	    },
	    clear : function() {
	        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    }
	};

	function component(width, height, color, x, y) {
	    this.width = width;
	    this.height = height;
	    this.color = color;
	    this.speedX = 0;
	    this.speedY = 0;
	    
	    this.x = x;
	    this.y = y; 
	    
	    this.update = function(){
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
	    
	};

	function updateGameArea() {
	    myGameArea.clear();
	    
	    myGamePiece.update();
	    
	    myWallLeft.update();
	    myWallRight.update();
	    myWallTop.update();
	    myWallBottom.update();
	    
	    myGamePiece.update();
	}


	/*function updateGameArea() {
	    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
	    for (i = 0; i < myObstacles.length; i += 1) {
	        if (myGamePiece.crashWith(myObstacles[i])) {
	            myGameArea.stop();
	            return;
	        } 
	    }
	    myGameArea.clear();
	    myGameArea.frameNo += 1;
	    if (myGameArea.frameNo == 1 || everyinterval(150)) {
	        x = myGameArea.canvas.width;
	        minHeight = 20;
	        maxHeight = 200;
	        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
	        minGap = 50;
	        maxGap = 200;
	        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
	        myObstacles.push(new component(10, height, "green", x, 0));
	        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
	    }
	    for (i = 0; i < myObstacles.length; i += 1) {
	        myObstacles[i].x += -1;
	        myObstacles[i].update();
	    }
	    //myGamePiece.newPos(); 
	    myGamePiece.update();
	}
*/


