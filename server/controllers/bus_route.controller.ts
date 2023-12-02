import { GeneralLocations, C2CLocations, OurBusLocations, BusRoute, MegabusLocations, FlixbusLocations } from "../../common/types";
import { scrapeC2C, scrapeFlixbus, scrapeMegabus, scrapeOurBus } from "../services/scraping.service";

export const getBusRoutes = async (origin: GeneralLocations, destination: GeneralLocations, date: Date) => {
    let ourbusData, c2cData, megabusData, flixbusData: BusRoute[];

    if(origin === GeneralLocations.Ithaca as GeneralLocations && destination === GeneralLocations.NYC) { // ITH -> NYC
        let [ourbusDataFortLee, ourbusDataNYC] = await Promise.all([
            scrapeOurBus(OurBusLocations.Ithaca, OurBusLocations.FortLee, date),
            scrapeOurBus(OurBusLocations.Ithaca, OurBusLocations.NYC, date)
        ]);
        ourbusData = ourbusDataFortLee.concat(ourbusDataNYC);
        
        c2cData = await scrapeC2C(C2CLocations.IthacaNorthCampus, C2CLocations.NYCCornellClub, date);

        megabusData = await scrapeMegabus(MegabusLocations.Ithaca, MegabusLocations.NYC, date);

        flixbusData = await scrapeFlixbus(FlixbusLocations.Ithaca, FlixbusLocations.NYC, date);

    } else { // NYC -> ITH
        let [ourbusDataFortLee, ourbusDataNYC] = await Promise.all([
            scrapeOurBus(OurBusLocations.FortLee, OurBusLocations.Ithaca, date),
            scrapeOurBus(OurBusLocations.NYC, OurBusLocations.Ithaca, date)
        ]);
        ourbusData = ourbusDataFortLee.concat(ourbusDataNYC);
        
        c2cData = await scrapeC2C(C2CLocations.NYCCornellClub, C2CLocations.IthacaNorthCampus, date);

        megabusData = await scrapeMegabus(MegabusLocations.NYC, MegabusLocations.Ithaca, date);

        flixbusData = await scrapeFlixbus(FlixbusLocations.NYC, FlixbusLocations.Ithaca, date);

    }

    const busRoutes: BusRoute[] = ourbusData.concat(c2cData).concat(megabusData).concat(flixbusData);

    if (busRoutes === undefined) {
        return [];
    }
    
    return busRoutes;
};