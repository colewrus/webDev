$(document).ready(function() {
	
   
   $('#resume').click(function(){
		$('#resume-pdf').removeClass("visible");
		$('#personal-area').addClass("visible");
		$('#personal').css('z-index', '1');
		$('#resume-pdf').css('pointer-events','auto');
		$('#resume-pdf').css('z-index','3');
		$('#resume-pdf').css('height', '900px');
   });  

	$('#personal').click(function(){
		$('#resume-pdf').addClass("visible");
		$('#personal-area').removeClass("visible");
		$('#resume-pdf').css('pointer-events','none');
		$('#personal').css('z-index', '3');
		$('#resume-pdf').css('height','auto');
   });   
   
   
	$('#resume-pdf').addClass("visible");
	$('#resume-pdf').css('pointer-events','none');
	
   $(function(){
		var x = $('#resume-pdf').parent().width();
		var navX = $('.col-md-8').width();
		$('#resume-pdf').width(x);
		$('.navbar').width(navX);
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
