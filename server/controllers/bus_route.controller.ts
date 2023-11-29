import { GeneralLocations, C2CLocations, OurBusLocations } from "../../common/types";
import { scrapeC2C, scrapeOurBus } from "../services/scraping.service";

export const getAllBusRoutes = async (origin: GeneralLocations, destination: GeneralLocations, date: Date) => {
    if(origin === GeneralLocations.Ithaca && destination == GeneralLocations.NYC) { // ITH -> NYC
        let [ourbusDataFortLee, ourbusDataNYC] = await Promise.all([
            scrapeOurBus(OurBusLocations.Ithaca, OurBusLocations.FortLee, date),
            scrapeOurBus(OurBusLocations.Ithaca, OurBusLocations.NYC, date)
        ]);
        let ourbusData = ourbusDataFortLee.concat(ourbusDataNYC);
        
        let c2cData = await scrapeC2C(C2CLocations.IthacaNorthCampus, C2CLocations.NYCCornellClub, date);
        
        
    } else { // NYC -> ITH
        scrapeC2C(C2CLocations.NYCCornellClub, C2CLocations.IthacaNorthCampus, date)
    }
};