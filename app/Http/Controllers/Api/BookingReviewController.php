<?php

namespace App\Http\Controllers\Api;

use App\Booking;
use App\Http\Controllers\Controller;
use App\Http\Resources\BookingByreviewShowResource;
use Illuminate\Http\Request;

class BookingReviewController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return Booking
     */
    public function __invoke($reviewKey, Request $request)
    {
//        return Booking::findByReviewKey($reviewKey) ?? abort(404);
//        return abort(500);
        $booking = Booking::findByReviewKey($reviewKey);

        return $booking?  new BookingByreviewShowResource($booking) : abort(404);

    }
}
