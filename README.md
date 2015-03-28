# Welcome to the JS Research Suite.

This will help you build experiments and collect data using simple javascript functions. 

The suite is designed to support multifactorial experimental design. 

This code can be used alongside my [Product Design + Research Toolkit] and [Methods to Test User Behavior]. 




# Example Experiment Setup

The three types of factors in our experiment are:

- environment
- avatar
- text

Within the experiment, the subject enters an environment, puts on a new avatar, and reads different texts presented to them on the screen.

Setting up an experiment is simple.

####Set up the Experiment


	// SETUP EXPERIMENT ======

	var ExampleExp = new Experiment('ExampleExp');

	ExampleExp.saveTrialFn = globalSaveTrialFn; // !! Sets Experiment TrialSaveFn to global. 

	// SETUP DATA OUTPUT TO GOOGLE DOCS / CSV 

	var dataLabels = ['Subject Name', 'Environment', 'Avatar', 'Distance', 'textType', 'TrialValue', 'TrialTime'];
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


####Set up the environment
In the example function loadNextEnvironment, we’re simply updating images on the index.html page. Because the update functions are intentionally abstract, you could also use a very complex update function (calling multiple elements from the API, etc). 

- Factor: Environment
- Values: image locations
- Parent: main Experiment
- SubFactors: Avatars

	var Environment = new Factor("Environment"); 
	ExampleExp.addLayerOne(Environment); 
		// name, parent, for top level parent = "Experiment" 

	Environment.addValues(environmentImageLocations);
	Environment.orderingStyle = "Sequential";

	Environment.updateFn = function loadNextEnvironment(imageLoc) {
		document.getElementById("environmentDisplay").src=imageLoc;
	}


####Avatar


	
	var Avatar = new Factor("Avatar", avatarImageLocations, Environment); 

	Avatar.updateFn = function (imageLoc) {
		document.getElementById("avatarDisplay").src= imageLoc;
	}
	
This constructor

- Sets Avatar.myName = "Avatar"
- Sets Avatar.container = Environment, and Environment.subFactor = Avatar
- Sets avatarImageLocations = Avatar.values

By default, orderingStyle = "NonRepeatingRandom" 


####TextType

- Factor: textType  
- Values: words, characters, numbers
- Parent: Avatar
- SubFactors: words, characters, numbers

More options for creating a new Factor: 


#	
	var textTypeList = [characterList, wordList, numberList];
	
	var textType = new Factor("textType"); 
	Avatar.addSubFactor(textType);	
	textType.updateFn = function newTextTypeFiller() { }; 
		// basically a filler for words, characters, numbers to load in the factor below
	
	textType.orderingStyle = "Random"; 		// random, will repeat some values
	
	textType.numValuesToRun = 1; 	
			// will choose 3 of textType's subfactors per round (per Avatar, in this case)


#### Texts
- Factors: characters, words, numbers  
- Values: value lists above
- Parent: textType
- SubFactors: (none)

#

	var characters = new Factor("characters", characterList, textType, updateWindowText);
	var words 	= new Factor("words", wordList, textType, updateWindowText);
	var numbers = new Factor("numbers", numberList, textType, updateWindowText);	

	words.numValuesToRun = 2;
	characters.numValuesToRun = 1;
	numbers.numValuesToRun = 1;


####Run Experiment!
	
	ExampleExp.run();


###Factor - Default Values:

valuesToRun = values.length

orderingStyle = “NonRepeatingRandom”


[Product Design + Research Toolkit]:https://docs.google.com/document/d/1XIJK_cYcnPhXlydfBbOARORfYReq7Ph0fqvzysZYyM4/edit?usp=sharing

[Methods to Test User Behavior]:https://docs.google.com/document/d/1XM0Taf3mmODVuCgIxCk8FiDWvU9tYxiHoIYUUSckwLc/edit?usp=sharing




