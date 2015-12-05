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
  var id = $form[0].id;
  var ye = new FormData($form[0]);

  var url = (id) ? 'upload/' + id : '/upload';


  $.ajax({
      url: url,
      data: ye,
      processData: false,
      contentType: false,
      type: 'POST',
      success: function(data) {
        alert(data);
      },
      error: function(data) {
        alert(JSON.stringify(data));
      }
    });
    //debugger;

    //$.post('//localhost:5050/projects/', data, function() {});
  }

      $(document).on('click', 'button.delete', remove);
    $(document).on('click', 'button.update', submit);

    $('form').submit(submit);

