
/*

RESEARCH SUITE


*/

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
	uploadGoogleBool: null,

	zippyTrialTester: true, 
	
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
	this.startTime = new Date();
	this.layerOne.run();
}

E.finishExperiment = function() {
	console.log('Finished current Experiment');
}

// Upload To Google 
// Refers to script in data.js
// Remains in data.js to be able to call function() {} 
// before the ajax script
E.uploadToGoogleDocs = Q.uploadToGoogleDocs;

// Data Collection and Uploading ---------------------------


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

// CSV printouts  ---------------------------

E.returnCSVraw = function() {
	console.log('csvRaw');
	return this.csvContent;
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


$(document).keyup(function(e) {

	// Print or download data
	if (e.keyCode == leftBracketKey) { 
		console.log('printCSV');
		global.currExperiment.printCSV();
	}

	if (e.keyCode == rightBracketKey) { 
		//console.log('downloadCSV');
		//global.currExperiment.downloadCSV();
	}
});

// ==================================================

// Factor Object Constructor
// ==================================================
function Factor(inName, inValues, inParent,  inUpdateFunction, options) {
	console.log("Made new Factor: " + inName);

	// Metadata -------------------------------------
	this.myName; // a string, ie "FontStyle" "HeadUnit" "CircleRadius"
	this.container; // the parent 
	this.experiment = global.currExperiment;

	// Values -------------------------------------
	// Values - Properties
	this.values = [];
	this.valueNames = [];

	this.numValuesToRun = 2; // once you add values, the default is this.values.length

	// Values - Main Functions
	this.getTrialDataFn = global.currExperiment.getTrialDataFn;

	this.tearDownFn = function() {global.currFactor.moveToNextTrial() };

	// Values - Control Flow
	this.saveTrialFn;
	this.updateFn;

	this.trialIndex;

	this.currValue = null;
	this.valueIndex = 0;
	this.getNextValueFn;

	// Values - Functions

	// Values - Ordering Style
	this.valueOrdering; // more advanced will call makeOrder function. 
	this.orderingStyle;

	this.valuesCache = [];

	// SubFactors -------------------------------------
	// SubFactors - Properties
	this.subFactors;

	// SubFactors - Control Flow
	this.currSubFactor;
	this.subFactorIndex = 0;
	this.getNextSubFactorFn;


	// Subfactors - Functions

	// SubFactors - Ordering Style
	this.orderingStyleSubFactors;

	this.subFactorCache = [];
	this.nonCachedSubFactors = [];

	this.subFactorOrdering = [];
	this.subFactorOrderingIndex;
	

	// Check if 'options' contain values, if so, add and intiialize values. 
	if (inName) 	{	this.myName = inName; 	} // console.log('made factor name: ' + this.myName); // this works 
	if (inValues) 	{	
		this.values = inValues.slice();	// set this.values
		this.numValuesToRun = this.values.length; // default - cycle through every value 1 time

		this.currValue = this.values[0]; // default - set currValue to first value
		this.valueNames = inValues.slice(); // default - valueNames == values
		this.nonCachedValues = inValues.slice();  // start with all values inside nonCached array
		
		console.log("Factor" + this.myName + " created this.nonCachedValues: "+ this.nonCachedValues);
	}

	if (inUpdateFunction) {	this.updateFn = inUpdateFunction; }

	if (inParent) {inParent.addSubFactor(this) }

	if (options) { 
		/* parse options 
		
		for each <parameter, value> in options
			if parameter is apart of the Factor class,
				ie there has been a this.<parameter> declared, 
			assign this.<parameter> to  <value>
		*/
	} 
}


// Factor Constructor
// ==================================================
var f = Factor.prototype;

f.initialize = function () {

	/*
	if (this.subFactors) {
		
		this.nonCachedValues = [];
		for (var i = 0; i < this.subFactors.length; i++ ) {
			this.nonCachedValues.push(this.subFactors[i].myName);
		}
	}
	*/
}

// Initialize values. The values in here should match the ones called 
// in the 	if (inValues) 	{	} from the Factor constructor. 
f.addValues = function(inValues) {
		this.values = inValues.slice();	// set this.values
		this.numValuesToRun = this.values.length; // default - cycle through every value 1 time

		this.currValue = this.values[0]; // default - set currValue to first value
		this.valueNames = inValues.slice(); // default - valueNames == values
		this.nonCachedValues = inValues.slice();  // start with all values inside nonCached array
		
		console.log("Factor" + this.myName + " created this.nonCachedValues: "+ this.nonCachedValues);
}

f.getValues = function() {
	return this.values.slice(); // to avoid having multiple pointers
}


f.addSubFactor = function(sub) {
	if (!this.subFactors) {
		this.subFactors = [];
	}

	this.subFactors.push(sub);
	this.nonCachedSubFactors.push(sub);

	sub.container = this;

	console.log(this.myName +' added subFactor ' + sub.myName);
	console.log(sub.container.myName + ' is the container of ' + sub.myName);

}

// getter function for subFactors, to avoid having multiple pointers to original subFactors[]
f.getSubFactors = function() {
	var copiedSubFactors = cloneObject(this.subFactors); // see cloneObject helper function
	return copiedSubFactors;
}


// Values Ordering Style 
// ====================================================

// 3 Types: Sequential, Random, NonRepeatingRandom
// Default is NonRepeatingRandom

f.getNextValueFn = function(style) {
	// simple: draw from orderingList
	// complex: more advanced function based on input

	console.log(this.myName + '.valueIndex: ' + this.valueIndex);
	console.log(')) nonCachedValues: ' + this.nonCachedValues);
	console.log('))  valuesCache:  ' + this.valuesCache);

	var nextValue = false;

	switch(style) {
    case "Sequential":
         nextValue = this.getSequentialValues();
        break;
    case "Random":
        nextValue = getRandomElement(this.values);
        break;
    case "NonRepeatingRandom":
        nextValue = this.getNonRepeatingRandomValues();
        break;
    default:
        nextValue = this.getNonRepeatingRandomValues();
	}

	console.log('nextValue: ' + nextValue);

	return nextValue;
}

f.getNonRepeatingRandomValues = function() {
	// safegaurd so you don't have undefined. But the cache should be reset beforehand. 
	if (this.nonCachedValues.length <1) {
		this.resetCache();
	}
	
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

	// If nonCachedValues contains the element (it should), 
	// then remove the cached element from nonCachedValues
	var index = this.nonCachedValues.indexOf(elem);
	if (index > -1) { 
	    this.nonCachedValues.splice(index, 1);
	}
}

f.resetCache = function() {
	console.log(')) Cache reset');
	console.log('current valuesCache: ' + this.valuesCache);

	this.valuesCache = [];
	this.nonCachedValues = this.getValues();

}



// SubFactor Ordering Style 
// ====================================================

f.getNextSubFactorFn = function(style) {
	// simple: draw from orderingList
	// complex: more advanced function based on input

	console.log(this.myName + '.subFactorOrdering: ' + this.valueOrdering);
	console.log(this.myName + '.subFactorIndex: ' + this.valueIndex);

	var nextSubFactor = false;
	// var nextSubFactor = this.subFactors[this.subFactorIndex % this.subFactors.length];

	switch(style) {
    case "Sequential":
         nextSubFactor = this.getSequentialSubFactors();
        break;
    case "Random":
        nextSubFactor = getRandomElement(this.subFactors);
        break;
    case "NonRepeatingRandom":
        nextSubFactor = this.getNonRepeatingRandomSubFactors();
        break;
    default:
        nextSubFactor = this.getNonRepeatingRandomSubFactors();
	}

	console.log('next subFactor: ' + nextSubFactor.myName);

	this.subFactorIndex +=1;
	
	return nextSubFactor;
}



f.getNonRepeatingRandomSubFactors = function() {
	// safegaurd so you don't have undefined. But the cache should be reset beforehand. 
	if (this.nonCachedSubFactors.length <1) {
		this.resetCacheSubFactor();
	}
	// var subFactorRandom = getRandomElement(this.subFactors)
	// console.log('nextSubFactor---random: ' + subFactorRandom);

	var nextSubFactor = getRandomElement(this.nonCachedSubFactors);
	console.log('nextSubFactor: ' + nextSubFactor);
	
	this.cacheSubFactor(nextSubFactor);
	return nextSubFactor;
}

f.getSequentialSubFactors = function() {
	return this.subFactors[this.subFactorindex % this.subFactors.length];
}


f.cacheSubFactor = function(elem) {
	this.subFactorCache.push(elem);

	// if nonCachedValues contains the element (it should), 
	// then remove the cached element from nonCachedValues
	console.log('this.nonCachedSubFactors: ' + this.nonCachedSubFactors + ', this subFactors: ' + this.subFactors + ', this.subFactorCache: ' + this.subFactorCache + ' elem: ' + elem);
	//console.log('this.nonCachedSubFactors[0].myName: ' + this.nonCachedSubFactors[0].myName);
	var index = this.nonCachedSubFactors.indexOf(elem);
	if (index > -1) { 
	    this.nonCachedSubFactors.splice(index, 1);
	}
} 


f.resetCacheSubFactor = function() {
	console.log('))))) SubFactor Cache reset');
	console.log('current valuesCache: ' + this.subFactorCache);
	console.log('this.subFactors: ' + this.subFactors);
	this.subFactorCache = [];
	this.nonCachedSubFactors = this.getSubFactors();
}



// Control Flow for Factors
// ====================================================

// run() will catch and sort subFactors into
// updating the screen accordingly, then 
// run more subFactors below them *or* starting a trialBlock
// if they are the lowest unit. 
// "The big kickoff"

f.run = function() {

	console.log('Starting Run Factor: ' + this.myName);
	console.log(this.myName+'.values: ' + this.values);
	console.log('Before while loop in run: ' + this.myName + '.valueIndex: ' + this.valueIndex + ' / ' + this.numValuesToRun);
	console.log('++++ in run, this.nonCachedValues: ' + this.nonCachedValues);


	this.currValue = this.getNextValueFn(this.orderingStyle); // 

	console.log(this.myName + '.currValue: ' + this.currValue);
	console.log(this.myName + '.updateFn: ' + this.updateFn);
	

	if (this.subFactors) {
		this.updateFn(this.currValue); // changes font to Arial, etc

		global.currFactor = this.getNextSubFactorFn(this.orderingStyleSubFactors); 
		this.sub;
	    global.currFactor.valueIndex = 0;
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

// Called if no subFactors. Resets trialIndex to do a certain number of trials. 
// Each trial loads a value from this.values. 
f.runTrialRound = function() {
	this.trialIndex = 0;
	this.loadTrial();
}

// Gets next value, calls updateFn, starts trial Timer
f.loadTrial = function() {
	console.log(this.myName + ' starting trial Round')
	console.log(this.myName + '.valueIndex: ' + this.valueIndex + ' / ' + this.numValuesToRun);

	this.currValue = this.getNextValueFn();

	console.log(this.myName + '.currValue: ' + this.currValue);

	// Setup timer to be stopped in saveTrial()
	this.updateFn(this.currValue);
	global.currTrialStartTime = new Date();

	/*
	if (global.zippyTrialTester) {
		window.setTimeout(null,10);
		//this.saveTrial();
	}
	*/
}

// tTeardown and save data
f.saveTrial = function() {

	// catch timer from runTrial()
	this.currTrialTimeCount = new Date() - global.currTrialStartTime;
	console.log('trial time = ' + this.currTrialTimeCount);

	global.currExperiment.saveTrialFn(this);

	// save data
	this.saveTrialData(); 
	this.tearDownFn(this);
	// this.tearDownFn should ALWAYS call factor.moveToNextTrial. 

}

// By default calls uploadToGoogleDocs, saves to CSV. 
// Also calls special this.getTrialDataFn if there is one other than the default one. 
f.saveTrialData = function() {
	
	console.log('saveTrialData');

	// sent in from main, returns specific format JSON object
	this.currTrialData = this.getTrialDataFn(this); // pass in the factor to construct data
	this.experiment.recordTrial(this.currTrialData);

	if (global.uploadGoogleBool) {
		global.uploadToGoogleDocs(this.experiment.myName, this.currTrialData);
	}
}


// Routed to from this.tearDownFn() ; used for putting pause timer between trials
// If you set a custom <factor>.tearDownFn() in main.js, be sure to call
// <factor>.moveToNextTrial at the end. 
f.moveToNextTrial = function() {

	console.log(" moveToNextTrial ==] ")

	if (this.valueIndex < this.numValuesToRun) {
		this.valueIndex += 1;
		this.loadTrial();
	} else {
		console.log('finished with Factor ' + this.myName);
		this.jumpToParent();
	}
}

// Checks if factor is done with the current round of trials. 
// If so, sends control back up to its container. 
// If not, continues. 
f.jumpToParent = function() {

	console.log(this.myName + ' jumped to parent ' + this.container.myName + '; '+ this.valueIndex + ' / ' + this.numValuesToRun );
	console.log('container index: ' + this.container.valueIndex + ' / ' + this.container.numValuesToRun + '( ' + this.container.myName + ')');

	if (this.container.valueIndex < this.container.numValuesToRun) {
		this.container.valueIndex += 1; // no increment on run()

		console.log(this.myName + ' running its parent: ' + this.container.myName+ '; valueIndex before run: ' + this.container.valueIndex );

		this.container.run();

	// Else jump up to the parent and see if it has cycles left
	} else {
		if (!this.container.jumpToParent) {
			console.log('currFactor has no container.jumpToParent');

			global.currExperiment.finishTime = new Date();
			global.currExperiment.runTime = global.currExperiment.finishTime - global.currExperiment.startTime;
			
			console.log("=> Experiment Total Runtime: " + global.currExperiment.runTime);

			global.currExperiment.finishExperiment();
			return false;
		}

		this.container.jumpToParent();
		
	}
	console.log(this.myName + ' exited jumpToParent without running its container ' + this.container.myName);
};


// Helpers --------------------------------

f.printName = function() {
	console.log(this.myName);
}


function getRandomElement(items) {
  return items[Math.floor(Math.random()*items.length)];
}

function isInArray(value,array) {
	return array.indexOf(value) > -1;
}

f.makeMultiValueOrdering = function(mixType) {

}

// to avoid messing with pointers when cloning a subFactor objects
function cloneObject(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}



/// Defunct for now
// ===================================
// use: fontType.ValueOdering = makeOrder(values, numValuesToRun, "random");

// if more than one subFactor do multiValueOrdering
f.makeOrder = function(values, numValuesToRun, randomize) {
	// make a cache
	// // make a orderArr

	// while e < numValuesToRun
	// 	next = getElementNotInCache(values) // if nonrepeat-random.
	// 	orderArr.add(next)

	/* 

	for each value, put it in tuples. value, updateFn. 
		then an "Order" is a list of Factor-Value Pairs
	*/

}


// ***  end document  ***  
// = = = = = = = = = = = = 



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

  
//});



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







