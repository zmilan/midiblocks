<?php
class App_Boot {
  function __construct () {
    $this->data = [
      'mainNavPanel' => [
        'links' => $this->getMainNavPanelLinks()
      ],
      'user' => $this->getUser()
    ];
  }

  /**
   * Returns JSON
   * @param {*} $opts Options passed into json_encode
   * @see https://www.php.net/manual/en/function.json-encode.php
   */
  function getJSON ($opts) {
    return json_encode($this->data, $opts);
  }

  /**
   * Fetches main menu
   */
  function getMainNavPanelLinks () {
    $items = wp_get_nav_menu_items(get_nav_menu_locations()['mainNavPanel']);
    return array_map(function ($item) {
      return [
        'title' => $item->title,
        'description' => $item->description,
        'link' => $item->url,
        'icon' => implode(' ', $item->classes)
      ];
    }, $items);
  }

  /**
   * Fetches user info
   */
  function getUser () {
    return [
      'isLoggedIn' => is_user_logged_in()
    ];
  }
}