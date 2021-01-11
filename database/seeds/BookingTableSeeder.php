<?php

use Illuminate\Database\Seeder;

class BookingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Bookable::all()->each(function (\App\Bookable $bookable){

            $booking = factory(\App\Booking::class)->make();
            $bookings = collect([$booking]);

            for ($i=0; $i< random_int(1,20);$i++){

                $from = (clone $booking->to)->addDays(random_int(1,14));
                $to = (clone $from)->addDays(random_int(0,14));

                $booking = \App\Booking::make([
                   'from'=>$from,
                   'to'=>$to,
                ]);
                $bookings->push($booking);
            }

            $bookable->bookings()->saveMany($bookings);


        });
    }
}
