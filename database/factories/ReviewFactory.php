<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(\App\Review::class, function (Faker $faker) {
    return [
        'id'=> Str::uuid(),
        'content'=>$faker->sentences(5,true),
        'rating'=>random_int(1,5),
    ];
});
