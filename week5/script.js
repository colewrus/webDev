$(document).ready(function() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> d74e2f1c0a77ba9efa6ab5ada5cdc4ea540f140d
	var thisWidth = $('.verticalSlide li').width();
	

	
<<<<<<< HEAD
=======
=======
>>>>>>> 78e63a6eca563282ddb9bc69ad02028c32652f1f
>>>>>>> d74e2f1c0a77ba9efa6ab5ada5cdc4ea540f140d
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
   
=======
   $('li')
   
<<<<<<< HEAD
>>>>>>> d74e2f1c0a77ba9efa6ab5ada5cdc4ea540f140d
   $('li').click(function(){

	   var toggleWidth = $(this).width() == thisWidth + 100 ? thisWidth : thisWidth+100;
	   $(this).animate({width: toggleWidth});
	   //$(this).width(50);
	   console.log(thisWidth);
   });
   
<<<<<<< HEAD
   $('.col-md-1').click(function(){
		console.log('clicked me');
   });
   
});

//ask for array append code
=======
});

//ask for array append code
=======
});
>>>>>>> 78e63a6eca563282ddb9bc69ad02028c32652f1f
>>>>>>> d74e2f1c0a77ba9efa6ab5ada5cdc4ea540f140d
