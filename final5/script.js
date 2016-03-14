$(document).ready(function() {
	
   $('#resume').click(function(){
	   if($('#personal-area').css('display')!='none'){
			$('#resume-area').html($('#resume-area').html()).show().siblings('div').hide();
		}
   });
   
  /* $('#resume').click(function(){
		$('#resume-area').removeClass("visible");
		$('#personal-area').addClass("visible");
		$('#personal').css('z-index', '1');
		$('#resume-area').css('z-index','3');
   });  */

	$('#personal').click(function(){
		if($('#resume-area').css('display')!='none'){
			$('#personal-area').html($('#personal-area').html()).show().siblings('div').hide();
		}
		/*
		$('#resume-area').addClass("visible");
		$('#personal-area').removeClass("visible");
		$('#resume-area').css('pointer-events','none');
		$('#personal').css('z-index', '3');*/
   });   
   
   
	$('#resume-pdf').addClass("visible");
	$('#resume-pdf').css('pointer-events','none');
	
	/*
	$(function(){
		var bodyX = $('col-md-8').width();
		$('.navbar').width(bodyX);
	})
	*/
	
	$('.col-md-1').click(function(){
		console.log($(this).width());
	})	
});

/*
$(window).resize(function() {
	var navX = $('.col-md-8').width();
    $('.navbar').width(navX);
});
*/