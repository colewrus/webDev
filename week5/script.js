$(document).ready(function() {
	var thisWidth = $('.verticalSlide li').width();
	

	
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
   
   $('li').click(function(){

	   var toggleWidth = $(this).width() == thisWidth + 100 ? thisWidth : thisWidth+100;
	   $(this).animate({width: toggleWidth});
	   //$(this).width(50);
	   console.log(thisWidth);
   });
   
   $('.col-md-1').click(function(){
		console.log('clicked me');
   });
   
});

//ask for array append code