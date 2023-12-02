'use client'

import { Metadata } from "next"
import BusCompanyHeader from "@/components/BusCompanyHeader";
import BusCompanyHighlights from "@/components/BusCompanyHighlights";
import BusCompanyReviews from "@/components/BusCompanyReviews";
import { useEffect, useState } from "react";
import { BusCompany } from "../../../../../common/types";

const validCompanies = ["OurBus", "C2C", "Flixbus", "Megabus"];

// export async function generateMetadata({ params }: any) {
//     const metadata: Metadata = {
//         title: `CUSoon - ${validCompanies.includes(params.id as string) ? params.id : "Invalid Company"}`,
//         description: 'Connecting Cornell to the world 🌎',
//     }

//     return metadata;
// }

async function getBusCompanyData(companyId: string): Promise<BusCompany | null> {
    const res = await fetch(`http://0.0.0.0:8080/api/companies/${companyId}`);
    const data = await res.json();

    const busCompany: BusCompany = data.data as BusCompany;

    if (busCompany === undefined) {
        return null;
    }

    console.log("bus company: " + JSON.stringify(busCompany));
    return busCompany;
}

// async function setBusCompanyReview() {

// }

export default function CompanyPage({ params }: any) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [busCompany, setBusCompany] = useState<BusCompany | null>(null);

    useEffect(() => {
        getBusCompanyData(params.id)
            .then((returnedBusCompany) => setBusCompany(returnedBusCompany))
            .then(() => setIsLoading(false));
    }, [])

    return (
        <main>
            {!validCompanies.includes(params.id as string) &&
                <div className="flex flex-col items-center bg-gray-200 pt-32">
                    <h1>Invalid URL</h1>
                </div>
            }

            {validCompanies.includes(params.id as string) && isLoading &&
                <div className="flex flex-col items-center bg-gray-200 pt-32">
                    <p className="pb-96">Loading...</p>
                </div>
            }

            {validCompanies.includes(params.id as string) && !isLoading && (busCompany === null || busCompany === undefined) &&
                <div className="flex flex-col items-center bg-gray-200 pt-32">
                    <h1>Error</h1>
                </div>
            }

            {validCompanies.includes(params.id as string) && !isLoading && !(busCompany === null || busCompany === undefined) &&
                <div className="">
                    <BusCompanyHeader company={busCompany as BusCompany} />
                    <BusCompanyHighlights company={busCompany as BusCompany} />
                    <div className="w-3/4 mx-auto py-10 border-t border-gray-300" />
                    <BusCompanyReviews company={busCompany as BusCompany} />
                </div>
            }

        </main>
    )
}


