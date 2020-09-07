<?php
/**
 * Returns data needed to render the library page
 * /library
 */
add_action('rest_api_init', function () {
  register_rest_route('midiblocks', '/library', [
    'methods' => 'GET',
    'callback' => function ($request) {

      // Build the query
      $posts = get_posts([
        'post_type' => 'block'
      ]);

      // Build the response
      $json = ['blocks' => []];
      foreach ($posts as $post) {
        setup_postdata($post);

        $json['blocks'][] = [
          'type' => $post->post_name,
          'title' => $post->post_title,
          'short_description' => get_post_meta($post->ID, 'short_description'),
          'block_definition' => get_post_meta($post->ID, 'block_definition')
        ];
      }

      wp_reset_postdata();
      return $json;
    }
  ]);
});
