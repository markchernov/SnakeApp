// ------------- STATS FUNCTIONS

var getOneGameFunction = function(event) {

	event.preventDefault(); // prevent redirect to another page

	var id = document.gameForm.gameForm.value; // grab id from the text box

	var url = "rest/game/" + id; // path to my controller

	xhrMethod(displayList, url, "GET"); // call HTTP request passing in callback
	// method and url to

};


var getAllGamesFunction = function(event) {

	event.preventDefault(); // prevent redirect to another page

	

	var url = "rest/games" // path to my controller

	xhrMethod(displayList, url, "GET"); // call HTTP request passing in callback
	// method and url to

};


var getOnePlayerFunction = function(event) {

	event.preventDefault(); // prevent redirect to another page

	var id = document.playerForm.playerForm.value; // grab id from the text box

	var url = "rest/player/" + id; // path to my controller

	xhrMethod(displayList, url, "GET"); // call HTTP request passing in callback
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
		
			tdata.innerHTML = eventsList[i][keys[j]];
		}

	}

};

var xhrMethod = function(callback, url, method, object) {
	var xhr = new XMLHttpRequest();

	
	
	xhr.open(method, url);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(object));

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

                    localArray.push(convertDate(response));

					console.log(localArray);
					console.log("my events above this");

					callback(localArray);
				}

				else {

					player = response;    //assign response player object to current player
					
					
					
					displayCurrentPlayer(player);
					
					
					
					console.log(" returned player ");
					console.log(player);
					localArray.push(response);
					//callback(localArray);   //  not calling call back this time cause I don't want to see a table
					
					
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


var createGame = function(){
	
	var newGame = {startdate: new Date()};

	game = new Game(newGame);
	
	
};



function Player(obj) {

	this.playerid = obj.playerid;
	this.name = obj.name;

	this.toString = function() {
		return "Player#" + this.playerid + " " + "Name: " + this.name
	};
};




// create new game

var putNewGameFunction = function(event) {

	event.preventDefault();

	console.log(" In create new game")
		
	game.enddate = new Date();
	game.score = time;
	
	console.log(player);
	
	var localplayerid =  parseInt(document.getElementById("currentplayerid").innerHTML);
	var localplayername = document.getElementById("currentplayername").innerHTML;
	
	
	var localPlayer = {playerid: localplayerid, name: localplayername};
	
	
	
	
	game.player = new Player(localPlayer);
	
	console.log(game);
	
	
	xhrMethod(displayList, "rest/newgame", "PUT", game);
	

};







