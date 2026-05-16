<?php get_header(); ?>

<div class="container">

    <?php if (have_posts()) : ?>

      <?php while (have_posts()) : the_post();
	if( $post->ID == $do_not_duplicate ) continue; update_post_caches($posts); ?>

	  <?php the_content(); ?>
          <?php comments_template(); ?>	
      <?php endwhile; ?>

     <?php else : ?>

	<div class="fourohfour">
	  <img src="<?php bloginfo('template_directory'); ?>/images/mal.jpg" alt="a questioning duck" class="notfound" />
	</div>
	
      <?php endif; ?>
<hr/>
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
</div>

<?php get_footer(); ?>
