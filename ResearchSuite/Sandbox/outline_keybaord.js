

/*


TODO

make multivalueordering
make multi sb factor ordering
make caching system

a getNextValue() function !!!

Need a setup and teardown function for each block. 

	thisblock.setup
	thisblock.teardown
	thisblock.runTrial


// current Trial . saveTrial
// have a global tracker index of the current name of hte trial , name of its parent, a refernece to it.
// then maybe set up the global to point to its struct (?) 
	// >> ask Mike Geary about this. 


// todo: make a trial executor function 


*/

// global wrappergettrial
//$(document).ready(function () {



// Initialize 
// ==================================================



// Global 
// ==================================================

var global = {
	trialIndex: 0,
	currFactor: null, // current layer of the experiment hierarchy
	currTrialStartTime: 0,

	currExperiment: null,

	uploadToGoogleDocs: Q.uploadToGoogleDocs,

	zippyTrialTester: true, 
	uploadGoogleBool: null,

};

function fillerFn() {

}

// Experiment 
// ==================================================
function Experiment(name) {
	this.myName  = name;

	this.layerOne;
	this.nextTrialFn;
	this.csvContent;
	this.getTrialDataFn = fillerFn;

	global.currExperiment = this;
	this.saveTrialFn = fillerFn;

}

var E = Experiment.prototype;


// Hierarchy
E.addLayerOne = function(factor) {
	this.layerOne = factor;
	factor.container = 'Environment'; //this;
}

// Control Flow
E.run = function() { 
	this.layerOne.run();
}

E.finishExperiment = function() {
	console.log('Finished current Experiment');
}

// Data Collection and Uploading
E.initializeData = function (dataLabels) {
	this.csvContent = "data:text/csv;charset=utf-8,\n";
	this.csvContent += dataLabels + "\n";
}


E.recordTrial = function(data) {
	
	console.log("E.recordtrial: " + data);

	for (var param in data) {
		this.csvContent += data[param] + ", ";
	};
	this.csvContent += "\n";
	// console.log(this.csvContent);
}

E.returnCSVraw = function() {
	console.log('csvRaw');
	return this.csvContent;
}


E.uploadToGoogleDocs = function(incomingData) {
	if (!this.myName) {
		console.log("!!! Before uploading an experiment you need to give it a name.");
	}

    console.log( 'before ajax script for uploadToGoogleDocs' );

	$.ajax({
	    type: 'GET',
	    // Production:
	    url: 'https://script.google.com/macros/s/AKfycbzN7CwdUh17W--yNyEuVF6vHL4rQRxEzuxEwlF6jrYiAZqzT-16/exec',
	    // Development:
	    //url: 'https://script.google.com/a/macros/mg.to/s/AKfycbzZWmp-NG-W1ct8S-Q7uBMD0pjPFp1XfNJI3AWQnBPg/dev',
	    
	    // data = incomingData,
	    data: incomingData,
	    
	    dataType: 'jsonp',
	    success: function() {
	        console.log( 'success' );
	    },
	    failure: function() {
	        console.log( 'failure' );
	    }
	});
	console.log( 'after ajax script for uploadToGoogleDocs' );
	console.log("sent to docs");

}

E.printCSV = function() {
    // trim csv content
    var csvContentToPrint = this.csvContent.replace("data:text/csv;charset=utf-8,", ""); // removes CSV download formatting
    csvContentToPrint = csvContentToPrint.slice(1); // removes first '\n' 
    console.log(csvContentToPrint);
}

E.downloadCSV = function () {
    var encodedUri = encodeURI(this.csvContent);
    window.open(encodedUri);
}


// Document Events and Key Presses
// ==================================================


// HANDLE KEY PRESSES
var leftKey = 37;
var upKey = 38;
var rightKey = 39;
var downKey = 40;
var spaceKey = 32;
var enterKey = 13;
var leftBracketKey = 219;
var rightBracketKey = 221;

$(document).on("click", function(e) {
  	global.currExperiment.saveTrialFn(this);
});

$(document).keyup(function(e) {

	// !!!  ----->  nextTrial call < ---  !!! 
	if (e.keyCode == leftKey || e.keyCode == enterKey) { 
		if (global.currFactor) {
			global.currFactor.saveTrial();
			return false;
		}
		console.log('global.currFactor not assigned');	
	}

	// Print or download data
	if (e.keyCode == leftBracketKey) { 
		console.log('printCSV');
		global.currExperiment.printCSV();
	}

	if (e.keyCode == rightBracketKey) { 
		console.log('downloadCSV');
		global.currExperiment.downloadCSV();
	}
});


// rewrite so have global.savetrial



// ==================================================

// Factor Object
// ==================================================
function Factor(inName, inValues, inUpdateFunction, options) {
	console.log("Made new Factor: " + inName);

	// if !options.parent etc

	// Initialize 
	// TODO: have defaults for all these, 
		// ie default ordering style is to have nonrepeating random
	
	// Metadata 
	this.myName;
		// for a string, ie "FontStyle" "HeadUnit" "CircleRadius"
		// only because name, title, and label are reserved
	this.container; // the parent 
	this.experiment = global.currExperiment;

	// Main Elements
	this.values = [];
	this.valueNames = [];
	this.currValue = null;

	this.subFactorIndex = 0;
	this.subFactors;
	this.getNextSubFactorFn;

	this.getTrialDataFn = global.currExperiment.getTrialDataFn;

	this.saveTrialFn;

	// Functions
	this.updateFn;

	this.trialIndex;

	this.valueIndex = 0;
	this.getNextValueFn;

	this.valuesCache = [];

	this.subFactorCache = [];

	// Control Flow
	
	this.numCyclesPerValue = 2;
	this.valueOrdering; // more advanced will call makeOrder function. 
	this.orderingStyle;

	this.subFactorOrdering = [];
	this.subFactorOrderingIndex;

	this.currSubFactor;

	// check if options contain values, if so, add.
	if (inName) 	{	this.myName = inName; 	} // console.log('made factor name: ' + this.myName); // this works 
	if (inValues) 	{	
		this.values = inValues.slice();	// initialize values
		this.currValue = this.values[0]; // default setting
		this.valueNames = inValues.slice(); // default setting
		this.nonCachedValues = inValues.slice(); 
		console.log(" + + + + +(FACTOR) created this.nonCachedValues: "+ this.nonCachedValues);

	}

	if (inUpdateFunction) {	this.updateFn = inUpdateFunction;	}

	if (options) { /* parse options */ } 

	// etc. 
	// add more of these helper additions
}

// Make Getters and Setters for each of these. 

// Make Factor functions
var f = Factor.prototype;

f.initialize = function () {
	// makeOrderings
}

// fontType.ValueOdering = makeOrder(values, numCyclesPerValue, "random");

// if more than one subFactor do multiValueOrdering
f.makeOrder = function(values, numCyclesPerValue, randomize) {
	// make a cache
	// // make a orderArr

	// while e < numCyclesPerValue
	// 	next = getElementNotInCache(values) // if nonrepeat-random.
	// 	orderArr.add(next)

	/* 

	for each value, put it in tuples. value, updateFn. 
		then an "Order" is a list of Factor-Value Pairs
	*/

}

f.addValues = function(inValues) {
	this.values = inValues.slice();	// initialize values
	this.currValue = this.values[0]; // default setting
	this.valueNames = inValues.slice(); // default setting
	this.nonCachedValues = inValues.slice(); 

}

f.getValues = function() {
	return this.values.slice(); // to avoid having multiple pointers
}

/*

// usage: 
// var remainingNonCachedValues = this.makeRemainingNonCachedValues(this.valuesCache, this.values);

f.makeRemainingNonCachedValues = function(cache, total) {
	var diff = [];
	console.log('total array: ' + total);
	total.forEach(function(elem, index) {
		if (!isInArray(elem, cache)) {
			diff.push(elem);
			console.log('diff push elem: ' + elem);
		}
    });
    return diff;
}
*/

f.getNonRepeatingRandomValues = function() {
	// safegaurd so you don't hvae undefined. But you should reset the cache beforehand. 
	if (this.nonCachedValues.length <=1) {
		this.resetCache();
	}
	// 

	var nextValue = getRandomElement(this.nonCachedValues);
	// var nextValue = getRandomElement(this.getNonCachedValues() );
	this.cacheValue(nextValue);
	return nextValue;

}

f.getSequentialValues = function() {
	return this.values[this.valueIndex % this.values.length];
}


f.cacheValue = function(elem) {
	this.valuesCache.push(elem);

	// if nonCachedValues contains element (it should), 
	// then remove the cached element from nonCachedValues
	var index = this.nonCachedValues.indexOf(elem);
	if (index > -1) { 
	    this.nonCachedValues.splice(index, 1);
	}
}


f.resetCache = function() {
	this.valuesCache = [];
	this.nonCachedValues = this.getValues();
}


f.getNextValueFn = function(style) {
	// simple: draw from orderingList
	// complex: more advanced function based on input

	// TODO: add cache here
	//this.cache.push(currValue); 
	// if caching on, push the current value. or do that in the get next value function 
	// while (thisVal in cache),  randomly draw new val. 

	//console.log(this.myName + '.valueOrdering: ' + this.valueOrdering);
	console.log(this.myName + '.valueIndex: ' + this.valueIndex);
	console.log('nonCachedValues: ' + this.nonCachedValues + ',   valuesCache:  ' + this.valuesCache);
	//console.log('remainingNonCachedValues: ' + this.nonCachedValues );

	// NRR
	// var remainingNonCachedValues = this.values.filter(function(x) { 
	// 	return this.valueCache.indexOf(x) < 0 
	// });
	
	var nextValue = false;

	switch(style) {
    case "Sequential":
         nextValue = this.getNonRepeatingRandomValues();
        break;
    case "Random":
        nextValue = getRandomElement(this.values);
        break;
    case "NonRepeatingRandom":
        nextValue = this.getSequentialValues();
        break;
    default:
        return this.getNonRepeatingRandomValues();
	}

	console.log('nextValue: ' + nextValue);

	return nextValue;
	/*
	var nextValue = getRandomElement(this.values);
	while (isInArray(nextValue, this.valueCache) {
			diff = 
	}
	*/
	// return this.defaultGetNextValueFn();

}


f.getNextSubFactorFn = function() {
	// simple: draw from orderingList
	// complex: more advanced function based on input

	console.log(this.myName + '.valueOrdering: ' + this.valueOrdering);
	console.log(this.myName + '.valueIndex: ' + this.valueIndex);

	var nextSubFactor = getRandomElement(this.subFactors);
	//var nextSubFactor = this.subFactors[this.subFactorIndex % this.subFactors.length];

	this.subFactorIndex +=1;
	
	return nextSubFactor;
}

f.printName = function() {
	console.log(this.myName);
}



// The big doozy 
f.run = function() {

	// this will catch and sort subFactors into
	// updating the screen accordingly then 
	// running more subFactors below them *or* starting a trialBlock
	// if they are the lowest unit. 

	console.log('Starting Run Factor: ' + this.myName);
	console.log(this.myName+'.values: ' + this.values);
	console.log('Before while loop in run: ' + this.myName + '.valueIndex: ' + this.valueIndex + ' / ' + this.numCyclesPerValue);

	console.log('++++ in run, this.nonCachedValues: ' + this.nonCachedValues);

	this.currValue = this.getNextValueFn(this.orderingStyle); // 

	console.log(this.myName + '.currValue: ' + this.currValue);
	console.log(this.myName + '.updateFn: ' + this.updateFn);
	
	this.updateFn(this.currValue); // changes font to Arial, etc

	  // for now, assume there is only 1 subFactor. Deal with extra stuff later. 
    // Prepare for picture demo. 

    // Jump to next subFactor, set a counter. 

	 // everything except lowest level trials 
	 // ie Font, Distance
	if (this.subFactors) {
		// Assume only 1 subFactor for nowget

		global.currFactor = this.getNextSubFactorFn(); 
		this.sub;
	    //subFactor.Index = 0; // later will check if this is < cyclesToRun
	    global.currFactor.valueIndex = 0; // this should be referenced somewhere! 
	    global.currFactor.run();
	}
	  // Else is a Trial, launch triggers
	  // ie Distance
	else {
		global.currFactor = this;
		console.log('set global.currFactor: ' + global.currFactor.myName );
	    this.runTrialRound();
	}

}


f.runTrialRound = function() {
	this.trialIndex = 0;
	this.loadTrial();
}


f.loadTrial = function() {
	// take this check out, use for the decision procedure at the end of saveTrial() instead
	console.log(this.myName + ' starting trial Round')
	console.log(this.myName + '.valueIndex: ' + this.valueIndex + ' / ' + this.numCyclesPerValue);

	this.currValue = this.getNextValueFn();

	console.log(this.myName + '.currValue: ' + this.currValue);

	// setup timer to be stopped in saveTrial()
	this.updateFn(this.currValue);
	global.currTrialStartTime = new Date();

	if (global.zippyTrialTester) {
		window.setTimeout(null,10);
		//this.saveTrial();
	}
}

// teardown and save data

f.saveTrial = function() {

	// catch timer from runTrial()
	this.currTrialTimeCount = new Date() - global.currTrialStartTime;
	console.log('trial time = ' + this.currTrialTimeCount);

	global.currExperiment.saveTrialFn(this);

	// save data
	this.saveTrialData();

	if (this.valueIndex < this.numCyclesPerValue) {
		this.valueIndex += 1;
		this.loadTrial();
	} else {
		console.log('finished with Factor ' + this.myName);
		this.jumpToParent();
	}
}


f.saveTrialData = function() {
	
	console.log('saveTrialData');
	//console.log(Q.ping());

	// test to see if can call specific values from main.
	// ie Distance.currValue, in real time. 
	// yes we can
	
	//this.experiment.testData(this);

	// sent in from main, returns specific format JSON object
	this.currTrialData = this.getTrialDataFn(this); // pass in the factor to construct data

	this.experiment.recordTrial(this.currTrialData);

	if (global.uploadGoogleBool) {
		global.uploadToGoogleDocs(this.experiment.myName, this.currTrialData);
	}

	// format it so that you always have to put in the Experiment Name
	// then the rest of the data format is up to you. 
}


f.jumpToParent = function() {

	console.log(this.myName + ' jumped to parent ' + this.container.myName);

	// check am not at the top level
	if (this.container == 'Environment') {
		global.currExperiment.finishExperiment();
	}
	// Main routing function

	/*
	if (this.container.subFactorIndex < this.container.numSubFactorsToRun) {
		this.container.subFactorIndex += 1;
		global.currFactor = this.getNextSubFactorFn();
		global.currFactor.run();

	// Else if this parent still has value cycles left, go to the next one
	} 	*/

	if (this.container.valueIndex < this.container.numCyclesPerValue) {
		this.container.valueIndex += 1; // no increment on run()

		console.log(this.myName + ' running its parent: ' + this.container.myName+ ' valueIndex before run: ' + this.container.valueIndex );

		this.container.run();

	// Else jump up to the parent and see if it has cycles left
	} else {
		this.container.jumpToParent();
	}
};

// old or not in use
/*
function saveTrial() {
	global.currFactor.saveTrialData();

	// this contains ending and catching the timer, then saving data
	// counters
	if (global.currFactor.trialIndex < global.currFactor.numTrialsToDo) {
		global.currFactor.trialIndex += 1;
		global.currFactor.startTrialFn();
	}  else { // jump back up one level. 
		global.currFactor.jumpUpToParent()
	}
}
*/


f.addSubFactor = function(sub) {
	if (!this.subFactors) {
		this.subFactors = [];
	}

	this.subFactors.push(sub);
	sub.container = this;

	console.log(this.myName +' added subFactor ' + sub.myName);
	console.log(sub.container.myName + ' is the container of ' + sub.myName);

}

// Helpers

function getRandomElement(items) {
  return items[Math.floor(Math.random()*items.length)];
}

function isInArray(value,array) {
	return array.indexOf(value) > -1;
}

f.makeMultiValueOrdering = function(mixType) {

}




// somethign with running parent factors isn't working. 


  
//});

// ** end document ** 


/// = = = = = = 

/*

sentence = subType(readtxt(sentences.txt))	 // include numToRun?
word = subType (readtxt(words.txt))
chars = subType (readtxt(chars.txt))

textTypeOptions = new typeOptions(sentence,word,chars)
		// alt: include num to run each option
		textTypeOptions = new typeOptions(sentence,word,chars,)

textType = nextType(textTypeOptions, numIterationsOfSubOptions, TotalNumToRunThisType)

function updateTextType (textValue) {
	// updateWindow(textValue);
}

textType.updateFn = updateTextType;

biggerThing = new Type(textType, otherFactor, Factor)

biggerThing.add()



// = = = = = == = = == = ======

HeadUnit = new Factor()

HD = new FactorVariable()
DK = new FactorVariable()

// need to distinguish between FactorSets - classes or types, ie HeadUnit, FontType, and sepcific
// 	instances of them, ie Arial, HD, TNR, 

// Factor = the name of the condition / the name of the column in the excel file
// ?? 	= 	the values that it can take on. 

// name of FactorSet - this becomes a column in the excel file
// then [params] with its values - essentially its subfactors

HeadUnit = new FactorSet('HeadUnit', [HD, DK]) 
	// these belong together on the same layer. 


// alternate way of declaring a factorSet, using add() instead of new FactorSet (1,2,3)
FontType = new FactorSet()

Arial = new FactorVariable('Arial');
TNR = new FactorVariable('TNR');

// FactorSet.values
FontType.variables = [Arial, TNR];

var distanceArr = [10,20,30,40];

Distance = new FactorVariable(distanceArr);

sentences = new VariableSet(['hello jimmy', 'he went swimming', 'en todo la pasta']);
chars = new VariableSet(['b','e','q','r','t','s']);




FontType.add()

// for each subFactor in this larger factor add these. 


HeadUnit.addSubFactor(textType)



HeadUnit.add(HD, 2)
HeadUnit.add(DK, 1) // number of times to run this block.




// -= =-  
// Final result of the data format. 
// Let's start with how we're formatting our data and move backwards from there. 







/// = = = = = = 

/*

sentence = new Factor([array], , numToRun)

textTypeOptions = new FactorBatch(sentence, word, chars)

textType = new Factor(textTypeOptions, numToRun

inputTypeOptions = new FactorBatch(textType, )

inputType = new Factor(, , defaultNumTimesToRunEachBranch)

(thisClassOptions, subClassType, defaultTimesToRunEachBranch)

*/

/* 

notes

https://github.com/hsharrison/experimentator/blob/master/experimentator/experiment.py
*/







