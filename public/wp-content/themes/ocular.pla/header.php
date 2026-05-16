<!doctype html>
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<title>new <?php echo bloginfo('name'); ?> </title>

	<meta name="generator" content="WordPress <?php bloginfo('version'); ?>" />
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen" />
	<?php //wp_head(); ?>

  <script language="javascript" type="text/javascript">
  // <!--
  
//bron: http://niwo.mnsys.org/faq/voorbeelden/mouseover.html
if (document.images) {
   
  // de plaatjes pre-laden
  afb1Uit = new Image();
  afb1Uit.src = "<?php bloginfo('template_directory'); ?>/images/m_1_bw.jpg";
  afb1Aan = new Image();
  afb1Aan.src = "<?php bloginfo('template_directory'); ?>/images/m_1_cl.jpg";

  afb2Uit = new Image();
  afb2Uit.src = "<?php bloginfo('template_directory'); ?>/images/m_2_bw.jpg";
  afb2Aan = new Image();
  afb2Aan.src = "<?php bloginfo('template_directory'); ?>/images/m_2_cl.jpg";

  afb3Uit = new Image();
  afb3Uit.src = "<?php bloginfo('template_directory'); ?>/images/m_3_bw.jpg";
  afb3Aan = new Image();
  afb3Aan.src = "<?php bloginfo('template_directory'); ?>/images/m_3_cl.jpg";

  afb4Uit = new Image();
  afb4Uit.src = "<?php bloginfo('template_directory'); ?>/images/m_4_bw.jpg";
  afb4Aan = new Image();
  afb4Aan.src = "<?php bloginfo('template_directory'); ?>/images/m_4_cl.jpg";

}

// de daadwerkelijke functies
function afbAan(Naam) {
  if (document.images) {
    tekstAanNaam = eval(Naam + "Aan.src");
    document.images[Naam].src = tekstAanNaam;
  }
}

function afbUit(Naam) {
  if (document.images) {
    tekstUitNaam = eval(Naam + "Uit.src");
    document.images[Naam].src = tekstUitNaam;
  }
}
  // -->
  </script>



</head>

<body>
<div class="wrapper">
    <div class="menu">
<div id="menu_1"><img src=<?php bloginfo('template_directory'); ?>/images/title_realisme.png><A href="/category/realisme" onMouseover="afbAan('afb1')" onMouseout="afbUit('afb1')"><img src="<?php bloginfo('template_directory'); ?>/images/m_1_bw.jpg" width="150" height="100"  border="0" name="afb1"></A></div>
      <div id="menu_2"><img src=<?php bloginfo('template_directory'); ?>/images/title_abstract.png><A href="/category/abstract" onMouseover="afbAan('afb2')" onMouseout="afbUit('afb2')"><img src="<?php bloginfo('template_directory'); ?>/images/m_2_bw.jpg" width="150" height="100"  border="0" name="afb2"></A></div>
      <div id="menu_3"><img src=<?php bloginfo('template_directory'); ?>/images/title_beeld.png><A href="/category/beelden-grafiek-tekeningen" onMouseover="afbAan('afb3')" onMouseout="afbUit('afb3')"><img src="<?php bloginfo('template_directory'); ?>/images/m_3_bw.jpg" width="150" height="100"  border="0" name="afb3"></A></div>
      <div id="menu_4"><img src=<?php bloginfo('template_directory'); ?>/images/title_fotografie.png><A href="/category/fotografie" onMouseover="afbAan('afb4')" onMouseout="afbUit('afb4')"><img src="<?php bloginfo('template_directory'); ?>/images/m_4_bw.jpg" width="150" height="100"  border="0" name="afb4"></A></div>
      <div id="menu_right">
<A href="/contact"><img src="<?php bloginfo('template_directory'); ?>/images/pla_contact_off.png" border="0"></A>
<img src="<?php bloginfo('template_directory'); ?>/images/spacer.png" height="5">
<a href="/info">
<img src="<?php bloginfo('template_directory'); ?>/images/pla_info_off.png" border="0"></a>
<img src="<?php bloginfo('template_directory'); ?>/images/spacer.png" height="5">
<a href="/">
<img src="<?php bloginfo('template_directory'); ?>/images/pla_home_off.png" border="0"></a></div>
    </div>
    <div class="title">
      <img src="<?php bloginfo('template_directory'); ?>/images/peter_lucker.png" width="399" height="57">
    </div>
