

  $(document).on('click', '.product input', function() {
		if($(this).is(':checked')) {
			$(this).parents('.product').addClass("reduce");

		} else {
			$(this).parents('.product').removeClass("reduce");
		}
	});




	$.get('/projects/',function (projects) {
		var source   = $("#hbs-project-template").html();
		var template = Handlebars.compile(source);

		var projectListHTML = projects.map(function (project) {
			return(template(project));
		});

		$('.wrapper').append(projectListHTML);
	});


