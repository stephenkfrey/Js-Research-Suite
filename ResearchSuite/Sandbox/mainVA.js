
// Main Experiment Functions

// global wrapper
$(document).ready(function () {


	// Keyboard & Mouse ======

	$(document).on("click", function(e) {
	  	//document.getElementById("imageHolder").src = "images/2.jpg";
	});

	// Setup Experiment ======

	var VisualAcuityExp = new Experiment('VisualAcuityMoreData');

	var dataLabels = ['Subject Name','HeadUnit','FontType','Distance','TextType','TrialValue','TrialTime'];
	VisualAcuityExp.initializeData(dataLabels);


	VisualAcuityExp.getTrialDataFn = function(factor) {
		data = {
	        SubjectNumber: '1',
	        HeadUnit: HeadUnit.currValue,
	        FontType: FontType.currValue,
	        Distance: Distance.currValue,
	        TextType: global.currFactor.myName,
	        TrialValue: factor.currValue,
	        TrialTime: factor.currTrialTimeCount,
	        TrialCorrect: '', 			//currTrialCorrect,
	    }
	    return data;
	}

	// = = = = = = = = 
	// FACTOR: HeadUnit

	var HeadUnit = new Factor("HeadUnit"); // name, parent, for top level parent = "Experiment" 
	VisualAcuityExp.addLayerOne(HeadUnit);

					// in other cases, could be functions or vars
	function updateHeadUnit(HeadUnitName) {
		document.getElementById("headUnitInfo").innerHTML=HeadUnitName;
		console.log('*** updateHeadUnit: ' + HeadUnitName + ',  complete');
	}	

	HeadUnit.addValues(["HD", "DK1"]);
	HeadUnit.updateFn = updateHeadUnit;			
	HeadUnit.numCyclesPerValue = 3; // once per HD, once per DK1

	// = = = = = = = = 
	// FACTOR: FontType
	// Values: Arial, TNR
	// Parent: HeadUnit
	// SubFactors: Distance, textSrc

	var FontType = new Factor("FontType"); // by default, parent is the one whose subFactors youve been added to
	HeadUnit.addSubFactor(FontType);

	FontType.addValues(["Arial", "TNR"]);
	FontType.numCyclesPerValue = 3; // 2x Arial, 2x TNR, etc

	FontType.updateFn = function (fontName) {
		document.getElementById("displayInfo").style.fontFamily=fontName;
		console.log('**** updateWindowFont: '+ fontName);
	}

	// FontType.orderingStyle = "random";
	// FontType.ValueOdering = makeOrder(values, numCyclesPerValue, "random");
	
	// FACTOR: Distance   ========================

	// Example: Factor constructor - declare images + values before creating function. 
	var imageAddressValues = ["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg","images/6.jpg"]

	function newImageLoader(image) {
		document.getElementById("imageHolder").src = "images/3.jpg"; // image;
	}

	var Distance = new Factor("Distance", imageAddressValues, newImageLoader); // new constructor
	FontType.addSubFactor(Distance);

	Distance.numCyclesPerValue = 3;


	// ***** Replacign Distance with IMAGES **** 
	// ****************************************************************
	/*   var distanceValues = [10,20,30,40];

	function moveWindow(distanceVal) {
		document.getElementById("distanceInfo").innerHTML = distanceVal;
		console.log('**** moveWindow: '+ distanceVal);
	}    */
	// var Distance = new Factor("Distance", distanceValues, moveWindow);
	// ****************************************************************


	// FACTOR: textSrc   ========================

	var sentenceList = ['The air is quite clear today', 'Im not sure of the name of that animal over there in that cage', 'He provided an excellent answer to my question', 'I love a good red apple after dinner'];
	var characterList = ['a','b','c','d','e','f','g','h','i','j','k'];
	var wordList = ['Airforce','Album','Alphabet','Apple','Arm','Bottle','Box'];
	var numberList = [1,2,3,5,8,10,13, 7046, 56, 785, 1897, 89, 96, 125, 6516, 5666];

	textSrcValues = [sentenceList, characterList, wordList, numberList];

	function newTextSrcFiller() {
		console.log('newTextSrcFiller');
	}

	var textSrc = new Factor("TextType", textSrcValues, newTextSrcFiller);

	Distance.addSubFactor(textSrc);

	Distance.subFactorOrdering = FontType.makeMultiValueOrdering("mixed"); 
	// could be mixed or sequential
	// mixed means it mixes distance and textsource
	// sequential does it does distance then textsource within each conditon of distance.
	// returns a tuple
	// runs each tuple's update function.  
	// Also: ZigZag

	function updateWindowText (text) {
		document.getElementById("displayInfo").innerHTML = text;
		console.log('**** updateWindowText: '+ text);

	}

	// FACTORS: sentences, words, characters, numbers ========================

	var sentences = new Factor("sentences", sentenceList, updateWindowText);
	var characters = new Factor("characters", characterList, updateWindowText);
	var words 	= new Factor("words", wordList, updateWindowText);
	var numbers = new Factor("numbers", numberList, updateWindowText);

	textSrc.addSubFactor(sentences);
	textSrc.addSubFactor(characters);
	textSrc.addSubFactor(words);
	textSrc.addSubFactor(numbers);

	textSrc.numCyclesPerValue = 3;

	// Ka pow  ========================
	VisualAcuityExp.run();

});

// ** end document ** 


