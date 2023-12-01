'use client'

import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import { GeneralLocations, BusRoute, BusCompanyEnum } from "../../../common/types";

import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import BusRouteCard from "@/components/BusRouteCard";
import { urlCompanyFormat } from "@/utils/helper.utils";

async function getAverageRating(busCompany: BusCompanyEnum) {
  const res = await fetch(`http://0.0.0.0:8080/api/companies/${urlCompanyFormat(busCompany)}/averageRating/`);
  const data = await res.json();
  const averageRating: number = data.data;

  if (averageRating === undefined) {
    return 0;
  }

  console.log(urlCompanyFormat(busCompany) + "'s rating: " + averageRating);

  return averageRating;
}

async function getAllAverageRatings(): Promise<{ [key: string]: number }> {
  const busCompanies: BusCompanyEnum[] = [BusCompanyEnum.C2C, BusCompanyEnum.OurBus, BusCompanyEnum.FlixBus]

  const averageRatings = {
    "C2C": await getAverageRating(BusCompanyEnum.C2C),
    "OurBus": await getAverageRating(BusCompanyEnum.OurBus),
    "FlixBus": await getAverageRating(BusCompanyEnum.FlixBus)
  }

  console.log(averageRatings);

  return averageRatings;
}

async function getBusRoutes(origin: GeneralLocations, destination: GeneralLocations, dateString: string) {
  // const dateString = new Intl.DateTimeFormat("en-US", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit"
  // }).format(date);

  console.log("DateString: " + dateString);

  const res = await fetch("http://0.0.0.0:8080/api/routes", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "origin": origin,
      "destination": destination,
      "date": dateString
    })
  })

  const data = await res.json();

  const busRoutes: BusRoute[] = data.data as BusRoute[];

  if (busRoutes === undefined) {
    return [];
  }
  
  return busRoutes;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);

  const [ithToNyc, setIthToNyc] = useState<boolean>(true);

  const[averageRatings, setAverageRatings] = useState<{ [key: string]: number }>({})

  // have to use startDate to get the singular date because of Datepicker
  // use dates in MM/DD/YYYY format
  const [calendarDate, setCalendarDate] = useState<{ startDate: string, endDate: string }>({
    startDate: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(Date.now()),
    endDate: new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(Date.now())
  });

  const handleCalendarDateChange = (unformattedCalendarDate: any) => {
    console.log("unformatted date:", unformattedCalendarDate);

    // format datepicker date to MM/DD/YYYY
    const newCalendarDate: { startDate: string, endDate: string } = {
      startDate: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(new Date(unformattedCalendarDate.startDate).getTime() + 60 * 60 * 24 * 1000),
      endDate: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).format(new Date(unformattedCalendarDate.endDate).getTime() + 60 * 60 * 24 * 1000)
    }
    console.log("formatted new date:", newCalendarDate);
    setCalendarDate(newCalendarDate);
  };

  useEffect(() => {
    findRoutes();
    findAverageRatings();
  }, []);

  const findRoutes = () => {
    setIsLoading(true);

    getBusRoutes(ithToNyc ? GeneralLocations.Ithaca : GeneralLocations.NYC, ithToNyc ? GeneralLocations.NYC : GeneralLocations.Ithaca, calendarDate.startDate)
      .then((returnedRoutes) => setBusRoutes(returnedRoutes))
      .then(() => setIsLoading(false));
  }

  const findAverageRatings = () => {
    getAllAverageRatings()
      .then((ratings) => setAverageRatings(ratings));
  }
  
  return (
    <main>
      <div className="flex flex-col items-center bg-gray-200 space-y-12 overflow-y-auto flex-1 h-screen">

        <h1 className="inline-flex font-serifPro text-4xl pt-20 font-bold">CUSoon!</h1>

        <p className="text-md mt-2 pt-3 font-medium text-base-content/80">Connecting Cornell to the world.</p>


        {/* search bar */}
        <span className="relative z-10 inline-flex shadow-sm rounded-md">


          <button onClick={() => setIthToNyc(!ithToNyc)} className={"relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-2xl font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"}>

            <span className="relative flex flex-row items-center space-x-2">
              <p>{ithToNyc ? "Ithaca " : "NYC "}</p>
              <ArrowsRightLeftIcon className="h-6 w-6" />
              <p>{ithToNyc ? " NYC" : " Ithaca"}</p>
            </span>

          </button>


          <Datepicker
            inputClassName={"-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-2xl font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"}
            containerClassName={"relative mt-0 z-20"}
            useRange={false}
            asSingle={true}
            value={calendarDate}
            onChange={handleCalendarDateChange}
            displayFormat={"MM/DD/YYYY"}
            minDate={new Date(Date.now())}
            popoverDirection="down"
            primaryColor="red"
          />

          <button onClick={findRoutes} className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-red-500 text-2xl font-medium text-white hover:bg-red-500 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500">Find Routes</button>
          

        </span>


        {isLoading && <p>Loading...</p>}

        <div className="pb-20 w-1/2">
          <ul role="list" className="space-y-3">
            {!isLoading &&
              busRoutes.map((busRoute) => {
                return <BusRouteCard busRoute={busRoute} rating={averageRatings[urlCompanyFormat(busRoute.busCompany as BusCompanyEnum)]}/>
                // bus route card
              })
            }
          </ul>
        </div>

        {!isLoading && busRoutes.length === 0 &&
          <span className="z-1 relative block w-1/2 border-2 border-gray-300 border-dashed rounded-lg p-12 text-center">
            <p>No rides found!</p>
            <p>Please select another date.</p>
          </span>
        }
      </div>
    </main>
  )
}
