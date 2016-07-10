/*
 * Trump Filter - Content Script
 *
 * This is the primary JS file that manages the detection and filtration of Donald Trump from the web page.
 */

// Variables
var regex = /POKE/i;
var search = regex.exec(document.body.innerText);


// Functions
function filterMild() {
	console.log("Filtering Pokemon with Mild filter...");
	return $(":contains('NYFW'), :contains('Pokemon Go'), :contains('Pokemon')").filter("h1,h2,h3,h4,h5,p,span,li");
}

function filterDefault () {
	console.log("Filtering Pokemon with Default filter...");
	return $(":contains('pokemon'), :contains('pokemongo'), :contains('#NYFW'), :contains('pokemon')").filter(":only-child").closest('div');
}

function filterVindictive() {
	console.log("Filtering NYFW with Vindictive filter...");
	return $(":contains('pokemon'), :contains('Pokemon GO'), :contains('#PokemonGo'), :contains('PokemonGO')").filter(":not('body'):not('html')");
}

function getElements(filter) {
   if (filter == "mild") {
	   return filterMild();
   } else if (filter == "vindictive") {
	   return filterVindictive();
   } else {
	   return filterDefault();
   }
}

function filterElements(elements) {
	console.log("Elements to filter: ", elements);
	elements.fadeOut("fast");
}


// Implementation
if (search) {
   console.log("Pokemon found on page! - Searching for elements...");
   chrome.storage.sync.get({
     filter: 'aggro',
   }, function(items) {
	   console.log("Filter setting stored is: " + items.filter);
	   elements = getElements(items.filter);
	   filterElements(elements);
	   chrome.runtime.sendMessage({method: "saveStats", trumps: elements.length}, function(response) {
			  console.log("Logging " + elements.length + " trumps.");
		 });
	 });
  chrome.runtime.sendMessage({}, function(response) {});
}
