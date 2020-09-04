<?php
/**
 * Gets content related to the current post (title, content, author, etc)
 * - This is called automatically on every route
 * 
 * /post
 */
add_action('rest_api_init', function () {
  register_rest_route('midiblocks', '/post', [
    'methods' => 'GET',
    'callback' => function ($request) {
      // Defaults
      $params = [
        'url' => $request->get_param('url')
      ];
      
      $id = url_to_postid(trim($params['url'], '/'));
      $data = [];
      
      if ($id) {
        $post = get_post($id);
        $data = [
          'id' => $post->ID,
          'title' => $post->post_title,
          'content' => $post->post_content
        ];
      }
      
      return $data;
    }
  ]);
});
