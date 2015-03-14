var indexController = {
	index: function(req, res){
		res.render('index');
	},

	getTemplate: function(req,res){
		//console.log('templateId:' +req.params.templateId);
		res.render('templates/'+req.params.templateId);
	}
};

module.exports = indexController;