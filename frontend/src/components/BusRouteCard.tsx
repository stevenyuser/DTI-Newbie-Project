import { BusRoute, BusCompanyEnum } from "../../../common/types";
import { ArrowLongRightIcon, CalendarIcon, ClockIcon, TicketIcon } from "@heroicons/react/24/outline";
import { formatDate, formatTime, urlCompanyFormat } from "@/utils/helper.utils";
import Link from "next/link";
import Rating from '@mui/material/Rating';

interface BusRouteCardProps {
    busRoute: BusRoute;
}

export default function BusRouteCard({ busRoute }: BusRouteCardProps) {
    return (
        <div className='w-full rounded-xl px-4 py-6 md:px-6 md:py-7 bg-white'>

            <div className="flex flex-row justify-between">

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
                </div>

                <div className="flex flex-col justify-center items-center space-x-2 space-y-2">
                    
                    <p className="text-lg">{busRoute.busCompany}</p>

                    <Rating name="read-only" value={4.5} readOnly precision={0.5} />
                    
                    <Link href={`/companies/${urlCompanyFormat(busRoute.busCompany as BusCompanyEnum)}`}>LINK</Link>
                </div>

            </div>
        </div>
    );
}