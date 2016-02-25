$(document).ready(function() {
	
   
   $('#resume').click(function(){
		$('#resume-pdf').removeClass("visible");
		$('#personal-area').addClass("visible");
		$('#personal').css('z-index', '1');
   });  

	$('#personal').click(function(){
		$('#resume-pdf').addClass("visible");
		$('#personal-area').removeClass("visible");
		$('#personal').css('z-index', '3');
   });   
   
   
	$('#resume-pdf').addClass("visible");
	
   $(function(){
		var x = $('#resume-pdf').parent().width();
		var y = $('#resume-pdf').parent().height();
		$('#resume-pdf').width(x);
		$('#resume-pdf').height(y);
   })
	
	$('.col-md-1').click(function(){
		console.log($(this).width());
	})
	
});


$(window).resize(function() {
	var x = $('#resume-pdf').parent().width();
	var y = $('#resume-pdf').height();
	$('#resume-pdf').width(x);
	$('#resume-pdf').parent().height(y);
    
});

//ask for array append code