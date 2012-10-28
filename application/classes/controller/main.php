<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Main extends Controller_Template {

    public $template = "main";

	public function action_index()
	{
		$this->template->sport_list = ORM::factory('sport')->find_all();
	}

} // End Welcome
