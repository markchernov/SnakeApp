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





































/*var player; 

var canvas;


// draw canvas and square

var createCanvas = function() {
    canvas = document.getElementById("area");
    canvas.width = 1000;
    canvas.height = 1000;
    
    player = new Component(20,20,"red",10,10);
    
    player.update();
    
//    var ctx = canvas.getContext("2d");
//    
//    ctx.fillStyle  = player.color;
//    ctx.fillRect(player.x, player.y,player.height, player.width);
    
//    var ctx = canvas.getContext("2d");
//    ctx.fillStyle = "red";
//    ctx.fillRect(10,10,20,20);
    
    this.interval = setInterval(updateGameArea, 20);
    
    
};



//clear board function

var clearCanvas = function() {
  Canvas.context.clearRect(0,0,this.canvas.width, this.canvas.height);
};














//collide function


this.collide = function(obj) {
    // 2
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    // 3
    var otherleft = obj.x;
    var otherright = obj.x + (obj.width);
    var othertop = obj.y;
    var otherbottom = obj.y + (obj.height);
    // 4
    var crash = true;

    // 5
    if ((mybottom < othertop) ||
                (mytop > otherbottom) ||
                (myright < otherleft) ||
                (myleft > otherright)) {
        // 6
        crash = false;
    }
    // 7
    return crash;
}

//update board function


var updateCanvas = function()  {

	// 1
    for (i = 0; i < walls.length; i ++) {
        if (component.collide(walls[i])) {
            // 2
            Board.stop();
            return;
        }   
    }
    // 3
    Canvas.clearCanvas();
    // 4
    component.newPos();
    // 5
    component.update();
};




//component constructor function


function Component(width,height,color,x,y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    this.update = function() {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.width,this.height);
    };

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    };
}; */