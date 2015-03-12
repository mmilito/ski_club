var indexController = {
	index: function(req, res){
		res.render('index');
	},

	getTemplate: function(req,res){
		res.render('templates/'+req.params.templateId);
	}
};

module.exports = indexController;