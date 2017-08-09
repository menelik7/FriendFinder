var friendsList = require ('../data/friends.js');

// Declare global variables 
var matchName = '';
var matchImage = '';
var scoreScale = 100; // Set the initial value to a number that will be much greater than the largest possible difference b/w userScores and friendsList.scores.
var variance = 0;

module.exports = function (app) {

	app.get('/api/friends', function(req, res) {
		res.json(friendsList);
	});

	// Evaluate and post new entry
	app.post('/api/friends', function(req, res) {

		// Store the user's input
		var userData = req.body;
		// console.log('userData = ' + JSON.stringify(userData));

		var userScores = userData.scores;
		// console.log('userScores = ' + userScores);		

		// Loop through our friendsList
		for (var i = 0; i < friendsList.length; i++) {

			// Loop through the scores of each question for both the new user as well as existing friends and compute their variance.
			for (var x = 0; x < userScores.length; x++) {
				variance += Math.abs(friendsList[i].scores[x] - userScores[x]);
			}
			// console.log('variance = ' + variance);

			// Determine the lowest variance by setting scoreScale equal to variance - The lowest varinace will remain and that index will be applied to the matchName and matchIMG  
			if (variance < scoreScale) {

				scoreScale = variance;
				matchName = friendsList[i].name;
				matchImage = friendsList[i].photo;
			}
		}

		// Add new user to our friendsList
		friendsList.push(userData);

		// Send response to our display modal page
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});

	// app.post('/api/clear', function() {
	// 	friendsList = [];
	// });
}