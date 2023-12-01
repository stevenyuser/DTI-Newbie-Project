import { C2CLocations } from "../../common/types"

export const time12to24 = (timeString: string) => {
    const isPM = timeString.includes("PM");
    let hourString = timeString.split(":")[0];
    let minuteString = timeString.split(":")[1].substring(0, 2);

    if (isPM) {
        hourString = String(12 + Number(hourString));
    }

    if (hourString.length == 1) {
        hourString = "0" + hourString;
    }
    
    return hourString + ":" + minuteString + ":" + "00";
}

export const time12to24Add5 = (timeString: string) => {
    const isPM = timeString.includes("PM");
    let hourString = timeString.split(":")[0];
    let minuteString = timeString.split(":")[1].substring(0, 2);

    hourString = String(5 + Number(hourString));

    if (isPM) {
        hourString = String(12 + Number(hourString));
    }

    if (hourString.length == 1) {
        hourString = "0" + hourString;
    }
    
    return hourString + ":" + minuteString + ":" + "00";
}

export const stringifyC2CLocation = (location: C2CLocations): string => {
    switch(location) {
        case C2CLocations.IthacaNorthCampus:
            return "Ithaca, North Campus";
        case C2CLocations.IthacaSageHall:
            return "Ithaca, Sage Hall";
        case C2CLocations.IthacaBusShelter:
            return "Ithaca, Southeast B Lot Bus Shelter";
        case C2CLocations.NYCWeillCornell:
            return "New York City, Weill Cornell Medical College";
        case C2CLocations.NYCFTrain:
            return "New York City, F-Train to Tech Campus (3rd Ave & 64th St)";
        case C2CLocations.NYCCornellClub:
            return "NYC, Cornell Club";
    }
}