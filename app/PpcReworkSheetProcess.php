<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PpcReworkSheetProcess extends Model
{
    protected $fillable = [
    	'rework_sheet_id',
        'jo_no',
		'set',
		'process_name',
        'sequence',
        'remarks',
		'div_code',
		'create_user',
		'update_user',
    ];

    public function rework_sheet()
    {
        return $this->belongsTo('App\PpcRework', 'rework_sheet_id');
    }
}
    