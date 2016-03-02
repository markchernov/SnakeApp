onload = function() {

	init(); // onload call init methods

}


var init = function() {
	
	document.textForm.submit.addEventListener("click", getOneGameFunction);	

};




var getOneGameFunction = function(event) {

	event.preventDefault(); // prevent redirect to another page

	var id = document.textForm.gameForm.value; // grab id from the text box

	var url = "rest/game/" + id; // path to my controller

	xhrMethod(displayGameList, url); // call HTTP request passing in callback
	// method and url to

};


var displayGameList = function(eventsList) {

	

	var body = document.getElementsByTagName('body');
	var table = document.createElement('table');
	table.setAttribute('id', 'tableList');
	var tbody = document.createElement('tbody');
	document.body.appendChild(table);
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

					/* response[t] = convertDate(response[t]); */

					output.push(convertDate(response[t]));

					console.log(output);

				}

				console.log("before ");

				console.log(output[0]);

				console.log("after ");

				callback(output);
			}

			else {

				var localArray = [];

				localArray.push(convertDate(response));

				console.log(localArray);
				console.log("my events above this");

				callback(localArray);
			}
		}

	};
};


