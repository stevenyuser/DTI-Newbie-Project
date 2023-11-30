'use client'

import React, {useEffect, useState} from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 

import { GeneralLocations, BusRoute } from "../../../common/types";

async function getBusRoutes(origin: GeneralLocations, destination: GeneralLocations, date: Date) {
  const dateString = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(date);

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

  return busRoutes;
};

type CalendarDateType = {
  startDate: Date;
  endDate: Date;
};

export default function Home() {
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);

  const [ithToNyc, setIthToNyc] = useState<boolean>(true);

  // have to use startDate because of Picker
  const [calendarDate, setCalendarDate] = useState<CalendarDateType>({ 
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now())
  }); 

  const handleCalendarDateChange = (unformattedCalendarDate: any) => {
    // console.log("new date:", unformattedCalendarDate);
    const newCalendarDate: CalendarDateType = {
      startDate: new Date(unformattedCalendarDate.startDate),
      endDate: new Date(unformattedCalendarDate.endDate)
    }
    setCalendarDate(newCalendarDate);
  };

  useEffect(() => {
    getBusRoutes(ithToNyc ? GeneralLocations.Ithaca: GeneralLocations.NYC, ithToNyc ? GeneralLocations.NYC : GeneralLocations.Ithaca, calendarDate.startDate)
      .then((returnedRoutes) => setBusRoutes(returnedRoutes))
  }, [calendarDate, ithToNyc]);


  return (
    <main>
      <div>
        <Datepicker 
        useRange={false} 
        asSingle={true} 
        value={calendarDate} 
        onChange={handleCalendarDateChange} 
        displayFormat={"MM/DD/YYYY"}
        minDate={new Date(Date.now())}
        /> 

        <button
          onClick={() => setIthToNyc(!ithToNyc)}
        >{ithToNyc ? "ITHACA TO NYC" : "NYC TO ITHACA"}
        </button>

        {
          busRoutes.map((busRoute) => {
            return <p>{busRoute.numSeats + busRoute.busCompany}</p>
            // bus route card
          })
        }
      </div>
    </main>
  )
}
