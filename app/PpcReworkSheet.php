<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PpcReworkSheet extends Model
{
    protected $fillable = [
    	'jo_no',
    	'prod_code',
    	'description',
        'based_qty',
        'rework_qty',
        'from_process',
        'div_code',
        'date_created',
        'status',
        'create_user',
    	'update_user',
    ];                                                                            

    public function issued_qty()
    {
    	return $this->hasMany('App\PpcReworkSheetProducts','rework_sheet_id');
    }

    public function process()
    {
    	return $this->hasMany('App\PpcReworkSheetProcess','rework_sheet_id');
    }
}
