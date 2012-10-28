<?php defined('SYSPATH') OR die('No direct access allowed.');

class Model_Match extends ORM
{
    protected $_table_name = 'match';

    protected $_table_columns = array(
        'id' => array('type' => 'int'),
        'championship_id' => array('type' => 'int'),
        'team1' => array('type' => 'string'),
        'team2' => array('type' => 'string'),
        'date' => array('type' => 'string'),
        'place' => array('type' => 'string')
    );

    protected $_belongs_to = array(
        'championship' => array('model' => 'championship', 'foreign_key' => 'championship_id')
    );

    protected $_created_column = array('column' => 'created_at', 'format' => 'Y-m-d H:i:s');
    protected $_updated_column = array('column' => 'updated_at', 'format' => 'Y-m-d H:i:s');
}
