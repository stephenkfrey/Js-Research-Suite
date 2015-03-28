/* VISUAL ACUITY TEST
*/

// =========================


var currSubjectNumber = 0; // number followed by a semicolon

global.uploadGoogleBool = false;



$(document).ready(function () {



	// INITIALIZE VALUES

	// Distance
	var distanceValues = [3, 10, 15, 17, 19, 21, 23, 25, 27];

	// TextType

	var sentenceList = ['The biggest problem in communication is the illusion that it has taken place','The age of my daughter is eight', 'The air is quite clear today', 'I want to see that animal over there in that tree', 'He provided an excellent answer to my question', 'I love a good red apple after dinner', 'This area is intended for recreation', 'One of the smallest elements is the atom', 'She put her baby into its crib', 'He hit the ball out of the park', 'The band played until three in the morning', 'The bank closes at four in the afternoon', 'We will go to the bar and get a beer', 'He works at the base on the other side of town', 'If you look up there you can see a bat flying between the trees', 'The bear is a dangerous but playful animal', 'The countryside is splendid in its beauty', 'He rang the bell to signal the end of class', 'Do you know the name of that bird on that branch', 'He picked up the block of wood and began to work on it', 'You will find the coin at the bottom of the lake', 'I put the extra clothes into that box', 'My brother lives in Seattle', 'The capital of Washington state is Olympia', 'She wore that pretty blue dress to the party', 'Lend me an ear and I will tell you a story', 'I would like to reemphasize the importance of our deadlines', 'Viva Las Vegas', 'The chitchatting drove the teacher mad', 'The projects were impressive', 'I am copying the forms for the fifth time', 'The Braves really outplayed the Giants', 'We spent a lot of time unwrapping our presents', 'The builders secured the structure with wires during construction', 'I made the story into a book', 'The club really has them hopping', 'The doctor gave him medicine', 'We should meet at the restaurant', 'That picture was my favorite', 'I was not a big fan of that movie','I updated the paper','That restaurant is really popular','She is so nice','I am pumped my team won','Work smarter not harder','I use that program a lot','We all went camping last weekend','My favorite food is lobster','I am allergic to seafood','Last week my car broke down on the side of the road','It is so sadthat he broke his ankle','Afterwards they walked around the city','My life is a daily struggle with inanimate objects','It looked a lot more promising when I started the move than when I got there','He drives like a crazy person','They are running very late','Maps are useful for navigating','Planning is key to success','He prefers a dual monitor set up','The doctor visit went well','Sunglasses might help you see better during the day'];    
	// var sentenceList = ['The biggest problem in communication is the illusion that it has taken place','The age of my daughter is three', 'The air is quite clear today', 'I want to see that animal over there in that tree', 'He provided an excellent answer to my question', 'I love a good red apple after dinner', 'This area is intended for recreation', 'He put his arm out for inspection', 'One of the smallest elements is the atom', 'She put her baby into its crib', 'He hit the ball out of the park', 'The band played until three in the morning', 'The bank closes at three in the afternoon', 'We will go to the bar and get a beer', 'He works at the base on the other side of town', 'If you look up there you can see a bat flying between the trees', 'The bear is a dangerous but playful animal', 'The countryside is splendid in its beauty', 'He rang the bell to signal the end of class', 'Do you know the name of that bird on that branch', 'He picked up the block of wood and began to work on it', 'You will find the coin at the bottom of the lake', 'I put the extra clothes into that box', 'My brother lives in Seattle', 'The capital of Washington state is Olympia'];    

	var characterList =  ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];	
	var wordList = ['Airforce','Album','Alphabet','Apple','Arm','Bottle','Box','Building','Chief','Desk','Explosive','Fork','Friend','Fruit','Game','Gas','Fly','Happy','Leather','Magic', 'Magnet','Milkshake','Mist','Needle','Onion','Parachute','Pebble','Pendulum','Operation','Record','Restaurant','Rifle','Rocket','Rope','Sad','Saddle','Skeleton','Signature','Spectrum','Software','Sunglasses','Teeth','Thermometer','Tiger','Umbrella','Walk','Water','Wheelchair','Worm', 'Leadership', 'Package', 'Steam', 'Peace', 'Pepper', 'Helicopter', 'White', 'Knight', 'Dream', 'Quarter', 'Purple', 'Egg','Lion','Dragonfly']; 
	
	var numberList = [7046, 56, 785, 1897, 89, 96, 125, 6516, 770, 8476624, 81, 276, 832315, 411955, 289, 3158, 52, 99, 625, 991, 8395, 6188, 88387, 00708, 623867, 490, 570, 763, 794, 2795, 2341, 023, 274, 33664, 29909, 159, 771, 763, 828808, 008, 2402, 79, 081, 776, 678, 601];

	//var passwordList = ['1qaz2wsx','dream.Weaver!','$ilent.m00se','@llo'];

	// Keyboard & Mouse ======
	var currTrialCorrect;

	$(document).on("click", function(e) {
	  	global.currExperiment.saveTrialFn(this);
	});


	// HANDLE KEY PRESSES
	var leftKey = 37;
	var upKey = 38;
	var rightKey = 39;
	var downKey = 40;

	var fKey = 70;
	var gKey = 71;
    var hKey = 72;

    // for reference
    var pKey = 80;
    var lKey = 76;
    var plusKey = 187;
    var minusKey = 189;
    var shiftKey = 16;
    var aKey = 65;
    var sKey = 83;
    var tKey = 84;
    var wKey = 87;
    var qKey = 81;
    var leftBracketKey = 219;
    var rightBracketKey = 221;
    var gKey = 71;
    var hKey = 72;
    var kKey = 75;

	$(document).keyup(function(e) {

      if (e.altKey) {
      	if (e.keyCode == gKey) { 
          currHeadUnit = 'DK1';
          console.log('current head unit = DK1');
          // ("#nextBtn").trigger("click");
          return false;
        }
        if (e.keyCode == hKey) { 
          currHeadUnit = 'HD';
          console.log("current head unit = HD");
          // ("#nextBtn").trigger("click");
          return false;
        }
        if (e.keyCode == aKey) { 
          FontType.currValue = "Arial";
          FontType.updateFn(FontType.currValue);
          console.log('FontType = Arial');
          // ("#nextBtn").trigger("click");
          return false;
        }
        if (e.keyCode == tKey) { 
          FontType.currValue = "TNR";
          FontType.updateFn(FontType.currValue);
          console.log('FontType = TNR');
          // ("#nextBtn").trigger("click");
          return false;
        }
      };


      if (e.keyCode == pKey) { 
        currTrialCorrect = true;
        global.currFactor.saveTrial();
        return false;
      }
      // '-'  = Wrong
      if (e.keyCode == lKey) { 
        currTrialCorrect = false;
        global.currFactor.saveTrial();
        // ("#nextBtn").trigger("click");
        return false;
      }
      if (e.keyCode == kKey) { 
        currTrialCorrect = -1;
        global.currFactor.saveTrial();
        // ("#nextBtn").trigger("click");
        return false;
      }
   

	});


	// Reset Window after loading. 

	Q.display.setPosition(3, 2.5, 0, 0, false);

	// Setup Experiment ======

	var VisualAcuityExp = new Experiment('VisualAcuityMoreData');

	var dataLabels = ['Subject Name','HeadUnit','FontType','Distance','TextType','TrialValue','TrialTime'];
	VisualAcuityExp.initializeData(dataLabels);


	VisualAcuityExp.getTrialDataFn = function(factor) {
		data = {
	        SubjectNumber: currSubjectNumber, 

	        HeadUnit: HeadUnit.currValue,
	        FontType: FontType.currValue,
	        Distance: Distance.currValue,
	        TextType: global.currFactor.myName,
	        TrialValue: factor.currValue,
	        TrialTime: factor.currTrialTimeCount,
	        TrialCorrect: currTrialCorrect, 			//currTrialCorrect, local to here 
	    }
	    return data;
	}

	VisualAcuityExp.saveTrialFn = function(trialCorrect) { // since this is in main it can be either trialCorrect or the factor. 
		document.getElementById("displayInfo").innerHTML = "";
	}

	// = = = = = = = = 
	// FACTOR: HeadUnit

	var HeadUnit = new Factor("HeadUnit"); // name, parent, for top level parent = "Experiment" 
	VisualAcuityExp.addLayerOne(HeadUnit);

					// in other cases, could be functions or vars
	function updateHeadUnit(HeadUnitName) {
		// document.getElementById("headUnitInfo").innerHTML=HeadUnitName;
		console.log('******************** updateHeadUnit: ' + HeadUnitName + ',  complete');
	}	

	HeadUnit.addValues(["HD", "DK1"]);
	HeadUnit.updateFn = updateHeadUnit;			
	HeadUnit.numValuesToRun = 2; // once per HD, once per DK1
	HeadUnit.orderingStyle = "Sequential";

	// = = = = = = = = 
	// FACTOR: FontType
	// Values: Arial, TNR
	// Parent: HeadUnit
	// SubFactors: Distance, TextType

	var FontType = new Factor("FontType"); // by default, parent is the one whose subFactors youve been added to
	HeadUnit.addSubFactor(FontType);

	FontType.addValues(["Arial", "TNR"]);
	FontType.numValuesToRun = 2; // 2x Arial, 2x TNR, etc
	FontType.orderingStyle = "Sequential"; // "Sequential", "Random", "NonRepeatingRandom"

	FontType.updateFn = function (fontName) {
		document.getElementById("displayInfo").style.fontFamily=fontName;
		//console.log('******************** updateWindowFont: '+ fontName);
	}



	// FontType.orderingStyle = "random";
	// FontType.ValueOdering = makeOrder(values, numValuesToRun, "random");
	
	// FACTOR: Distance   ========================


	// ***** Replacign Distance with IMAGES **** 
	// ****************************************************************
	// Example: Factor constructor - declare images + values before creating function. 
	// var imageAddressValues = ["images/1.jpg","images/2.jpg","images/3.jpg","images/4.jpg","images/5.jpg"];

	// function newImageLoader(image) {
	// 	document.getElementById("imageHolder").src = image; // image;
	// }
		// ****************************************************************

	// var Distance = new Factor("Distance", imageAddressValues, newImageLoader); // new constructor

	function moveWindow(distanceVal) {
		Q.display.setPosition(distanceVal, 2.5, 0, 0, false);
		document.getElementById("pageTabTitle").innerHTML = "Visual Acuity Test (" + distanceVal + ")";
		console.log('******************** moveWindow: '+ distanceVal);
	}   


	// function updateDisplayLocation(distance) {
	// 	Q.display.setPosition(distance, 2.5, 0, 0, false);
	// 	console.log('updateDisplayLocation(distance): ' + distance);
	// }

	var Distance = new Factor("Distance", distanceValues, moveWindow);
	FontType.addSubFactor(Distance);
	Distance.numValuesToRun = distanceValues.length; // do 1 round of each distanceValue
	Distance.orderingStyle = "Sequential"; // "Sequential", "Random", "NonRepeatingRandom"



	// FACTOR: TextType   ========================

	TextTypeValues = [sentenceList, characterList, wordList, numberList];

	function newTextTypeFiller() {
		console.log('newTextTypeFiller');
	}

	var TextType = new Factor("TextType", TextTypeValues, newTextTypeFiller);

	Distance.addSubFactor(TextType);

	// putting this function on hold for now. 

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

	var sentences = new Factor("sentences", sentenceList,, updateWindowText);
	var characters = new Factor("characters", characterList, ,updateWindowText);
	var words 	= new Factor("words", wordList, ,updateWindowText);
	var numbers = new Factor("numbers", numberList,, updateWindowText);

	TextType.addSubFactor(sentences);
	TextType.addSubFactor(characters);
	TextType.addSubFactor(words);
	TextType.addSubFactor(numbers);

	TextType.numValuesToRun = 3;

	sentences.numValuesToRun = 1;
	words.numValuesToRun = 1;
	characters.numValuesToRun = 1;
	numbers.numValuesToRun = 1;

	
	//var Moretxt = readTxt('experimentTwo.txt');

	// Ka pow  ========================
	VisualAcuityExp.run();

});

// ** end document ** 


