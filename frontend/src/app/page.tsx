'use client'

import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import { GeneralLocations, BusRoute } from "../../../common/types";

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

  console.log(busRoutes);

  if(busRoutes === undefined) {
    return [];
  }

  return busRoutes;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);

  const [ithToNyc, setIthToNyc] = useState<boolean>(true);

  // have to use startDate to get the singular date because of Datepicker
  // use dates in MM/DD/YYYY format
  const [calendarDate, setCalendarDate] = useState<{startDate: string, endDate: string}>({
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
    const newCalendarDate: {startDate: string, endDate: string} = {
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
  }, []);

  const findRoutes = () => {
    setIsLoading(true);

    getBusRoutes(ithToNyc ? GeneralLocations.Ithaca : GeneralLocations.NYC, ithToNyc ? GeneralLocations.NYC : GeneralLocations.Ithaca, calendarDate.startDate)
      .then((returnedRoutes) => setBusRoutes(returnedRoutes))
      .then(() => setIsLoading(false));
  }


  return (
    <main>
      <div className="items-center justify-center">
        <Datepicker
          inputClassName={""}
          containerClassName={"items-center"}
          useRange={false}
          asSingle={true}
          value={calendarDate}
          onChange={handleCalendarDateChange}
          displayFormat={"MM/DD/YYYY"}
          minDate={new Date(Date.now())}
        />


        <button onClick={() => setIthToNyc(!ithToNyc)}>{ithToNyc ? "ITHACA TO NYC" : "NYC TO ITHACA"}</button>

        <button onClick={findRoutes} className="p-10">Find Routes</button>

        {isLoading && <p>Loading...</p>}

        {!isLoading &&
          busRoutes.map((busRoute) => {
            return <p>{busRoute.numSeats + busRoute.busCompany + busRoute.startTime}</p>
            // bus route card
          })
        }
      </div>
    </main>
  )
}
