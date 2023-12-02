import { Review } from "../../../common/types";
import Rating from '@mui/material/Rating';
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";


interface ReviewCardProps {
    review: Review;
}
export default function ReviewCard({ review }: ReviewCardProps) {
    return (

        <div className="w-full rounded-xl bg-white px-4 py-6 md:px-6 md:py-7 shadow">


            <div className="flex flex-col justify-center space-x-1 space-y-2">

                <div className="flex flex-row space-x-1 ml-2 text-md items-center">
                    <UserCircleIcon className="h-8 w-8" />
                    <p>{review.userName}</p>
                </div>

                <div className="flex flex-row space-x-2 ml-2 text-xl font-bold items-center">
                    <Rating name="read-only" value={review.rating} readOnly precision={0.5} />
                    <p className="">{review.title}</p>
                </div>

                <p className="text-sm flex flex-row items-center space-x-1 ml-1 text-slate-500">Posted on {new Date(review.reviewDateTime).toLocaleDateString("en-US", { month: "long", "day": "numeric", "year": "numeric" })}</p>

                {!(review.rideDate === null && review.ridePrice === null && review.rideOrigin === null && review.rideDestination === null) &&
                <div className="text-sm flex flex-row ml-1 divide-x-2 divide-solid divide-slate-500 text-slate-500">
                    <p className="px-2 first:pl-0">Ride Date: {review.rideDate}</p>
                    <p className="px-2">Price: ${review.ridePrice}</p>
                    <p className="px-2 last:pr-0">
                        {review.rideOrigin} 
                        <ArrowLongRightIcon className="h-5 w-5 inline-block mx-1" />
                        {review.rideDestination}
                    </p>
                </div>
                }

                <p className="text-md font-normal text-ellipsis overflow-hidden">{review.reviewText}</p>

            </div>



        </div>
    )
}