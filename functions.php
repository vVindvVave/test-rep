<?php
/**
 * sandbox functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package sandbox
 */

require_once 'classes/BEM_Walker_Nav_Menu.php';

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

function modify_jquery() {
	if (!is_admin()) {
		// Убираем подключенную старую версию библиотеки
		wp_deregister_script('jquery');
	}
}
add_action('init', 'modify_jquery');

add_action('after_setup_theme', function (){
	add_theme_support('menus');
	register_nav_menus(
		[
			'header-menu' => 'Меню в шапке сайта',
			'footer-menu' => 'Меню в подвале сайта'
		]
	);
});