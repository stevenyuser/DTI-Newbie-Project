import { BusCompany, BusCompanyEnum } from "../../../common/types";
import { LinkIcon } from "@heroicons/react/24/outline";
import Rating from '@mui/material/Rating';
import Link from "next/link";

interface BusCompanyCardProps {
    company: BusCompany;
}

export default function BusCompanyCard({ company }: BusCompanyCardProps) {
    return (
        <div>
            <Link href={`/companies/${company.id}`} className="">

                <div className="w-full rounded-xl bg-white px-4 py-6 md:px-6 md:py-7 shadow hover:bg-gray-50">

                    <div className="flex flex-row justify-between space-x-10">

                        <div className="flex flex-col justify-center space-x-2 space-y-2">

                            <div className="text-xl font-bold flex flex-row items-center space-x-1 ml-2">
                                <p>{company.name}</p>
                            </div>

                            <div className="text-sm flex flex-row items-center space-x-1 ml-1">
                                <Rating name="read-only" value={company.averageRating} readOnly precision={0.5} />
                                <p className="font-semibold">({Number(company.averageRating).toFixed(1)})</p>
                                <p>{company.numReviews} reviews</p>
                            </div>

                            <div className="text-sm flex flex-row items-center space-x-1 ml-1">
                                <p>{company.description}</p>
                            </div>


                        </div>

                        <div className="w-48">
                            <img className="cover-full" src={`/assets/${company.id}_logo.png`} alt="" />
                        </div>

                    </div>

                </div>

            </Link>
        </div>

    )
}