var db = require('../models');
var path = require('path');

module.exports = function(app){
	app.get('/', function(req, res){
		db.Snippets.findAll({
			include: [db.Categories, db.Users]
		}).then(function(data){
			console.log('\nfindall categories data\n');
			res.json(data);
		}).catch(function(err){
			console.log("\ncategories find all error\n");
			console.log(err);
		});

		/*db.Snippets.findAll().then(function(data){
			res.json(data);
			console.log(data[0].dataValues)
		}).catch(function(err){
			console.log(err);
		});*/
	});
	
	app.post('/api/add', function(req, res){
		db.Categories.create({
			category: req.body.category,
			SnippetId: 1
		}).then(function(data){
			res.json(data);
			/*console.log(data);*/
		}).catch(function(err){
			console.log("\ncategories create error\n");
			console.log(err);
		});
		//create snippet
		db.Snippets.create({
			snippet: req.body.snippet,
			importance: req.body.urgency,
		}).then(function(data){
			res.redirect('/api/view');
			/*console.log(data);*/
		}).catch(function(err){
			console.log('\nsnippet create error\n');
			console.log(err);
		});
	});
	
	app.delete('/api/delete/:id', function(req, res){
		db. Categories.destroy({
			where: req.params.id
		}).then(function(data){
			console.log(data);
			res.redirect('/');
		}).catch(function(err){
			console.log(err);
		});
	});



};


