// ------------- STATS FUNCTIONS
// -----------------------------------------------------

var getOneGameFunction = function(event) {

	event.preventDefault(); // prevent redirect to another page

	var id = document.gameForm.gameForm.value; // grab id from the text box

	var url = "rest/game/" + id; // path to my controller

	xhrMethod(displayList, url); // call HTTP request passing in callback
	// method and url to

};

var createOneGameFunction = function(event) {

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
	this.enddate = obj.enddate;
	this.score = obj.score;
	this.player = obj.player;

	this.toString = function() {
		return "Game#" + this.gameid + " " + "Start time: " + this.startdate
				+ " " + "End time: " + this.enddate + " " + "Score: "
				+ this.score + " " + "Player: " + this.player
	};

};


var game;
var player;


var createPlayer = function(){
	
	var newPayer = {playerid: 5,name: "John"};

	player = new Player(newPayer);
	
	
};


var createGame = function(){
	
	var newGame = {startdate: new Date(), player: player};

	game = new Game(newGame);
	
	
};



/*var updateGame = function(){
	
	

	game.enddate = new Date();
	game.score = time;
	
	console.log(game);
};*/






function Player(obj) {

	this.playerid = obj.id;
	this.name = obj.name;

	this.toString = function() {
		return "Player#" + this.playerid + " " + "Name: " + this.name
	};
};



var putNewGameFunction = function(event, callback) {

	event.preventDefault();

	console.log(" In create new game")
	
	
	
	game.enddate = new Date();
	game.score = time;
	
	console.log(game);
	

/*	var title = document.createForm.title.value;
	var description = document.createForm.description.value; // grab
	// description
	// from form
	var amount = document.createForm.amount.value;
	var category = document.createForm.category.value;

	var newEvent = {};

	newEvent.title = title;
	newEvent.description = description;
	newEvent.amount = amount;
	newEvent.category = category;

	console.log(newEvent);
*/
	var xhr = new XMLHttpRequest();

	xhr.open("PUT", "rest/newgame");

	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.send(JSON.stringify(game));

	//clearForms();

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4) {

			var eventList = [];

			/* var tempEvent = JSON.parse(xhr.responseText); */

			var tempEvent = JSON.parse(xhr.responseText);

			var convertedEvent = convertDate(tempEvent);

			console.log(convertedEvent);

			/*
			 * var tempDate = tempEvent.eventdate;
			 * 
			 * console.log(tempDate);
			 * 
			 * var dateObj = new Date(tempDate);
			 * 
			 * tempEvent.eventdate = dateObj;
			 * 
			 * console.log(tempEvent.eventdate);
			 */

			eventList.push(convertedEvent);

			displayList(eventList);

		}

	}

};







