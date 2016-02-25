$(document).ready(function() {
	
   
   $('#resume').click(function(){
		$('#resume-pdf').toggleClass("visible");
   });   

   $(function(){
		var x = $('#resume-pdf').parent().width();
		$('#resume-pdf').width(x);
		$('#resume-pdf').addClass("visible");
   })
  
});

//ask for array append code