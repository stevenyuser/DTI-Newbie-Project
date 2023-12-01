import { Metadata } from "next"

const validCompanies = ["OurBus", "C2C", "FlixBus", "MegaBus"];

export async function generateMetadata({ params }: any) {
    const metadata: Metadata = {
        title: `CUSoon - ${validCompanies.includes(params.id as string) ? params.id : "Invalid Company"}`,
        description: 'Connecting Cornell to the world 🌎',
    }

    return metadata;
}

export default function CompanyPage({ params }: any) {
    
    return (
        <main>
            <div>
                {!validCompanies.includes(params.id as string) && 
                    <div>
                        <h1>Invalid URL</h1>
                    </div>
                }
            </div>
        </main>
    )
}