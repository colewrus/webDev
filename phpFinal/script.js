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
	
	$('button').click(function(){
		if($('button').hasClass('collapsed')){
			console.log('hit');
			$('button').removeClass('collapsed');
			$('button').addClass('drop-down');
			$('.menu li').css('display', 'list-item');
			$('.navbar-wrapper div').addClass('visible');
		}
		else if($('button').hasClass('drop-down')){
			$('button').removeClass('drop-down');
			$('button').addClass('collapsed');
			$('.menu li').css('display', 'none');
			$('.navbar-wrapper div').removeClass('visible');
		}
	});
   
	$('#resume-pdf').addClass("visible");
	$('#resume-pdf').css('pointer-events','none');
	
});

