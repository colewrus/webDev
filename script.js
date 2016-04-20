var phoneSize;
var browserSize;

$(document).ready(function() {
	
//----HEADER SCROLL STICKY----//	
   	$(window).scroll(function(){
		if ($(this).scrollTop() > 50){
			$('nav').removeClass('navbar-wrapper');
			$('nav').addClass('scroll-fixed'); 
		}else{
			$('nav').removeClass('scroll-fixed');
			$('nav').addClass('navbar-wrapper');
		}
	});

    
//----MOBILE MENU DROPDOWN----//	
	$('button').click(function(){
		if(phoneSize){
			if($('button').hasClass('collapsed')){
				$('button').removeClass('collapsed');
				$('button').addClass('drop-down');
				$('.menu li').css('display', 'list-item');
				$('.mobile-menu').addClass('visible');
			}
			else if($('button').hasClass('drop-down')){
				$('button').removeClass('drop-down');
				$('button').addClass('collapsed');
				$('.menu li').css('display', 'none');
				$('.mobile-menu').removeClass('visible');
			}
		}
	});
   
	$('#resume-pdf').addClass("visible");
	$('#resume-pdf').css('pointer-events','none');	
});


//----WINDOW RESIZE CHECK mostly for that damn mobile button----//
$(window).resize(function(){
	if($(window).width() <= 770){
		phoneSize = true;
		$('.menu li').css('display', 'none');
	}else if($(window).width() >= 770){
		phoneSize = false;
		$('.menu li').css('display', 'inline-block');
	}
})


//----ABOUT ME CLICK INTERACTION----//	
   $('#resume').click(function(){
	   if($('#personal-area').css('display')!='none'){
			$('#resume-area').html($('#resume-area').html()).show().siblings('div').hide();
		}
    });
   
   	$('#personal').click(function(){
		if($('#resume-area').css('display')!='none'){
			$('#personal-area').html($('#personal-area').html()).show().siblings('div').hide();
		}
	});  
	
//----PORTFOLIO BUTTON DIV LOADS----//
$('#game-butt').click(function(){
	console.log('you got game');
})
