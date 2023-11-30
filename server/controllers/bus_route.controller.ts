import { GeneralLocations, C2CLocations, OurBusLocations, BusRoute } from "../../common/types";
import { scrapeC2C, scrapeOurBus } from "../services/scraping.service";

export const getBusRoutes = async (origin: GeneralLocations, destination: GeneralLocations, date: Date) => {
    let ourbusData, c2cData: BusRoute[];

    if(origin === GeneralLocations.Ithaca as GeneralLocations && destination === GeneralLocations.NYC) { // ITH -> NYC
        let [ourbusDataFortLee, ourbusDataNYC] = await Promise.all([
            scrapeOurBus(OurBusLocations.Ithaca, OurBusLocations.FortLee, date),
            scrapeOurBus(OurBusLocations.Ithaca, OurBusLocations.NYC, date)
        ]);
        ourbusData = ourbusDataFortLee.concat(ourbusDataNYC);
        
        c2cData = await scrapeC2C(C2CLocations.IthacaNorthCampus, C2CLocations.NYCCornellClub, date);
    } else { // NYC -> ITH
        let [ourbusDataFortLee, ourbusDataNYC] = await Promise.all([
            scrapeOurBus(OurBusLocations.FortLee, OurBusLocations.Ithaca, date),
            scrapeOurBus(OurBusLocations.NYC, OurBusLocations.Ithaca, date)
        ]);
        ourbusData = ourbusDataFortLee.concat(ourbusDataNYC);
        
        c2cData = await scrapeC2C(C2CLocations.NYCCornellClub, C2CLocations.IthacaNorthCampus, date);
    }

    const busRoutes: BusRoute[] = ourbusData.concat(c2cData);

    return busRoutes;
};