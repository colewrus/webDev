<?php 
	//WP stuph
	//get_header(); while (have_posts()) : the_post();
	$page_title = 'Portfolio';
	include 'header.php';
?>


	<!-- ABOUT ME AREA -->
	<div class="container">
		<div class="row">
			<div class="col-md-2"> 
				<h1>Colewrus & Co. Portfolio</h1>
			</div>
			
			<div class="col-md-8"> 
				</br>
				<div id='game-area'>
					<ul>
						<li><div>
								<h2>Mondaze</h2>
								<img></img>
							</div>
						</li>
						
						<li><div>
								<h2>Global Eagle</h2> 
								<img></img>
							</div>
						</li>
						<li><div>
								<h2>Beautiful Night</h2> 
								<img></img>
							</div>
						</li>
					</ul>
				</div>	
			</div>
			
			<div class="col-md-2">
				</br>
				<div id="game-butt" class="right-butt any-menu">
					Games
				</div>
				<div id="write-butt" class="right-butt any-menu">
					Writing					
				</div>
			</div>
		</div>
	</div>
	
<?php 
	//endwhile; get_footer();
	include 'footer.php';
?>	