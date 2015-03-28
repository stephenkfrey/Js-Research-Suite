/* JS Experiment Library Example
*/

// =========================

// Subject dependent values
var currSubjectNumber = 0; // number followed by a semicolon
global.uploadGoogleBool = false;

// =========================


$(document).ready(function () {

	// INITIALIZE VALUES
	var environmentImageLocations = ['images/1.jpg','images/2.jpg','images/3.jpg','images/4.jpg','images/5.jpg'];
	var avatarImageLocations = ['images/a/croc.jpg','images/a/robot.jpg','images/a/face.jpg','images/a/jake.jpg','images/a/dude.jpg'];
	
	var characterList =  ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];	
	var wordList = ['Airforce','Album','Alphabet','Apple','Arm','Bottle','Box','Building','Chief','Desk','Explosive','Fork','Friend','Fruit','Game','Gas','Fly','Happy','Leather','Magic', 'Magnet','Milkshake','Mist','Needle','Onion','Parachute','Pebble','Pendulum','Operation','Record','Restaurant','Rifle','Rocket','Rope','Sad','Saddle','Skeleton','Signature','Spectrum','Software','Sunglasses','Teeth','Thermometer','Tiger','Umbrella','Walk','Water','Wheelchair','Worm', 'Leadership', 'Package', 'Steam', 'Peace', 'Pepper', 'Helicopter', 'White', 'Knight', 'Dream', 'Quarter', 'Purple', 'Egg','Lion','Dragonfly']; 
	var numberList = [7046, 56, 785, 1897, 89, 96, 125, 6516, 770, 8476624, 81, 276, 832315, 411955, 289, 3158, 52, 99, 625, 991, 8395, 6188, 88387, 00708, 623867, 490, 570, 763, 794, 2795, 2341, 023, 274, 33664, 29909, 159, 771, 763, 828808, 008, 2402, 79, 081, 776, 678, 601];


	// HANDLE ADVANCE TO NEXT TRIAL

	// used for data Json creation
	var currTrialCorrect;

 	// Handles the end of one trial stimulus
 	// In this case, the trigger to end a trial is a mouseclick. 

 	$(document).on("click", function(e) {
	  	global.currExperiment.saveTrialFn(this);
	});

	var globalSaveTrialFn = function(trialCorrect) { // since this is in main it can be either trialCorrect or the factor. 
		document.getElementById("displayInfo").innerHTML = ".";
	}

	// Handle the saving of data from one trial and directs program to load the next trial stimulus.

	var pKey = 80;
    var lKey = 76;

	$(document).keyup(function(e) {

		// correct answer
      if (e.keyCode == pKey) { 
        currTrialCorrect = true;
        global.currFactor.saveTrial();
        return false;
      }

      // incorrect answer      
      if (e.keyCode == lKey) { 
        currTrialCorrect = false;
        global.currFactor.saveTrial();
        return false;
      } 

	});

	
	// SETUP EXPERIMENT ======

	var ExampleExp = new Experiment('ExampleExp');

	ExampleExp.saveTrialFn = globalSaveTrialFn; // !! Sets Experiment TrialSaveFn to global. 


	// SETUP DATA OUTPUT TO GOOGLE DOCS / CSV 

	var dataLabels = ['Subject Name','Environment','Avatar','Distance','textType','TrialValue','TrialTime'];
	ExampleExp.initializeData(dataLabels);

	ExampleExp.getTrialDataFn = function(factor) {
		data = {
	        SubjectNumber: currSubjectNumber, 

	        Environment: Environment.currValue,
	        Avatar: Avatar.currValue,
	        textType: global.currFactor.myName,
	        TrialValue: factor.currValue,
	        TrialTime: factor.currTrialTimeCount,
	        TrialCorrect: currTrialCorrect,  
	    }
	    return data;
	}


	// = = = = = = = = 
	// FACTOR: Environment
	// Values: image locations
	// Parent: main Experiment
	// SubFactors: Avatars

	var Environment = new Factor("Environment"); 
	ExampleExp.addLayerOne(Environment); // name, parent, for top level parent = "Experiment" 

	Environment.addValues(environmentImageLocations);
	Environment.orderingStyle = "Sequential";

	Environment.updateFn = function loadNextEnvironment(imageLoc) {
		document.getElementById("environmentDisplay").src=imageLoc;
	}

	// = = = = = = = = 
	// FACTOR: Avatar
	// Values: 
	// Parent: Environment
	// SubFactors: textType

	// using other constructor for factor:
		// Factor(inName, inValues, inParent,  inUpdateFunction, options)

	var Avatar = new Factor("Avatar", avatarImageLocations, Environment); 
	// by default, parent is the one whose subFactors youve been added to
	// Sets Avatar.container = Environment, and Environment.subFactor = Avatar
	// Sets avatarImageLocations = Avatar.values
	// by default, orderingStyle = "NonRepeatingRandom" 
	Avatar.updateFn = function (imageLoc) {
		document.getElementById("avatarDisplay").src= imageLoc;
	}

	// = = = = = = = = 
	// FACTOR: textType  
	// Values: words, characters, numbers
	// Parent: Avatar
	// SubFactors: words, characters, numbers

	var textTypeList = [characterList, wordList, numberList];

	var textType = new Factor("textType"); // more options for declaring a Factor
	Avatar.addSubFactor(textType);
	textType.orderingStyle = "Random"; // random, will repeat some values


	// FACTORS: sentences, words, characters, numbers ========================


	function newTextTypeFiller() {
		console.log('newTextTypeFiller');
	}

	textType.updateFn = function newTextTypeFiller() {	};

	textType.numValuesToRun = 1; // will choose 3 of textType's subfactors per round (per Avatar, in this case)

	// textType subFactors =================


	function updateWindowText (text) {
		document.getElementById("displayInfo").innerHTML = text;
			console.log('**** updateWindowText: '+ text);
	}
	// = = = = = = = = 
	// FACTORS: characters, words, numbers  
	// Values: value lists above
	// Parent: textType
	// SubFactors: (none)

	var characters = new Factor("characters", characterList, textType, updateWindowText);
	var words 	= new Factor("words", wordList, textType, updateWindowText);
	var numbers = new Factor("numbers", numberList, textType, updateWindowText);	

	words.numValuesToRun = 1;
	characters.numValuesToRun = 1;
	numbers.numValuesToRun = 1;

	// Ka pow  ========================
	ExampleExp.run();

});


// ** end document ** 



