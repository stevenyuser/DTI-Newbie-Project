'use client'

import { useState } from "react";
import { Review } from "../../../../../common/types";
import { useRouter, useSearchParams } from "next/navigation";
import Rating from "@mui/material/Rating";

export default function CreateReviewPage() {
    const router = useRouter();

    const searchParams = useSearchParams();

    const busCompany = searchParams.get("busCompany");

    const [rating, setRating] = useState<number>(0);

    const [review, setReview] = useState<Review>({
        busCompanyId: busCompany ?? "C2C",
        userName: "",
        title: "",
        reviewText: "",
        rating: 0,
        rideDate: null,
        ridePrice: null,
        rideOrigin: null,
        rideDestination: null,
        reviewDateTime: new Date().toISOString()
    });

    const createReview = async (e: any) => {
        // source: https://stackoverflow.com/questions/71961539/router-push-is-not-working-as-expected-nextjs
        e.preventDefault()

        console.log("CREATING REVIEW: " + review);

        await fetch("http://0.0.0.0:8080/api/reviews/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        });

        // router.push("/");
        router.back();
    }

    return (
        <main>
            <div className="w-3/4 mx-auto py-10">

                <form className="space-y-8 divide-y divide-gray-50" onSubmit={createReview}>
                    <div className="space-y-8 divide-y divide-gray-200">

                        <div>
                            <h1 className="text-4xl leading-6 font-bold text-gray-900">Add new review</h1>
                        </div>

                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Trip Info</h3>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                                <div className="col-span-1">
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                        Bus Company
                                    </label>
                                    <select
                                        id="company"
                                        name="company"
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        defaultValue={busCompany}
                                        onChange={(e) => {
                                            let newReview = review;
                                            newReview.busCompanyId = e.target.value;
                                            console.log(newReview);
                                            setReview(newReview);
                                        }}
                                    >
                                        <option>C2C</option>
                                        <option>OurBus</option>
                                        <option>Megabus</option>
                                        <option>Flixbus</option>
                                    </select>
                                </div>

                                <div className="col-span-1">
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                        Ticket Price
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="0.00"
                                            aria-describedby="price-currency"
                                            onChange={(e) => {
                                                let newReview = review;
                                                newReview.ridePrice = isNaN(Number(e.target.value)) ? null : Number(e.target.value);
                                                console.log(newReview);
                                                setReview(newReview);
                                            }}
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm" id="price-currency">
                                                USD
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
                                        Departure City
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="origin"
                                            id="origin"
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={(e) => {
                                                let newReview = review;
                                                newReview.rideOrigin = e.target.value;
                                                console.log(newReview);
                                                setReview(newReview);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                                        Arrival City
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="destination"
                                            id="destination"
                                            autoComplete=""
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={(e) => {
                                                let newReview = review;
                                                newReview.rideDestination = e.target.value;
                                                console.log(newReview);
                                                setReview(newReview);
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Review Info</h3>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                                <div className="sm:col-span-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Rating
                                    </label>
                                    <div className="mt-1">
                                        <Rating
                                            name="simple-controlled"
                                            value={rating}
                                            onChange={(event, newValue) => {

                                                let newReview = review;
                                                newReview.rating = newValue ?? 0;
                                                console.log(newReview);
                                                setReview(newReview);
                                                setRating(newValue ?? 0);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4" />

                                <div className="sm:col-span-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="name"
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={(e) => {
                                                let newReview = review;
                                                newReview.userName = e.target.value;
                                                console.log(newReview);
                                                setReview(newReview);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Review Title
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="title"
                                            name="title"
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            onChange={(e) => {
                                                let newReview = review;
                                                newReview.title = e.target.value;
                                                console.log(newReview);
                                                setReview(newReview);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                                        Review Body
                                    </label>
                                    <p className="mt-1 text-sm text-gray-500">Possible considerations: comfort, amenities, timeliness, cleanliness, etc.</p>
                                    <div className="mt-1">
                                        <textarea
                                            id="body"
                                            name="body"
                                            rows={3}
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                            defaultValue={''}
                                            onChange={(e) => {
                                                let newReview = review;
                                                newReview.reviewText = e.target.value;
                                                console.log(newReview);
                                                setReview(newReview);
                                            }}
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>


                        <button type="submit" className="inline-flex items-center p-4 border border-gray-300 shadow-sm text-lg leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Submit
                        </button>



                    </div>
                </form>
            </div>
        </main>
    )
}