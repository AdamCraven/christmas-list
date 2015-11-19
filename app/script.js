$(document).ready(function(){
	
	$(".box1").hover(
		function() {
			$(".box1").addClass("reduce").addClass("tbg");
		},
		function() {
			$(".box1").removeClass("reduce").addClass("tbg");
		}
		);
		
	$(".box2").hover(
		function() {
			$(".box2").addClass("reduce");
		},
		function() {
			$(".box2").removeClass("reduce");
		}
		);
		
	$(".box3").hover(
		function() {
			$(".box3").addClass("reduce");
		},
		function() {
			$(".box3").removeClass("reduce");
		}
		);
	
	


});