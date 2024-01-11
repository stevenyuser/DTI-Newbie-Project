'use client'

import React, { useEffect, useState } from "react";
import BusCompanyCard from "../../components/BusCompanyCard";
import { BusCompany, BusCompanyEnum } from "../../../../common/types";

async function getAllBusCompanies() {
    const res = await fetch("http://0.0.0.0:8080/api/companies");
    const data = await res.json();

    const busCompanies: { [key: string]: BusCompany } = data.data as { [key: string]: BusCompany };

    if (busCompanies === undefined) {
        return {};
    }

    console.log("bus companies: " + JSON.stringify(busCompanies));
    return busCompanies;
}

export default function Companies() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [busCompanies, setBusCompanies] = useState<{ [key: string]: BusCompany }>({});

    useEffect(() => {
        findAllBusCompanies();
    }, []);

    const findAllBusCompanies = () => {
        getAllBusCompanies()
            .then((returnedBusCompanies) => setBusCompanies(returnedBusCompanies))
            .then(() => setIsLoading(false));
    }

    return (
        <main>
            <div className="flex flex-col items-center bg-gray-200 space-y-12 overflow-y-auto flex-1">

                <h1 className="inline-flex font-serifPro text-3xl pt-20 font-bold">Browse Bus Companies</h1>
                <p className="text-md mt-2 font-medium text-base-content/80">Compare bus services, prices, and reviews to find the provider that fits your needs 🚌</p>

                {isLoading && <p className="pb-64">Loading...</p>}

                <div className="pb-20 w-1/2">
                    <ul role="list" className="space-y-3">
                        {!isLoading &&
                            Object.values(busCompanies).map((busCompany) => {
                                return <BusCompanyCard key={busCompany.id} company={busCompany} />
                            })
                        }
                    </ul>
                </div>
                
            </div>
        </main>
    )
}