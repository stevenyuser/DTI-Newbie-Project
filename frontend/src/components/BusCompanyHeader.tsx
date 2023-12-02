import Rating from "@mui/material/Rating";
import { BusCompany } from "../../../common/types";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface BusCompanyHeaderProps {
  company: BusCompany;
}

export default function BusCompanyHeader({ company }: BusCompanyHeaderProps) {
  return (
    <div className="relative w-full items-center justify-between">

      <img
        src={`/assets/${company.id}_cover.png`}
        alt=""
        className="w-full h-96 object-center object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black" />


      <div className="absolute inset-2 w-3/4 left-[12.5%] items-center justify-center pt-48 space-y-2">

        <div className="flex flex-row justify-between space-x-10">

          <div>
            <h1 className="text-8xl font-extrabold tracking-tight text-white sm:text-5xl">{company.name}</h1>

            <p className="text-md text-indigo-100 max-w-3xl">
              {company.description}
            </p>

            <Rating name="read-only" value={company.averageRating} readOnly precision={0.5} size="large"/>
          </div>


          <div className="pt-12">
            <a href={company.websiteUrl} target="_blank" className="h-12 inline-flex items-center px-6 py-3 border border-white shadow-sm text-base font-medium rounded-md text-white opacity-100 hover:bg-red-300 hover:bg-opacity-60 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Visit Site
              <ArrowTopRightOnSquareIcon className="ml-3 -mr-1 h-5 w-5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  )
}