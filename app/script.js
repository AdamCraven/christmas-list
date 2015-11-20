$(document).ready(function(){
	
	$('#c1').change(function() {
		if($(this).is(':checked')) {
			$(".box1").addClass("reduce");
		} else {
			$(".box1").removeClass("reduce");
		}
	});
		
	$('#c2').change(function() {
		if($(this).is(':checked')) {
			$(".box2").addClass("reduce");
		} else {
			$(".box2").removeClass("reduce");
		}
	});
	
	$('#c3').change(function() {
		if($(this).is(':checked')) {
			$(".box3").addClass("reduce");
		} else {
			$(".box3").removeClass("reduce");
		}
	});


	


});