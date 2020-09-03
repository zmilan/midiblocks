<?php
/**
 * Returns data needed to recreate the page on load
 * /boot
 */
add_action('rest_api_init', function () {
  register_rest_route('midiblocks', '/boot', [
    'methods' => 'GET',
    'callback' => function ($request) {
      $boot = new App_Boot();
      
      return $boot->data;
    }
  ]);
});
