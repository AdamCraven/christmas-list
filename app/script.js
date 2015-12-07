

function updatePurchased(id, isPurchased) {
  $.ajax({
    url: '/purchased/'+ id,
    data: {purchased: isPurchased, id: id},
    type: 'POST',
    success: function(data) {
      console.log(data);
    },
    error: function(data) {
      alert('error updating purchase. Please refresh your browser');
    }
  });
}

  $(document).on('click', '.product input', function() {
		if($(this).is(':checked')) {
			$(this).parents('.product').addClass("reduce");
      updatePurchased($(this).data('id'), true);
		} else {
      $(this).parents('.product').removeClass("reduce");
      updatePurchased($(this).data('id'), false);
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

if (window.location.port === "18080") {
  $('.name').html('ADAM');
  $('body').addClass('adam');
}
if (window.location.port === "17070") {
  $('.name').html('ANDREW');
  $('body').addClass('andrew');
}

$('body').bind('touchstart', function() {});