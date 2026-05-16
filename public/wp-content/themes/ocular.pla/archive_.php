<?php get_header(); ?>

	
  <div class="container">


  <div id="page">
    <h2><?php single_cat_title(''); ?> </h2>
  </div>
    <?php query_posts($query_string .'&meta_key=psort_&orderby=meta_value_num&order=ASC');?>			
    <?php if (have_posts()) : ?>
      <?php while (have_posts()) : the_post();
	if( $post->ID == $do_not_duplicate ) continue; update_post_caches($posts); ?>
	<div class="post">
	  <?php the_content(); ?>
	</div>
			
		
	<div class="main_meta">
	  <h2>x<?php the_title(); ?></h2>
	  <ul>
	    <li>1<?php echo get_post_meta($post->ID,'afmeting', true); ?></li>
            <li>2<?php echo get_post_meta($post->ID,'jaar', true); ?></li>
            <?php $extra=get_post_meta($post->ID,'extra', false);
            foreach ($extra as $key_value) { ?>
            <li> <?php echo $key_value; ?> </li>
            <?php } ?>
	  </ul>
			
	  <p class="edit"><?php edit_post_link('wijzigen', '', ''); ?></p>
			
	</div>

      <?php endwhile; ?>

      <div class="archive_nav">
	<div class="left"><?php previous_posts_link('&laquo; Vorige') ?>&nbsp;</div>
	<div class="right">&nbsp;<?php next_posts_link('Volgende &raquo;') ?></div>
      </div>
  
    <?php else : ?>

        <div class="fourohfour">
          <img src="<?php bloginfo('template_directory'); ?>/images/mal.jpg" alt="a questioning duck" class="notfound" />
	</div>

    <?php endif; ?>
</div>
<?php get_footer(); ?>
