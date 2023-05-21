<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport"
	      content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="<?php echo get_template_directory_uri() ?>/frontend/assets/base.css">

	<title>Песочница</title>
</head>
<body>
<div class="page <?= $GLOBALS['page'] ?? '_index' ?>">
<?php
if ( current_user_can( 'manage_options' ) ) {
	wp_head();
}
?>
<header class="header">
	<div class="container">
		<div class="header__row">
			<a <? if (!is_front_page()) echo 'href="/"' ?> class="header__logo" style="width: 200px; height: 50px; background-color: lightgray; display: flex; align-items: center; justify-content: center">
				<h1>Sandbox</h1>
			</a>
			<?
			wp_nav_menu(
				[
					'theme_location' => 'header-menu',
					'depth'          => 2,
					'container'      => false,
					'fallback_cb'    => false,
					'echo'           => true,
					'walker'         => new BEM_Walker_Nav_Menu(),
					'bem_block'      => 'nav',
					'items_wrap'     => '<nav class="nav nav_header"><ul class="nav__list nav__list_header">%3$s</ul></nav>',
				]
			);
			?>
		</div>
	</div>
</header>
<main class="main">
