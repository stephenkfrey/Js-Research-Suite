
/* main.js

This controls the general document interactivity and famo.us functions. 

Contains:
- Setup for famous engine + mainContext
- jQuery calls from html bootstrap elements to famoUS elements. 
- 

*/

/*

TODO

- setup reseacherConsole so it downloads data from research.js

*/


/* 
Features of this version:

- combined with vaoriginal to control window positioning. 

- uses the updateDisplayLocation(distance) from vaoriginal, to call the function
      Q.display.setPosition(distance, 2.5, 1, 0, false);
    to update position of the window. 


- uses the updateTextDisplayValue(text) to update text 

= = = == = === = = = =
Basically, uses these functions from vaoriginal: 

function updateDisplayLocation(distance) {
  updateDistanceDisplayValue(distance);
  Q.display.setPosition(distance, 2.5, 1, 0, false);
}

function updateDistanceDisplayValue(text) {
  document.getElementById("headInfo").innerHTML = text;
}

function updateTextDisplayValue(text) {
  document.getElementById("displayInfo").innerHTML = text;
}


*/ 



    $(document).on("click", function(e) {
        global.index.loadTrial();
        words.loadTrial();
    });




window.onload = function() { 


    // >>> INITIALIZE SPECIFIC VALUES FOR WINDOW TEST    

    // values for reading tasks
    var wordList = ['Airforce','Album','Alphabet','Apple','Arm','Bottle','Box','Chief','Desk','Explosive','Fork','Fruit','Game','Gas','Leather','Magnet','Milkshake','Mist','Needle','Onion','Parachute','Pebble','Pendulum','Record','Restaurant','Rifle','Rocket','Rope','Saddle','Skeleton','Signature','Spectrum','Software','Sunglasses','Teeth','Thermometer','Tiger','Umbrella','Water','Wheelchair','Worm'];
    var characterList = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var numberList = [1,2,3,4,5,6,7,8,9, 10, 7046, 56, 785, 1897, 89, 96, 125, 6516, 5666, 8476624, 81, 276, 832315, 411955, 289, 3158, 52, 99, 625, 991, 8395, 6188, 88387, 00708, 623867, 490, 570, 763, 794, 2795, 2341, 023, 274, 33664, 29909, 159, 771, 763, 828808, 008, 2402, 79, 081, 776, 8348, 11905, 11757, 270, 467, 090, 15541, 944, 152, 707, 472,66626, 20476, 20476, 97182, 38844, 53750, 33039, 59881, 17093, 18805, 998, 30351, 93459, 404, 286, 682, 556, 697, 171, 993, 335, 7255, 7535, 6314, 580, 1359, 5637, 1479, 3309, 4876, 9572, 2442, 1744, 8834, 4554, 9141, 6659, 2601, 3026, 1081, 3476, 2521, 369, 7127, 5383, 1383, 1651, 8714, 4577, 7858, 5628, 6454, 7282, 7610, 5433, 640, 3050, 9923, 3273, 5164, 6611, 4223, 6163, 487, 492, 853, 220, 392, 70, 458, 917, 385, 931, 367, 380, 971, 217, 250, 504, 33, 357, 44, 133, 132, 983, 363, 846, 196, 803, 384, 896, 202, 12, 411, 893, 338, 829, 94, 808, 805, 715, 807, 439];
    var sentenceList = ['The biggest problem in communication is the illusion that it has taken place','That Club Mate really has them hoppin','Once the pandas unwrapped their corduroy linens the knitting match began', 'The age of my daughter is three', 'The air is quite clear today', 'Im not sure of the name of that animal over there in that cage', 'He provided an excellent answer to my question', 'I love a good red apple after dinner', 'This area is intended for recreation', 'He put his arm out for inspection', 'It would be difficult to live without art', 'One of the smallest elements is the atom', 'She put her baby into its crib', 'I turned my back on that outrageous man', 'He hit the ball out of the park', 'The band played until three in the morning', 'The bank closes at three in the afternoon', 'Lets go to the bar and get a beer', 'He works at the base on the otherside of town', 'If you look up there you can see a bat flying between the trees', 'The bear is a dangerous but playful animal', 'The countryside is splendid in its beauty', 'He rang the bell to signal the end of class'];

     // old short version
    //var sentenceList = ['The biggest problem in communication is the illusion that it has taken place.','That Club Mate really has them hoppin','Once the pandas unwrapped their corduroy linens the knitting match began.'];

    var experimentName = 'Windows Test';
    var subjectName = '1';
    var currHeadUnit = 'DK1';

    var windowConditions = [3,5,7,8,10,15];
    var windowConditionNames = windowConditions;

    var windowTasks = [characterList, numberList, wordList, sentenceList];
    var windowTaskNames = ['characters','numbers','words','sentences'];

    var startWindowDistance = 8;

    var conditionNumTasksToDo = 2;
    var conditionNumTrialsToDo = 1;
    
    // Unused for now
    var windowTasksToDo = [characterList, numberList, characterList, wordList, sentenceList ];
    var windowTaskCount = [2,1,1,1]; // UPDATE number of times in windowTasksToDo that each task in windowTasks is called - 
    var windowTaskTrialCount = [3,3,3,3,3];     // UPDATE number of trials to do for each task in windowTasksToDo

    // ===============================================================================


	  // HANDLE KEY PRESSES
	  var leftKey = 37;
	  var upKey = 38;
	  var rightKey = 39;
	  var downKey = 40;
	  var spaceKey = 32;
	  var enterKey = 13;
    var lilRightKey = 190;
    var lilLeftKey = 188;
    var pKey = 80;
    var lKey = 76;
    var plusKey = 187;
    var minusKey = 189;
    var shiftKey = 16;
    var aKey = 65;
    var sKey = 83;
    var wKey = 87;
    var qKey = 81;
    var leftBracketKey = 219;
    var rightBracketKey = 221;
    var gKey = 71;
    var hKey = 72;

    var currFontType = "Arial";

    $(document).on("click", function(e) {
      getTrialCorrect()
    });


   $(document).keyup(function(e) {

      // '>' or space = manual advance to next Trial
      if (e.keyCode == lilRightKey || e.keyCode == shiftKey) { 
        getTrialCorrect();
        return false;
      }
      // '+'  = Correct
      if (e.keyCode == pKey) { 
        currTrialCorrect = true;
        saveTrial(currTrialCorrect);
        return false;
      }
      // '-'  = Wrong
      if (e.keyCode == lKey) { 
        currTrialCorrect = false;
        saveTrial(currTrialCorrect);
        // ("#nextBtn").trigger("click");
        return false;
      }


      if (e.altKey) {
        if (e.keyCode == gKey) { 
          currHeadUnit = 'HD';
          console.log("current head unit = HD");
          // ("#nextBtn").trigger("click");
          return false;
        }
        if (e.keyCode == hKey) { 
          currHeadUnit = 'DK1';
          console.log('current head unit = DK1');
          // ("#nextBtn").trigger("click");
          return false;
        }
      };

      if (e.keyCode == leftBracketKey) { 
        console.log('printCSV');
        printCSV();
      }

      if (e.keyCode == rightBracketKey) { 
        console.log('downloadCSV');
        downloadCSV();
      }

      // FONT CHANGES
      if (e.keyCode == aKey) { 
        // document.getElementById("test").style.fontFamily="Arial";
        // document.getElementById("headInfo").style.fontFamily="Arial";
        document.getElementById("displayInfo").style.fontFamily="Arial";
        //document.getElementById("displayInfo").innerHtml = 'changed font to Arial!';
        console.log('font change -> Arial');

        currFontType = "Arial";
        
        return false;
      }
      if (e.keyCode == sKey) { 
        // document.getElementById("test").style.fontFamily="Times New Roman";
        // document.getElementById("headInfo").style.fontFamily="Times New Roman";
        document.getElementById("displayInfo").style.fontFamily="Times New Roman";
        console.log('font change -> Times New Roman');

        currFontType = "TNR";
        
        return false;
      }


      // else {
      //   console.log('keyCode = ' + e.keyCode);
      // }
    
    });

   // Setup
   console.log('= = = Setup = = =');

   // Make sure Q libraries are here from research.js
   console.log(Q.research.ping());

    var printCSV = function() {
        csvContent = Q.research.returnCSVraw();
        Q.research.printCSV(csvContent);
        console.log(localStorage["csvContent"]);
    };

    var downloadCSV = function() {
        //csvContent = Q.research.returnCSVraw();
        csvContent = localStorage["csvContent"];
        Q.research.downloadCSV(csvContent);
    };

  // INTERACTION FOR RESEARCH LOOP 
  // ===============================================================================


    // setup 
    var trialCache = []; 
    var condition; 
    var nextTask;
    var nextTrial;

    var currTrialTime = 0;
    var trialTimeData = [];
    var trialTotalIndex = 0;

    var currTrialCorrect = true;

    // >> INITIALIZE EXPERIMENT OBJECT << 

    function Experiment(experimentName, subjectName, inputConditions, inputTasks, inputTaskNames, inputTasksToDo, inputTaskTrialCount) {
        console.log('made new Experiment');

        this.myname = experimentName;
        this.subject = subjectName;

        this.conditions = inputConditions;

        this.numConditionsToDo = this.conditions.length; // *2

        this.tasks = inputTasks;
        this.taskNames = inputTaskNames;
        this.numTasks = inputTasks.length;

        // index values for Main Loop
        this.conditionIndex = 0; // current Condition number
        this.taskIndex = 0; // current task it is on
        this.trialIndex= 0; // current trial

    };

    var e = Experiment.prototype;

    e.loadWindow = function() {
        updateTextDisplayValue('Start');
        //updateDisplayLocation(startWindowDistance); // 5
        console.log('startWindowDistance '+ startWindowDistance);
    };

    // >> INITIALIZE CONDITION OBJECT << 

    var Condition = function(experiment, conditionIndex, inputTaskTrialCount) {    
        this.condition = experiment.conditions[conditionIndex]; // ie 10, 20, 30
        // within each condition, do 5 different task/trials. ie at 10 feet, do 5 rounds of char, word, etc. 
        this.numTasksToDo = conditionNumTasksToDo; // hardcoded for window test 
        // for now, just 1 of each  kind of trial - 1 char, 1 word, etc, randomly. ie dont repeat a char twice
        this.numTrialsToDo = conditionNumTrialsToDo; 

        // inputTasksToDo = a potentially longer version of inputTaskNames in the total order you want to do the tasks. 
      };



    var p = Condition.prototype;

    p.getNextTask = function(taskIndex) {
      var nextTask = getRandomTask(exp.tasks);
      console.log('p.getnextask: ' + nextTask);
      return nextTask;

      //
      // taskIndex = the  index of the current task, out of the total number of tasks to complete in the condition.
      //    Use this to go through the condition's tasks in a particular order. 
      // numTrials = the number of times to perform this task. 
      //    Eventually may implement this so you can have individual tasks run a unique number of trials
    };

    p.getNextTrial = function(nextTask, trialNum) {

      var nextTrial = getRandomElement(nextTask); 
      return nextTrial;

      //
      // in the visual-acuity, window case next trial is just a string or number. 
      // alt:
      // return nextTask[trialNum];
    }

    // updateWindowPosition - calls the Q.js library to move browser window in Qualia Unity environment
    p.updateWindowPosition = function(conditionIndex) {

      // sequential: 
      distanceVal = exp.conditions[conditionIndex % exp.conditions.length];
      // random:
      // distanceVal = getRandomElement(exp.conditions);
      console.log('updateWindowPosition, distanceVal: ' + distanceVal);
      updateDisplayLocation(distanceVal);  // Q.js function, loaded from vaoriginal.js
      
      // alt: 
      // distanceVal = 1 + exp.conditions[conditionIndex % exp.conditions.length] // arbitrary test numbers
      // display.setScale(transformValue, transformValue, false);
    }

    function updateWindowValue(value) {
        updateTextDisplayValue(value);
    }


    // EVENT HANDLING

    // nextTrialBtn makes sure that an experiment is currently running when "next" button pressed (">")
    function nextTrialBtn() {
      console.log('nexttrialBtn, exp.trialIndex: ' + exp.trialIndex);
      if(exp.trialIndex == undefined) {
        return false; 
      } else {
        saveTrial(exp.trialIndex); // saveTrial = regular function for saving current trial and advancing to next one
      }

    };

    // DATA COLLECTION

    // for now, we can just log each trial 
    var currCondition;
    var currTask;
    var currTrial;

  
    // HELPER FUNCTIONS

    function getRandomTask(items) {
      var randomindex = Math.floor(Math.random()*items.length);
      currTask = exp.taskNames[randomindex];
      return items[randomindex];
    }

    function getRandomElement(items) {
      return items[Math.floor(Math.random()*items.length)];
    }

    function isInArray(item, array) {
      return jQuery.inArray( item, array ) > -1;
    }

    function updateTextDisplayValue(text) {
      console.log("temp fix for updateTextDisplayValue: " + text);
    };

    function updateDisplayLocation(distance) {
      //updateDistanceDisplayValue(distance);
     // Q.display.setPosition(distance, 2.5, 1, 0, false);
    }
    
    function updateTextDisplayValue(text) {
      //document.getElementById("displayInfo").innerHTML = text;
    }

    var distanceVal = document.getElementById("displayInfo").value;



    // > RUN MAIN EXPERIMENT
    // ===============================================================================

    // MAIN LOOP 

    // MAIN LOOP FUNCTIONS
    var exp = new Experiment(experimentName, subjectName, windowConditions, windowTasks, windowTaskNames, windowTasksToDo, windowTaskTrialCount);

    dataLabels = ['SubjectName, HeadUnit, FontType, Distance, Task, TrialValue, TrialTime, TrialCorrect'];
    Q.research.initializeData(dataLabels);

    console.log('= = = run Experiment = = =');

    runExperiment();

    function preExperimentIntro() {
      updateWindowValue("(Welcome to the Visual Acuity Test.)");
    };

    
    function runExperiment() {
      exp.loadWindow();
      exp.conditionIndex = 0;

      preExperimentIntro();

      runCondition(exp.conditionIndex);
    };

    
    function runCondition(conditionIndex) {
      condition = new Condition (exp, conditionIndex, windowTaskTrialCount);
      condition.updateWindowPosition(conditionIndex); // 10, 20, 30, 40, etc
      
      console.log('conditionIndex: ' + conditionIndex + ' / ' + exp.numConditionsToDo);

      exp.taskIndex = 0; // start a new round of tasks
      runTask(exp.taskIndex);

    };
    
    function runTask(taskIndex) {
        nextTask = condition.getNextTask(taskIndex);
        console.log('nextTask: ' + exp.taskIndex + ' / ' + condition.numTasksToDo);

        exp.trialIndex = 0;
        runTrial(exp.trialIndex);

    };

    
    function runTrial(trialIndex) {
      var trialCounterConsolePrint = ('= = nextTrial: ' +exp.trialIndex+' / '+condition.numTrialsToDo);
      var taskCounterConsolePrint = (',  taskIndex: '+exp.taskIndex +' / '+condition.numTrialsToDo +',  conditionIndex: '+ exp.conditionIndex +' / '+ exp.numConditionsToDo +' = =');
      console.log(trialCounterConsolePrint +taskCounterConsolePrint );

      nextTrial = condition.getNextTrial(nextTask, trialIndex);

      trialCache.push(nextTrial); // eventually will implement check / refind if repeat trials

      // setup timer to be stopped in saveTrial()
      updateWindowValue(nextTrial);
      currTrialStartTime = new Date();
    };

    function getTrialCorrect() {
      updateWindowValue(" ");      
    }

    // wait for next-button press to proceed to savetrial()

    function saveTrial(currTrialCorrect) {
      console.log('saveTrial');
      
      // catch timer from runTrial()
      var currTrialTimeCount = new Date() - currTrialStartTime;
      trialTimeData[trialTotalIndex] = currTrialTimeCount;
      trialTotalIndex++;
      console.log('trial time = ' + currTrialTimeCount);

      // create data jSON object

      // conditionName, taskName, trialNumber, trialValue, data

      data = {
        Experiment: 'VisualAcuityMoreData',
        SubjectName: subjectName,
        HeadUnit: currHeadUnit,
        FontType: currFontType,
        Distance: exp.conditions[exp.conditionIndex],
        Task: currTask,
        TrialValue: nextTrial,
        TrialTime: currTrialTimeCount,
        TrialCorrect: currTrialCorrect,
        
      }

      // save trial JSON data to master data file
      Q.research.recordTrial(data);
      // exp.conditions = list of condition values, ie 10, 20, 30
      // exp.conditionIndex = current index of condition, used in MAIN LOOP
      // currTask defined in getRandomTask()
      // exp.trialIndex - updated each trial
      // nextTrial = value of current trial - ie 'a', 'horse', 9, 'a long sentence',
      // data - defined above, currently is trialTime + trialCorrect

      Q.research.uploadToGoogle(data);

      // determine if go to next trial, task, or condition
      if (exp.trialIndex < condition.numTrialsToDo) { 
        // still within task
        // run next Trial , index +1
        console.log('condition.numTrialsToDo: ' + condition.numTrialsToDo);
        exp.trialIndex += 1;
        runTrial(exp.trialIndex);

      } else { // update tasks
        if (exp.taskIndex < condition.numTasksToDo) {
          exp.taskIndex += 1;
          runTask(exp.taskIndex);
          
        } else { // update conditions
          if (exp.conditionIndex < exp.numConditionsToDo-1) {
            exp.conditionIndex += 1;
            runCondition(exp.conditionIndex);

          } else { // completed experiment
            console.log('= = = end cycle = = = ');
            finishExperiment();
          }
        }
      }
    };

    function finishExperiment() {
      updateWindowValue("(Congratulations, you have finished this experiment.)");
    };

    // END MAIN LOOP 


};


