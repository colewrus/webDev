<?php 
	//WP stuph
	get_header(); 
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
						<div>
						<?php while (have_posts()) : the_post();?>
							<li>
								<?php 
									$bgImage = "";
									if (get_field("bkgImg") && is_numeric(get_field("bkgImg"))):
										$image = wp_get_attachment_image_src(get_field("bkgImg"), "large");
										//$image[0] is the URL
										$bgImage = $image[0];
								?>
								
								<?php endif;  ?>
							<div style="background-image:url('<?php echo $bgImage; ?>');">
								<h2><?php echo get_the_title(); ?></h2>
								<div class="hover-description"><?php echo get_the_content();?></div>
								
								<img alt="" />

								</div>
							</li>
							<?php endwhile;?>
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
	get_footer();
?>	