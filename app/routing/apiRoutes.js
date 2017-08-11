var friendsList = require ('../data/friends.js');

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

		var matchName = '';
		var matchImage = '';
		var scoreScale = 100; // Set the initial value to a number that will be much greater than the largest possible difference b/w userScores and friendsList.scores.
		var varianceArray = [];

		// Loop through our friendsList
		for (var i = 0; i < friendsList.length; i++) {

			var variance = 0;
			// Loop through the scores of each question for both the new user as well as existing friends and compute their variance.
			for (var x = 0; x < userScores.length; x++) {
				variance += Math.abs(friendsList[i].scores[x] - userScores[x]);
			}
			
			// Push the total score variance from each friend comparison to our variance array.
			varianceArray.push(variance);
		}
		// console.log(varianceArray);
		
		// Grab the index of the lowest variance in our variance array.
		var indexOfLowestVariance = varianceArray.indexOf(Math.min.apply(null, varianceArray));
		// console.log(indexOfLowestVariance);

		// Pic the best match by setting the friendsList array to the aforementioned index.
		matchName = friendsList[indexOfLowestVariance].name;
		matchImage = friendsList[indexOfLowestVariance].photo;

		// Add the new user to our friendsList
		friendsList.push(userData);

		// Send response to our display modal page
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});

	// app.post('/api/clear', function() {
	// 	friendsList = [];
	// });
}