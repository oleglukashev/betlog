<?php defined('SYSPATH') OR die('No direct access allowed.');

class Model_Sport extends ORM
{
    protected $_table_name = 'sport';

    protected $_primary_val  = 'name';

    protected $_table_columns = array(
        'id' => array('type' => 'int'),
        'name' => array('type' => 'string')
    );

    protected $_has_many = array(
        'championship' => array('model' => 'championship', 'foreign_key' => 'sport_id')
    );

    protected $_created_column = array('column' => 'created_at', 'format' => 'Y-m-d H:i:s');
    protected $_updated_column = array('column' => 'updated_at', 'format' => 'Y-m-d H:i:s');

    public function getCountChildrens() {
        return $this->championship->count_all();
    }

    public function getChampionshipList() {
        return $this->championship->find_all();
    }
}
