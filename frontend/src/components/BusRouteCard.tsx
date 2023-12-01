import { BusRoute } from "../../../common/types";
import { ArrowLongRightIcon, CalendarIcon, ClockIcon, TicketIcon } from "@heroicons/react/24/outline";
import { formatDate, formatTime } from "@/utils/helper.utils";

interface BusRouteCardProps {
    busRoute: BusRoute;
}

export default function BusRouteCard({ busRoute }: BusRouteCardProps) {
    return (
        <div className='w-full rounded-xl px-4 py-6 md:px-6 md:py-7 bg-white'>
            <div className="flex flex-col justify-center space-x-2 space-y-2">

                <div className="text-xl font-bold flex flex-row items-center space-x-1 ml-2">
                    <p>{busRoute.origin}</p>
                    <ArrowLongRightIcon className='h-5 w-5' />
                    <p>{busRoute.destination}</p>
                </div>

                <div className="text-sm flex flex-row items-center space-x-1 ml-1">
                    <CalendarIcon className='h-5 w-5' />
                    <p>{formatDate(new Date(busRoute.startTime))}</p>
                </div>

                <div className="text-sm flex flex-row items-center space-x-1 ml-1">
                    <ClockIcon className='h-5 w-5' />
                    <p>{formatTime(new Date(busRoute.startTime))}</p>
                    <p className='mx-1'>-</p>
                    <p>{formatTime(new Date(busRoute.endTime))}</p>
                </div>

                <div className="text-sm flex flex-row items-center space-x-1 ml-1">
                    <TicketIcon className='h-5 w-5' />
                    <p>{busRoute.numSeats} seats remaining</p>
                </div>

                <div className="text-xl font-bold flex flex-row items-center space-x-1 ml-1">
                    <p>${busRoute.price}</p>
                </div>
                
                
                {/* <img className="inline h-auto max-w-full" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="image description"/> */}

                
            </div>

            {/* <button className={"relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-2xl font-small text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"}>
                <p>hello</p>
            </button> */}
            {/* <button onClick={() => setIthToNyc(!ithToNyc)} className={"relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-2xl font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"}>

            <span className="relative flex flex-row items-center space-x-2">
              <p>{ithToNyc ? "Ithaca " : "NYC "}</p>
              <ArrowsRightLeftIcon className="h-6 w-6" />
              <p>{ithToNyc ? " NYC" : " Ithaca"}</p>
            </span>

          </button> */}

            {/* <div className='flex flex-row justify-center items-center space-x-2'>
                <ClockIcon className='h-5 w-5' />
                <p className='font-bold text-xl'>{busRoute.startTime}</p>
                <ArrowLongRightIcon className='h-5 w-5' />
                <p className='font-bold text-xl'>{busRoute.endTime}</p>
            </div>
            <div className='flex flex-row justify-center items-center space-x-2'>
                <p className='font-bold text-xl'>{busRoute.origin}</p>
                <ArrowLongRightIcon className='h-5 w-5' />
                <p className='font-bold text-xl'>{busRoute.destination}</p>
            </div>

            <div className='flex flex-row justify-center items-center space-x-2'>
                <p className='font-bold text-xl'>{busRoute.numSeats} seats</p>
            </div> */}
        </div>
    );
}