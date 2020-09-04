<?php

/**
 * Setup Menus
 */
add_action('after_setup_theme', function () {
  register_nav_menus([
    'mainNavPanel' => 'Main Nav Panel'
  ]);
});