<?php
/**
 * Setup Custom Post Type
 */
add_action('init', function () {
  register_post_type('block', [
    'label' => 'Blocks',
    'public' => true,
    // True to fascilitate forking (forks become children)
    'hierarchical' => true,
    'menu_icon' => 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJjdWJlcyIgcm9sZT0iaW1nIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWN1YmVzIGZhLXctMTYgZmEtM3giIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgc3R5bGU9ImJsb2NrLXNpemU6NDhweDtib3JkZXItYmxvY2stZW5kLWNvbG9yOnJnYigyNTUsIDI1NSwgMjU1KTtib3JkZXItYmxvY2stc3RhcnQtY29sb3I6cmdiKDI1NSwgMjU1LCAyNTUpO2JvcmRlci1ib3R0b20tY29sb3I6cmdiKDI1NSwgMjU1LCAyNTUpO2JvcmRlci1pbmxpbmUtZW5kLWNvbG9yOnJnYigyNTUsIDI1NSwgMjU1KTtib3JkZXItaW5saW5lLXN0YXJ0LWNvbG9yOnJnYigyNTUsIDI1NSwgMjU1KTtib3JkZXItbGVmdC1jb2xvcjpyZ2IoMjU1LCAyNTUsIDI1NSk7Ym9yZGVyLXJpZ2h0LWNvbG9yOnJnYigyNTUsIDI1NSwgMjU1KTtib3JkZXItdG9wLWNvbG9yOnJnYigyNTUsIDI1NSwgMjU1KTtjYXJldC1jb2xvcjpyZ2IoMjU1LCAyNTUsIDI1NSk7Y29sb3I6cmdiKDI1NSwgMjU1LCAyNTUpO2NvbHVtbi1ydWxlLWNvbG9yOnJnYigyNTUsIDI1NSwgMjU1KTtjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LXNpemU6NDhweDtoZWlnaHQ6NDhweDtpbmxpbmUtc2l6ZTo0OHB4O2xpbmUtaGVpZ2h0OjU1LjJweDtvdXRsaW5lLWNvbG9yOnJnYigyNTUsIDI1NSwgMjU1KTtvdmVyZmxvdy14OnZpc2libGU7b3ZlcmZsb3cteTp2aXNpYmxlO3BlcnNwZWN0aXZlLW9yaWdpbjoyNHB4IDI0cHg7dGV4dC1hbGlnbjpjZW50ZXI7dGV4dC1kZWNvcmF0aW9uOm5vbmUgc29saWQgcmdiKDI1NSwgMjU1LCAyNTUpO3RleHQtZGVjb3JhdGlvbi1jb2xvcjpyZ2IoMjU1LCAyNTUsIDI1NSk7dHJhbnNmb3JtLW9yaWdpbjoyNHB4IDI0cHg7dmVydGljYWwtYWxpZ246LTZweDt3aWR0aDo0OHB4Oy13ZWJraXQtdGV4dC1lbXBoYXNpcy1jb2xvcjpyZ2IoMjU1LCAyNTUsIDI1NSk7LXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6cmdiKDI1NSwgMjU1LCAyNTUpOy13ZWJraXQtdGV4dC1zdHJva2UtY29sb3I6cmdiKDI1NSwgMjU1LCAyNTUpOyI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNNDg4LjYgMjUwLjJMMzkyIDIxNFYxMDUuNWMwLTE1LTkuMy0yOC40LTIzLjQtMzMuN2wtMTAwLTM3LjVjLTguMS0zLjEtMTcuMS0zLjEtMjUuMyAwbC0xMDAgMzcuNWMtMTQuMSA1LjMtMjMuNCAxOC43LTIzLjQgMzMuN1YyMTRsLTk2LjYgMzYuMkM5LjMgMjU1LjUgMCAyNjguOSAwIDI4My45VjM5NGMwIDEzLjYgNy43IDI2LjEgMTkuOSAzMi4ybDEwMCA1MGMxMC4xIDUuMSAyMi4xIDUuMSAzMi4yIDBsMTAzLjktNTIgMTAzLjkgNTJjMTAuMSA1LjEgMjIuMSA1LjEgMzIuMiAwbDEwMC01MGMxMi4yLTYuMSAxOS45LTE4LjYgMTkuOS0zMi4yVjI4My45YzAtMTUtOS4zLTI4LjQtMjMuNC0zMy43ek0zNTggMjE0LjhsLTg1IDMxLjl2LTY4LjJsODUtMzd2NzMuM3pNMTU0IDEwNC4xbDEwMi0zOC4yIDEwMiAzOC4ydi42bC0xMDIgNDEuNC0xMDItNDEuNHYtLjZ6bTg0IDI5MS4xbC04NSA0Mi41di03OS4xbDg1LTM4Ljh2NzUuNHptMC0xMTJsLTEwMiA0MS40LTEwMi00MS40di0uNmwxMDItMzguMiAxMDIgMzguMnYuNnptMjQwIDExMmwtODUgNDIuNXYtNzkuMWw4NS0zOC44djc1LjR6bTAtMTEybC0xMDIgNDEuNC0xMDItNDEuNHYtLjZsMTAyLTM4LjIgMTAyIDM4LjJ2LjZ6IiBjbGFzcz0iIiBzdHlsZT0iYmxvY2stc2l6ZTphdXRvO2JvcmRlci1ibG9jay1lbmQtY29sb3I6cmdiKDI1NSwgMjU1LCAyNTUpO2JvcmRlci1ibG9jay1zdGFydC1jb2xvcjpyZ2IoMjU1LCAyNTUsIDI1NSk7Ym9yZGVyLWJvdHRvbS1jb2xvcjpyZ2IoMjU1LCAyNTUsIDI1NSk7Ym9yZGVyLWlubGluZS1lbmQtY29sb3I6cmdiKDI1NSwgMjU1LCAyNTUpO2JvcmRlci1pbmxpbmUtc3RhcnQtY29sb3I6cmdiKDI1NSwgMjU1LCAyNTUpO2JvcmRlci1sZWZ0LWNvbG9yOnJnYigyNTUsIDI1NSwgMjU1KTtib3JkZXItcmlnaHQtY29sb3I6cmdiKDI1NSwgMjU1LCAyNTUpO2JvcmRlci10b3AtY29sb3I6cmdiKDI1NSwgMjU1LCAyNTUpO2NhcmV0LWNvbG9yOnJnYigyNTUsIDI1NSwgMjU1KTtjb2xvcjpyZ2IoMjU1LCAyNTUsIDI1NSk7Y29sdW1uLXJ1bGUtY29sb3I6cmdiKDI1NSwgMjU1LCAyNTUpO2N1cnNvcjpwb2ludGVyO2Q6cGF0aCgmcXVvdDtNIDQ4OC42IDI1MC4yIEwgMzkyIDIxNCBWIDEwNS41IEMgMzkyIDkwLjUgMzgyLjcgNzcuMSAzNjguNiA3MS44IEwgMjY4LjYgMzQuMyBDIDI2MC41IDMxLjIgMjUxLjUgMzEuMiAyNDMuMyAzNC4zIEwgMTQzLjMgNzEuOCBDIDEyOS4yIDc3LjEgMTE5LjkgOTAuNSAxMTkuOSAxMDUuNSBWIDIxNCBMIDIzLjMgMjUwLjIgQyA5LjMgMjU1LjUgMCAyNjguOSAwIDI4My45IFYgMzk0IEMgMCA0MDcuNiA3LjcgNDIwLjEgMTkuOSA0MjYuMiBMIDExOS45IDQ3Ni4yIEMgMTMwIDQ4MS4zIDE0MiA0ODEuMyAxNTIuMSA0NzYuMiBMIDI1NiA0MjQuMiBMIDM1OS45IDQ3Ni4yIEMgMzcwIDQ4MS4zIDM4MiA0ODEuMyAzOTIuMSA0NzYuMiBMIDQ5Mi4xIDQyNi4yIEMgNTA0LjMgNDIwLjEgNTEyIDQwNy42IDUxMiAzOTQgViAyODMuOSBDIDUxMiAyNjguOSA1MDIuNyAyNTUuNSA0ODguNiAyNTAuMiBaIE0gMzU4IDIxNC44IEwgMjczIDI0Ni43IFYgMTc4LjUgTCAzNTggMTQxLjUgViAyMTQuOCBaIE0gMTU0IDEwNC4xIEwgMjU2IDY1LjkgTCAzNTggMTA0LjEgViAxMDQuNyBMIDI1NiAxNDYuMSBMIDE1NCAxMDQuNyBWIDEwNC4xIFogTSAyMzggMzk1LjIgTCAxNTMgNDM3LjcgViAzNTguNiBMIDIzOCAzMTkuOCBWIDM5NS4yIFogTSAyMzggMjgzLjIgTCAxMzYgMzI0LjYgTCAzNCAyODMuMiBWIDI4Mi42IEwgMTM2IDI0NC40IEwgMjM4IDI4Mi42IFYgMjgzLjIgWiBNIDQ3OCAzOTUuMiBMIDM5MyA0MzcuNyBWIDM1OC42IEwgNDc4IDMxOS44IFYgMzk1LjIgWiBNIDQ3OCAyODMuMiBMIDM3NiAzMjQuNiBMIDI3NCAyODMuMiBWIDI4Mi42IEwgMzc2IDI0NC40IEwgNDc4IDI4Mi42IFYgMjgzLjIgWiZxdW90Oyk7ZmlsbDpyZ2IoMjU1LCAyNTUsIDI1NSk7Zm9udC1zaXplOjQ4cHg7aGVpZ2h0OmF1dG87aW5saW5lLXNpemU6YXV0bztsaW5lLWhlaWdodDo1NS4ycHg7b3V0bGluZS1jb2xvcjpyZ2IoMjU1LCAyNTUsIDI1NSk7b3ZlcmZsb3cteDp2aXNpYmxlO292ZXJmbG93LXk6dmlzaWJsZTtwZXJzcGVjdGl2ZS1vcmlnaW46MHB4IDBweDt0ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LWRlY29yYXRpb246bm9uZSBzb2xpZCByZ2IoMjU1LCAyNTUsIDI1NSk7dGV4dC1kZWNvcmF0aW9uLWNvbG9yOnJnYigyNTUsIDI1NSwgMjU1KTt0cmFuc2Zvcm0tb3JpZ2luOjBweCAwcHg7d2lkdGg6YXV0bzstd2Via2l0LXRleHQtZW1waGFzaXMtY29sb3I6cmdiKDI1NSwgMjU1LCAyNTUpOy13ZWJraXQtdGV4dC1maWxsLWNvbG9yOnJnYigyNTUsIDI1NSwgMjU1KTstd2Via2l0LXRleHQtc3Ryb2tlLWNvbG9yOnJnYigyNTUsIDI1NSwgMjU1KTsiLz48L3N2Zz4=',
    'supports' => ['title', 'custom-fields']
  ]);
  register_taxonomy('block-categories', 'block', [
    'hierarchical' => true
  ]);
});

/**
 * Returns data needed to recreate a block inside of Midiblocks
 * /block/{id|slug|post_title}
 */
add_action('rest_api_init', function () {
  register_rest_route('midiblocks', '/block/(?P<id>[a-z0-9-_]+)/', [
    'methods' => 'GET',
    'args' => ['id'],
    'callback' => function ($request) {
      // Defaults
      $args = shortcode_atts([
        'id' => $request->get_param('id')
      ], $args);

      // Build the query
      $query = [
        'post_type' => 'block',
        'numberposts' => 1
      ];
      if (is_numeric($args['id'])) {
        $query['include'] = [intval($args['id'])];
      } else {
        $query['post_name__in'] = [$args['id']];
      }
      $posts = get_posts($query);

      // Build the response
      $json = ['blocks' => []];
      foreach ($posts as $post) {
        setup_postdata($post);

        $json['blocks'][] = [
          'title' => $post->post_title,
          'short_description' => get_post_meta($post->ID, 'short_description'),
          'block_definition' => get_post_meta($post->ID, 'block_definition'),
          'generator_stub' => get_post_meta($post->ID, 'generator_stub')
        ];
      }

      wp_reset_postdata();
      return $json;
    }
  ]);
});
