$(document).ready(function() {
	
   $('#resume').click(function(){
	   if($('#personal-area').css('display')!='none'){
			$('#resume-area').html($('#resume-area').html()).show().siblings('div').hide();
		}
   });
   
   	$(window).scroll(function(){
		if ($(this).scrollTop() > 50){
			$('nav').removeClass('navbar-wrapper');
			$('nav').addClass('scroll-fixed');
		}else{
			$('nav').removeClass('scroll-fixed');
			$('nav').addClass('navbar-wrapper');
		}
	});

	$('#personal').click(function(){
		if($('#resume-area').css('display')!='none'){
			$('#personal-area').html($('#personal-area').html()).show().siblings('div').hide();
		}
	});      
   
	$('#resume-pdf').addClass("visible");
	$('#resume-pdf').css('pointer-events','none');
	
	$('.col-md-1').click(function(){
		console.log($(this).width());
	})	
});

