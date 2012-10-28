<?php defined('SYSPATH') OR die('No direct access allowed.');

class Model_Coefficient extends ORM
{
    protected $_table_name = 'coefficient';

    protected $_table_columns = array(
        'id' => array('type' => 'int'),
        'match_id' => array('type' => 'int'),
        'bk_id' => array('type' => 'int'),
        'first' => array('type' => 'string'),
        'draw' => array('type' => 'string'),
        'second' => array('type' => 'string')
    );

    protected $_belongs_to = array(
        'match' => array('model' => 'match', 'foreign_key' => 'match_id')
    );

    protected $_created_column = array('column' => 'created_at', 'format' => 'Y-m-d H:i:s');
    protected $_updated_column = array('column' => 'updated_at', 'format' => 'Y-m-d H:i:s');
}
