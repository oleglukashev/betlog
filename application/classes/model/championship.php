<?php defined('SYSPATH') OR die('No direct access allowed.');

class Model_Championship extends ORM
{
    protected $_table_name = 'championship';

    protected $_primary_val  = 'name';

    protected $_table_columns = array(
        'id' => array('type' => 'int'),
        'sport_id' => array('type' => 'int'),
        'name' => array('type' => 'string')
    );

    protected $_belongs_to = array(
        'sports' => array('model' => 'sports', 'foreign_key' => 'sport_id')
    );

    protected $_has_many = array(
        'match' => array('model' => 'match', 'foreign_key' => 'championship_id')
    );

    protected $_created_column = array('column' => 'created_at', 'format' => 'Y-m-d H:i:s');
    protected $_updated_column = array('column' => 'updated_at', 'format' => 'Y-m-d H:i:s');
}
