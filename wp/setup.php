<?php
/**
 * Setup Menus
 */
add_action('after_setup_theme', function () {
  register_nav_menus([
    'mainNavPanel' => 'Main Nav Panel'
  ]);
});

/**
 * White label
 */
add_filter('login_headerurl', function () {return home_url();});
add_action('login_enqueue_scripts', function () { ?>
  <style type="text/css">
      #login h1 a, .login h1 a {
        background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/dist/spa/favicon.png);
        height: 65px;
        width: auto;
        background-size: fit;
        background-repeat: no-repeat;
        padding-bottom: 30px;
      }
      #login h1 a, .login h1:after {
        content: 'Registration is closed.';
        display: block;
        color: red;
      }
  </style>
<?php } );