'use client'

import { useEffect, useState } from "react";
import { BusCompany, Review } from "../../../common/types";
import ReviewCard from "./ReviewCard";
import Link from "next/link";

interface BusCompanyReviewsProps {
    company: BusCompany;
}

async function getBusCompanyReviews(companyId: string) {
    const res = await fetch(`http://0.0.0.0:8080/api/reviews/${companyId}/all`);
    const data = await res.json();

    const busCompanyReviews: { [key: string]: Review } = data.data as { [key: string]: Review };

    if (busCompanyReviews === undefined) {
        return {};
    }

    console.log("reviews: " + JSON.stringify(busCompanyReviews));
    return busCompanyReviews;
}

export default function BusCompanyReviews({ company }: BusCompanyReviewsProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [reviews, setReviews] = useState<{ [key: string]: Review }>({});

    useEffect(() => {
        findReviews();
    }, []);

    const findReviews = () => {
        getBusCompanyReviews(company.id)
            .then((returnedReviews) => setReviews(returnedReviews))
            .then(() => setIsLoading(false));
    }

    return (
        <div className="w-full pb-20">

            <div className="w-3/4 mx-auto flex flex-col">
                {isLoading && <p>Loading reviews...</p>}

                <div className="space-y-10">
                    <div className="flex flex-row justify-between items-center">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-extrabold text-gray-900">Reviews</h2>
                            <p className="font-medium text-gray-900">Read user reviews from the Cornell community.</p>
                        </div>

                        <div>
                        <Link className="inline-flex items-center p-4 border border-gray-300 shadow-sm text-lg leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" href="/reviews/new">
                            Write a review
                        </Link>
                        </div>
                    </div>

                    {!isLoading && Object.values(reviews).length === 0 &&
                        <span className="block border-2 border-gray-300 border-dashed rounded-lg p-12 text-center">
                            <p>No reviews yet!</p>
                        </span>
                    }

                    <div>
                        <ul role="list" className="space-y-3 py-12">
                            {!isLoading &&
                                Object.values(reviews).map((review) => {
                                    return <ReviewCard review={review} />
                                    
                                })
                            }
                        </ul>
                    </div>

                </div>


            </div>



        </div>
    )
}