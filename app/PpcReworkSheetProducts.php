<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PpcReworkSheetProducts extends Model
{
    protected $fillable = [
    	'rework_sheet_id',
        'jo_no',
    	'prod_code',
    	'issued_qty_per_sheet',
        'sc_no',
        'jo_sequence',
    	'create_user',
    	'update_user'
    ];

    public function pre_travel_sheet()
    {
        return $this->belongsTo('App\PpcReworkSheet', 'rework_sheet_id');
    }
}
