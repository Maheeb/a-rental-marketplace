<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use function Symfony\Component\Translation\t;

class Review extends Model
{

    protected $fillable =['id','content','rating'];
    public function bookable()
    {
        return $this->belongsTo(Bookable::class);
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }


    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }

}
