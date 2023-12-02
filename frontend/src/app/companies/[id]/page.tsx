'use client'

import { Metadata } from "next"
import BusCompanyHeader from "@/components/BusCompanyHeader";
import BusCompanyHighlights from "@/components/BusCompanyHighlights";
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
                <div>
                    <h1>Invalid URL</h1>
                </div>
            }

            {validCompanies.includes(params.id as string) && isLoading &&
                <div>
                    <h1>Loading...</h1>
                </div>
            }

            {validCompanies.includes(params.id as string) && !isLoading && (busCompany===null || busCompany === undefined) &&
                <div>
                    <h1>Error</h1>
                </div>
            }

            {validCompanies.includes(params.id as string) && !isLoading && !(busCompany===null || busCompany === undefined) &&
                <div className="">
                    <BusCompanyHeader company={busCompany as BusCompany} />
                    <BusCompanyHighlights company={busCompany as BusCompany} />
                </div>
            }

        </main>
    )
}


