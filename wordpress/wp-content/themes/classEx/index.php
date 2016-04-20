<?php 
	//WP stuph
	get_header(); while (have_posts()) : the_post();
?>


	<!-- ABOUT ME AREA -->
	<div class="container">
		<div class="row">
			<div class="col-md-2"> 
				<h1>Colewrus & Co.</h1>
			</div>
	
			<div class="col-md-8"> 
				</br>
				
					<div id='game-area'>			
				
						<ul>
						<!-- Maybe not, but how do we get these to auto populate in the content area
							<li>
								<div>
									<div class="hover-description"><p>A global game jam game from 2016, this year's theme was <b>ritual</b>. Play <i>Mondaze</i> everyday the same.</p></div>
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
							-->
							<?php the_content(); ?>
						</ul>
				</div>	
				
				
			</div>
		

			<div class="col-md-2">
				</br>
				<!-- Side button area, use for the blog eventually
				<div id="game-butt" class="right-butt any-menu">
					Games
				</div>
				<div id="write-butt" class="right-butt any-menu">
					Writing					
				</div>
				-->
			</div>
		</div>
	</div>
	
<?php 
	endwhile; get_footer();
?>	