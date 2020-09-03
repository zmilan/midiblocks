<?php
class App_Boot {
  function __construct () {
    $this->data = [
      'mainNavPanel' => [
        'links' => $this->getMainNavPanelLinks()
      ]
    ];

    $json = json_encode($this->data);
    echo "<script>app = {boot: $json}</script>";
  }

  /**
   * Fetches main menu
   */
  function getMainNavPanelLinks () {
    $items = wp_get_nav_menu_items(get_nav_menu_locations()['mainNavPanel']);
    return array_map(function ($item) {
      return [
        'label' => $item->title,
        'description' => $item->description
      ];
    }, $items);
  }
}