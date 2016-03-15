$(document).ready(function() {
	$(window).scroll(function(){
		if ($(this).scrollTop() > 150){
			console.log("scroll works");
		}
	});
});