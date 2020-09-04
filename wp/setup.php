<?php
add_filter('use_block_editor_for_post', '__return_false', 10);

/**
 * Setup Menus
 */
add_action('after_setup_theme', function () {
  register_nav_menus([
    'mainNavPanel' => 'Main Nav Panel'
  ]);
});