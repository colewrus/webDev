<?php 
	$nav_list = array(
		'/index.php' => 'Home',
		'/contact.php' => 'Contact',
		'/portfolio.php' => 'Portfolio',
		'/blog.php' =>'Blog',
		'/ugly.php' =>'Ugly Box'
	);
	
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../img/colewrusTP.png">
    <title><?php echo $page_title; ?></title>


   
<!-- Bootstrap loads -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
	

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Custom styles for this template -->
	<link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" type="text/css" href="carousel.css">
	
	<!-- Aaaaaand font style -->
		<link href='https://fonts.googleapis.com/css?family=Righteous' rel='stylesheet' type='text/css'>
	
  </head>
<!-- NAVBAR
================================================== -->
  <body>
  
	<!--<div class="navbar-wrapper">-->
	<nav class="navbar-wrapper">
		<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		  <span class="sr-only">Toggle navigation</span>
		  <span class="icon-bar"></span>
		  <span class="icon-bar"></span>
		  <span class="icon-bar"></span>
		</button>
		<ul class="menu">
			<?php 
				foreach($nav_list as $link => $title){
					echo '<li class="slanted any-menu"><a href="';
					echo $link;
					echo '">';
					echo $title;
					echo '</a></li>';
				}		
			?>
		</ul>	
	</nav>
	<!--</div>end of navbar-wrapper-->
  
	<!--
    <div class="navbar-wrapper">
     	<nav class="navbar navbar-default">
		<div class="container-fluid">
		  <div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
			  <span class="sr-only">Toggle navigation</span>
			  <span class="icon-bar"></span>
			  <span class="icon-bar"></span>
			  <span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">Colewrus & Co</a>
		  </div>
		  <div id="navbar" class="navbar-collapse collapse">
			<ul class="nav navbar-nav">-->
				<?php 
				/*	foreach($nav_list as $link => $title){
						echo '<li class="slanted"><a href="';
						echo $link;
						echo '">';
						echo $title;
						echo '</a></li>';
					}		*/
				?>
			
			<!--
			  <li class="slanted"><a href="index.html">Home</a></li>
			  <li class="slanted"><a href="contact.html">Contact</a></li>
			  <li class="slanted"><a href="portfolio.html">Portfolio</a></li>
			  <li class="slanted"><a href="blog.html">Blog</a></li>
			  <li class="slanted"><a href="ugly.html">Ugly Box</a></li>
			  -->
			</ul>
		  </div><!--/.nav-collapse -->
		</div><!--/.container-fluid -->
	</nav>
    </div>

