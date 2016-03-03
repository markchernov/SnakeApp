// ----------------------------------- GAME FUNCTIONS -------------------------------------------------------------------------------------

window.onload = function() {

	init(); // onload call init methods

};

var init = function() {
	
	window.addEventListener("keydown", selectMove);

	createStartButton();
	createMenuButton();
	createHomeButton();
	
};










// --------------------------------TIMER FUNCTIONS
// --------------------------------------------------------

// ------ STOP FUNCTIONS ----------------------------------

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

var onClickStopFunction = function(e) {

	e.preventDefault();

	console.log("in onClickStopFunction");

	clearButtonsFunction();

	createStartButton();

	createClearButton();

	// clearH1();

	clearInterval(intervalId);
	
	putNewGameFunction(e);   // function in xrm.js

};

// ------ START FUNCTIONS ----------------------------------------------

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

	e.preventDefault();

	clearButtonsFunction(); // clear a start button

	createStopButton();

	startInterval();

	displayInterval();

	// createClearButton();
	
	startGame();
	
	
	createPlayer();
	createGame();
	
	
	
	

	console.log("clicked");
};

var intervalId; 

var startInterval = function() {

	var myButton = document.getElementById("click");

	intervalId = setInterval(displayInterval, 1000);

};

// ------ DISPLAY FUNCTIONS ------------------------------------------

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

	displayInterval();

};

// ------ MENU FUNCTIONS ----------------------------------

var createMenuButton = function() {

	console.log("in create menu button");

	var myMenuButton = document.createElement("button");
	myMenuButton.innerHTML = "Click Me To See Menu";
	myMenuButton.setAttribute("id", "myMenuButton");

	var header = document.getElementById("header");

	header.appendChild(myMenuButton);

	myMenuButton.addEventListener("click", initMenuFunction);

};

var createHomeButton = function() {

	console.log("in create home button");

	var myHomeButton = document.createElement("button");
	myHomeButton.innerHTML = "Click To Go Home";
	myHomeButton.setAttribute("id", "myHomeButton");

	var header = document.getElementById("header");

	header.appendChild(myHomeButton);

	myHomeButton.addEventListener("click", goHomeFunction);

};

var goHomeFunction = function(e) {

	onClickStopFunction(e);

	onClickClearFunction(e);

	removeCountFunction();

	clearFormsFunction();

	clearButtonsFunction();

	clearHomeButton();
	
	// TODO   clearTableFunction();

	init();

};

var initMenuFunction = function() {

	createGetGameForm();

	createGetPlayerForm();

	clearButtonsFunction();
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

};

var clearHomeButton = function() {

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

};







var createGetGameForm = function() {

	console.log("in create get game form");

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
	inputButton.setAttribute("value", "Get Game by ID#");

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
	inputButton.setAttribute("value", "Get Player by ID#");

	var header = document.getElementById("header");
	header.appendChild(playerForm);
	playerForm.appendChild(inputBox);
	playerForm.appendChild(inputButton);

	playerForm.submit.addEventListener("click", getOnePlayerFunction);

};


