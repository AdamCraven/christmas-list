$.get('/projects/', function(projects) {
  var source = $("#hbs-project-template").html();
  var template = Handlebars.compile(source);

  var projectListHTML = projects.map(function(project) {
    return (template(project));
  });

  $('.wrapper').append(projectListHTML);
});


function remove(e) {
  e.preventDefault();
  var $form = $(e.target).parent('form');
  var id = $form[0].id;

  $.ajax({
    type: "DELETE",
    url: '/projects/' + id,
    data: '',
    success: function() {
      $form.remove();
    },
    error: function() {
      alert('Could not delete, server problems?');
    }
  });
}

function submit(e) {
  e.preventDefault();
  var $form = $(e.target).parent('form');
  var id = $form.find('input[name="id"]').val();
  var url = (id) ? 'upload/' + id : '/upload';

  $.ajax({
    url: url,
    data: new FormData($form[0]),
    processData: false,
    contentType: false,
    type: 'POST',
    success: function(data) {
      console.log(data);
    },
    error: function(data) {
      alert('fail', JSON.stringify(data));
    }
  });
}

$(document).on('click', 'button.delete', remove);
$(document).on('click', 'button.update', submit);
$(document).on('click', 'input.create', submit);
