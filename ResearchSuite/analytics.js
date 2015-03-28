(function(){
	'use strict';

	
	window.Q = window.Q || {};
	var Q = window.Q;

	Q.research = Q.research || {};


	Q.ping = function() {
		// console.log('Q.research responded to Ping');
		return 'Q.research return ping';
	};

	// Q.uploadToGoogleDocs; 

	Q.uploadToGoogleDocs = function(expName, incomingData){
		// send data to google docs
		/*
		Connect to google docs.
		Find a document matches experimentName
		Add an entry with the subject info and data.
			For any property in data, where the property name exists as a column, enter the value under that column.
		*/
	    
		incomingData.Experiment = expName; // must add this so can match to Experiment. 

	    console.log( 'before ajax script for uploadToGoogle' );
	    console.log('data received: ' + incomingData);
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
        console.log('after ajax script for uploadToGoogle' );
        console.log('data sent to GDocs');	
	};

// end library
}());
