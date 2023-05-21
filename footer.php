</main>

<?php
if ( current_user_can( 'manage_options' ) ) {
	wp_footer();
}
?>
<!-- 12344 -->
<footer class="footer">
	<div class="container">
		<div class="footer__row">
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
							'items_wrap'     => '<nav class="nav nav_footer"><ul class="nav__list nav__list_footer">%3$s</ul></nav>',
					]
			);
			?>
		</div>
	</div>
</footer>
</div>
</body>

<link rel='stylesheet' href='<?php echo get_template_directory_uri() ?>/frontend/assets/global.css'>

</html>
