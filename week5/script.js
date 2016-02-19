$(document).ready(function() {
<<<<<<< HEAD
	var thisWidth = $('.verticalSlide li').width();
	

	
=======
>>>>>>> 78e63a6eca563282ddb9bc69ad02028c32652f1f
   $('li').mouseenter(function() {
       $(this).animate({
           height: '+=10px'
       });
   });
   $('li').mouseleave(function() {
       $(this).animate({
           height: '-=10px'
       }); 
   });
   
<<<<<<< HEAD
   $('li').click(function(){

	   var toggleWidth = $(this).width() == thisWidth + 100 ? thisWidth : thisWidth+100;
	   $(this).animate({width: toggleWidth});
	   //$(this).width(50);
	   console.log(thisWidth);
   });
   
});

//ask for array append code
=======
});
>>>>>>> 78e63a6eca563282ddb9bc69ad02028c32652f1f
