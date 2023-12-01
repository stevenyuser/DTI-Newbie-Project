export default function CompanyPage({ params }: any) {
    const validUrls = ["OurBus", "C2C", "FlixBus"];
    // params.id
    
    return (
        <div>
            {!validUrls.includes(params.id as string) && 
                <div>
                    <h1>Invalid URL</h1>
                </div>
            }
        </div>
    )
}