window.onload = function() {

	init(); // onload call init methods

};

var init = function() {

	// document.gameForm.submit.addEventListener("click", getOneGameFunction);
	// document.playerForm.submit.addEventListener("click",
	// getOnePlayerFunction);

	var header = document.getElementById("header");

	// header.addEventListener("click", initMenuFunction);

	window.addEventListener("keydown", selectMove);

	createStartButton();
	createMenuButton();
	createHomeButton();

};

// ------------- STATS FUNCTIONS
// -----------------------------------------------------

var getOneGameFunction = function(event) {

	event.preventDefault(); // prevent redirect to another page

	var id = document.gameForm.gameForm.value; // grab id from the text box

	var url = "rest/game/" + id; // path to my controller

	xhrMethod(displayList, url); // call HTTP request passing in callback
	// method and url to

};

var getOnePlayerFunction = function(event) {

	event.preventDefault(); // prevent redirect to another page

	var id = document.playerForm.playerForm.value; // grab id from the text box

	var url = "rest/player/" + id; // path to my controller

	xhrMethod(displayList, url); // call HTTP request passing in callback
	// method and url to

};

var displayList = function(List) {

	var eventsList = List;

	var body = document.getElementById('body');
	var table = document.createElement('table');
	table.setAttribute('id', 'tableList');
	var tbody = document.createElement('tbody');

	var header = document.getElementById("tableDiv");
	header.appendChild(table);

	// document.body.appendChild(table);
	table.appendChild(tbody);
	for (var i = 0; i <= eventsList.length; i++) {
		if (i === 0) {
			var rowOne = document.createElement('tr');
			tbody.appendChild(rowOne);
			var keys = [];
			for ( var k in eventsList[i]) {
				var thead = document.createElement('th');
				rowOne.appendChild(thead);
				thead.innerHTML = k;
				keys.push(k);
			}
		}
		var row = document.createElement('tr');
		tbody.appendChild(row);

		for (var j = 0; j < keys.length; j++) {
			var tdata = document.createElement('td');
			row.appendChild(tdata);
			console.log(eventsList[i][keys[j]]);
			tdata.innerHTML = eventsList[i][keys[j]];
		}

	}

};

var xhrMethod = function(callback, url) {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', url);
	xhr.send();

	xhr.onreadystatechange = function() {
		console.log("IN ONREADY");
		if (xhr.readyState === 3) {
			console.log("State 3");

		}
		if (xhr.readyState === 4) {
			var response = JSON.parse(xhr.responseText);
			console.log(response);
			console.log("my events above this");

			if (response.length > 1) {

				var output = [];

				for (var t = 0; t < response.length; t++) {

					if (response[t].score) {

						var name = response[t].player.name;

						// var player =response[t].player;

						response[t].player = name;

						// response[t].player = new Player(player);

						console.log(name);

						output.push(convertDate(response[t]));

						console.log(output);

					}

					else {

						output.push(response[t]);

					}

				}

				callback(output);
			}

			else {

				var localArray = [];

				if (response.score) { // if response is a Game JSON

					var game = response;

					var player = response.player;

					// response.player = name;

					response.player = new Player(player); // create a new
					// player Object

					response = new Game(game); // create a new game Object

					delete response.id; // delete extra id assigned by Jackson

					delete response.toString; // delete toString property of a
					// new Game object

					console.log(name);

					localArray.push(convertDate(response));

					console.log(localArray);
					console.log("my events above this");

					callback(localArray);
				}

				else {

					localArray.push(response);
					callback(localArray);

				}
			}

		}

	};
};

var convertDate = function(eventParam) {

	console.log("in convertDate method");

	var tempDate1 = eventParam.startdate;

	var tempDate2 = eventParam.enddate;

	var dateObj1 = new Date(tempDate1);
	var dateObj2 = new Date(tempDate2);

	eventParam.startdate = dateObj1;
	eventParam.enddate = dateObj2;

	return eventParam;

};

// constructors for JS objects
function Game(obj) {

	this.gameid = obj.id;
	this.startdate = obj.startdate;
	this.startdate = obj.startdate;
	this.enddate = obj.enddate;
	this.score = obj.score;
	this.player = obj.player;

	this.toString = function() {
		return "Game#" + this.gameid + " " + "Start time: " + this.startdate
				+ " " + "End time: " + this.enddate + " " + "Score: "
				+ this.score + " " + "Player: " + this.player
	};

};

function Player(obj) {

	this.playerid = obj.id;
	this.name = obj.name;

	this.toString = function() {
		return "Player#" + this.playerid + " " + "Name: " + this.name
	};
};

// ----------------------------------- GAME FUNCTIONS
// -----------------------------------

var selectMove = function(e) {

	console.log("In select move ");

	console.log(e.keyCode);

	var snake;

	switch (e.keyCode) {
	case 38:
		console.log("Up ");

		snake = document.getElementById("snake");

		moveSnakeUp(snake);

		break;
	case 40:
		console.log("Down ");

		snake = document.getElementById("snake");

		moveSnakeDown(snake);
		break;

	case 37:
		console.log("Left ");

		snake = document.getElementById("snake");
		moveSnakeLeft(snake);

		break;
	case 39:
		console.log("Right ");

		snake = document.getElementById("snake");
		moveSnakeRight(snake);
		break;
	}

};

var moveSnakeLeft = function(snake) {

	x = x - 50;

	var snakePosition = x + "px";

	snake.style.marginLeft = snakePosition;

	if (x < 0) {

		alert(" Snake lost");

	}

};

var moveSnakeRight = function(snake) {

	x = x + 50;

	var snakePosition = x + "px";

	snake.style.marginLeft = snakePosition;

	if (x > screen.availWidth) {

		alert(" Snake lost");

	}

};

var moveSnakeDown = function(snake) {

	y = y + 50;

	var snakePosition = y + "px";

	snake.style.marginTop = snakePosition;

	if (y > screen.availHeight) {

		alert(" Snake lost");

	}

};

var moveSnakeUp = function(snake) {

	y = y - 50;

	var snakePosition = y + "px";

	snake.style.marginTop = snakePosition;

	if (y < 0) {

		alert(" Snake lost");

	}

};

var x = 0;

var y = 0;

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

	console.log("clicked");
};

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

var goHomeFunction = function() {

	clearFormsFunction();

	clearButtonsFunction();

	clearHomeButton();

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
