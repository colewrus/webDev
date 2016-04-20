<?php 
	$nav_list = array(
		'/index' => 'Home',
		'/contact' => 'Contact',
		'/portfolio' => 'Portfoliofdafdsdasfdsafdsfds',
		'/blog' =>'Blog',
		'/ugly' =>'Ugly Box'
	);
	
?>

<!DOCTYPE html>
<html lang="en">
  <head>
  
  <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body>
	<div class="navbar">
		<ul class="menu">
			<?php 
				foreach($nav_list as $link => $title){
					echo '<li class="slanted"><a href="';
					echo $link;
					echo '">';
					echo $title;
					echo '</a></li>';
				}		
			?>
		</ul>
	</div>
  </body>
</html>