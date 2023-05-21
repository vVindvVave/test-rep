<?php

$uri = get_page_uri();
$split_url = explode('/' , $uri);
$main_section = $split_url[0];
$detail_page = $split_url[1] ?? '';

if(!empty($detail_page)){
	$GLOBALS['page'] = '_' . $main_section . '-detail';
} else {
	$GLOBALS['page'] = '_' . $main_section;
}

get_header(); ?>

	<?php

		switch ($main_section) {
			case 'about-us':
				get_template_part( 'pages/about-us' );
				break;
			case 'contacts':
				get_template_part( 'pages/contacts' );
				break;
			case 'news':
				get_template_part( 'pages/news' );
				break;
		}

	?>

<?php get_footer(); ?>