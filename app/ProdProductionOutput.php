<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProdProductionOutput extends Model
{
    protected $fillable = [
    	'travel_sheet_id',
    	'travel_sheet_process_id',
		'jo_no',
		'unprocessed',
		'good',
		'rework',
		'scrap',
		'conver',
		'alloy_mix',
		'nc',
		'previous_process',
		'current_process',
		'output',
		'operator',
		'machine_no',
		'create_user',
		'update_user',
		'deleted',
		'delete_user',
		'deleted_at',
		'process_date',
		'operator_name'
	];
}
