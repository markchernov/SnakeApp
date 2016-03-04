// ----------------------------------- GAME FUNCTIONS -------------------------------------------------------------------------------------

window.onload = function(e) {

	init(e); // onload call init methods

};

var init = function(e) {
	
	console.log(e);

	window.addEventListener("keydown", selectMove);
	
	createMenuButton();
	
	//onClickClearFunction(e);
	
	//onClickStopFunction(e);

};

// ------ MENU FUNCTIONS ----------------------------------

// STOP

var createStopButton = function() {

	console.log("in create stop button");

	var myStopButton = document.createElement("button");
	myStopButton.innerHTML = "Click Me To Stop";
	myStopButton.setAttribute("id", "myStopButton");

	var header = document.getElementById("header");
	header.appendChild(myStopButton);
	// document.body.appendChild(myStopButton);

	myStopButton.addEventListener("click", onClickStopFunction);

};

// onclick of a stop button

var onClickStopFunction = function(e) {
	
	
	console.log("in onClickStopFunction");
	
	if(e){

	e.preventDefault();
	
	}

	

	clearInterval(intervalId);
	
	
	console.log(game);

	if(game) {
	
	console.log(game);

	putNewGameFunction(e); // function in xrm.js

	}
	
	console.log("before call myGameArea.stop()");
	
	myGameArea.stop();  // call method from canvas.js to stop the game
	
	/*if (document.getElementById("myStartButton")) {

		var myButton = document.getElementById("myStartButton");

		console.log(myButton);

		myButton.parentNode.removeChild(myButton);

	}*/	
};

// START

var createStartButton = function() {

	console.log("in create start button");

	var myStartButton = document.createElement("button");
	myStartButton.innerHTML = "Click Me To Start";
	myStartButton.setAttribute("id", "myStartButton");

	var header = document.getElementById("header");

	// document.body.appendChild(myStartButton);

	header.appendChild(myStartButton);

	myStartButton.addEventListener("click", onClickStartFunction);

};

// onclick of a start button

var onClickStartFunction = function(e) {
	
	if(e) {

	e.preventDefault();

     }
	
	
	//clearCanvasFunction();
	
	clearTableFunction();
	
	
	/*if(myGameArea) {                // if game area already exist clear it
		
		
	myGameArea.clear();
	
	}*/
	
	/*if(context){
		
	clearCanvasFunction();
		
		
	}*/
	
	startInterval();

	displayInterval();
	
	createGame(); // create temporary game object to update and persist later on
	
	startGame();  // start game from canvas.js

};

// ------ DISPLAY FUNCTIONS ------------------------------------------

// INTERVAL

var intervalId;

var startInterval = function() {

	var myButton = document.getElementById("click");

	intervalId = setInterval(displayInterval, 1000);

};

var displayInterval = function() {

	refreshCountFunction();

	console.log("in display interval");

	var myHeader = document.createElement("h1");
	myHeader.setAttribute("id", "myHeader");

	console.log(myHeader);

	myHeader.innerHTML = "Count:" + time++;

	var myDiv = document.getElementById("myDiv");

	myDiv.appendChild(myHeader);

};

// ------ DISPLAY CURRENT PLAYER ------------------------------------------

var displayCurrentPlayer = function(player) {

	myPlayerId = document.getElementById("currentplayerid")
	myPlayerName = document.getElementById("currentplayername")

	console.log("in display current player");

	myPlayerId.innerHTML = player.playerid;
	myPlayerName.innerHTML = player.name;

	var myHeader = document.getElementById("header");

	myHeader.appendChild(myPlayerId);
	myHeader.appendChild(myPlayerName);

};

// ------ CLEAR FUNCTIONS -------------------------------------------

var time = 0;

var refreshCountFunction = function() {

	console.log("in clear header");

	removeCountFunction();

};

var removeCountFunction = function() {

	console.log("in removeCountFunction");

	if (document.getElementById("myHeader")) {

		var myHeader = document.getElementById("myHeader");

		myHeader.parentNode.removeChild(myHeader);

	}

};

var clearButtonsFunction = function() {

	console.log("in clear button function");

	if (document.getElementById("myStopButton")) {

		var myButton = document.getElementById("myStopButton");

		console.log(myButton);

		myButton.parentNode.removeChild(myButton);

	}

	if (document.getElementById("myStartButton")) {

		var myButton = document.getElementById("myStartButton");

		console.log(myButton);

		myButton.parentNode.removeChild(myButton);

	}

	if (document.getElementById("myClearButton")) {

		var myButton = document.getElementById("myClearButton");

		console.log(myButton);

		myButton.parentNode.removeChild(myButton);

	}

	if (document.getElementById("myHomeButton")) {

		var myButton = document.getElementById("myHomeButton");

		console.log(myButton);

		myButton.parentNode.removeChild(myButton);

	}

	if (document.getElementById("myMenuButton")) {

		var myButton = document.getElementById("myMenuButton");

		console.log(myButton);

		myButton.parentNode.removeChild(myButton);

	}

	
	
	if (document.getElementById("myGamesButton")) {

		var myButton = document.getElementById("myGamesButton");

		console.log(myButton);

		myButton.parentNode.removeChild(myButton);

	}
	
	
};

var createClearButton = function() {

	console.log("in create clear button");

	if (!document.getElementById("myClearButton")) {

		var myClearButton = document.createElement("button");
		myClearButton.innerHTML = "Click Me To Clear";
		myClearButton.setAttribute("id", "myClearButton");

		var header = document.getElementById("header");
		header.appendChild(myClearButton);

		// document.body.appendChild(myClearButton);

		myClearButton.addEventListener("click", onClickClearFunction);

	}
};

var onClickClearFunction = function(e) {

	e.preventDefault();

	console.log("in onClickClearFunction");

	time = 0;
	
	clearTableFunction();

	removeCountFunction();

	displayInterval();
	
	clearCanvasFunction();

};

var createMenuButton = function() {

	var myMenuButton = document.createElement("button");
	myMenuButton.innerHTML = "Click Me To See Menu";
	myMenuButton.setAttribute("id", "myMenuButton");

	var header = document.getElementById("header");

	header.appendChild(myMenuButton);

	myMenuButton.addEventListener("click", initMenuFunction);

};

var createHomeButton = function() {

	var myHomeButton = document.createElement("button");
	myHomeButton.innerHTML = "Click To Go Home";
	myHomeButton.setAttribute("id", "myHomeButton");
	myHomeButton.setAttribute("onclick", "location.href='/SnakeApp/'");

	var header = document.getElementById("header");

	header.appendChild(myHomeButton);

	//myHomeButton.addEventListener("click", goHomeFunction);
	
};

var createSeeAllGamesButton = function() {

	

	var myGamesButton = document.createElement("button");
	myGamesButton.innerHTML = "Click To See Games";
	myGamesButton.setAttribute("id", "myGamesButton");

	var header = document.getElementById("header");

	header.appendChild(myGamesButton);

	myGamesButton.addEventListener("click", getAllGamesFunction);

};

/*var goHomeFunction = function(e) {
	
	e.preventDefault(e);
	
	console.log("in goHomeFunction")

	//onClickStopFunction(e);

	//onClickClearFunction(e);
	
	clearTableFunction();

	removeCountFunction();

	clearFormsFunction();

	clearButtonsFunction();
	
	init();
	

};*/

var initMenuFunction = function() {

	createHomeButton();

	createStartButton();

	createStopButton();

	createClearButton();

	createSeeAllGamesButton();

	createGetGameForm();
	
	createGetGamesByPlayerForm();

	createGetPlayerForm();
	
	
	if (document.getElementById("myMenuButton")) {

		var myButton = document.getElementById("myMenuButton");

		console.log(myButton);

		myButton.parentNode.removeChild(myButton);

	}
};

// FORMS

var createGetGamesByPlayerForm = function() {

	var gameForm = document.createElement("form");

	gameForm.setAttribute("name", "gamesByPlayerForm");
	gameForm.setAttribute("id", "gamesByPlayerForm");
	var inputBox = document.createElement("input");

	inputBox.setAttribute("name", "gamesByPlayerForm");
	inputBox.setAttribute("type", "text");
	inputBox.setAttribute("placeholder", "Type Player ID#");

	var inputButton = document.createElement("input");

	inputButton.setAttribute("name", "submit");
	inputButton.setAttribute("type", "submit");
	inputButton.setAttribute("value", "Games by Player ID#");

	var header = document.getElementById("header");
	header.appendChild(gameForm);
	gameForm.appendChild(inputBox);
	gameForm.appendChild(inputButton);

	gameForm.submit.addEventListener("click", getGamesByPlayerFunction);

};


var createGetGameForm = function() {

	var gameForm = document.createElement("form");

	gameForm.setAttribute("name", "gameForm");
	gameForm.setAttribute("id", "gameForm");
	var inputBox = document.createElement("input");

	inputBox.setAttribute("name", "gameForm");
	inputBox.setAttribute("type", "text");
	inputBox.setAttribute("placeholder", "Type Game ID#");

	var inputButton = document.createElement("input");

	inputButton.setAttribute("name", "submit");
	inputButton.setAttribute("type", "submit");
	inputButton.setAttribute("value", "Display Game by ID#");

	var header = document.getElementById("header");
	header.appendChild(gameForm);
	gameForm.appendChild(inputBox);
	gameForm.appendChild(inputButton);

	gameForm.submit.addEventListener("click", getOneGameFunction);

};














var createGetPlayerForm = function() {

	console.log("in create get player form");

	var playerForm = document.createElement("form");

	playerForm.setAttribute("name", "playerForm");
	playerForm.setAttribute("id", "playerForm");
	var inputBox = document.createElement("input");

	inputBox.setAttribute("name", "playerForm");
	inputBox.setAttribute("type", "text");
	inputBox.setAttribute("placeholder", "Type Player ID#");

	var inputButton = document.createElement("input");

	inputButton.setAttribute("name", "submit");
	inputButton.setAttribute("type", "submit");
	inputButton.setAttribute("value", "Choose Player by ID#");

	var header = document.getElementById("header");
	header.appendChild(playerForm);
	playerForm.appendChild(inputBox);
	playerForm.appendChild(inputButton);

	playerForm.submit.addEventListener("click", getOnePlayerFunction);	
	
};



// clear menu when press the home button

var clearFormsFunction = function() {

	if (document.getElementById("gameForm")) {

		var myForm = document.getElementById("gameForm");

		console.log(myForm);

		myForm.parentNode.removeChild(myForm);

	}

	if (document.getElementById("playerForm")) {

		var myForm = document.getElementById("playerForm");

		console.log(myForm);

		myForm.parentNode.removeChild(myForm);

	}
	
	if (document.getElementById("gamesByPlayerForm")) {

		var myForm = document.getElementById("gamesByPlayerForm");

		console.log(myForm);

		myForm.parentNode.removeChild(myForm);

	}
	
	
};

var clearTableFunction = function() {

	console.log("clearTableFunction");
	
	while (document.getElementById("tableList")) {

		var myList = document.getElementById("tableList");

		console.log(myList);

		myList.parentNode.removeChild(myList);

	}

};


var clearCanvasFunction = function() {

	console.log("clearTableFunction");
	
	if (document.getElementById("area")) {

		var myList = document.getElementById("area");

		console.log(myList);

		myList.parentNode.removeChild(myList);

	}
};

