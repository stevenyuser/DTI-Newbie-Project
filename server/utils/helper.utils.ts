import { BusRoute } from "../../common/types"

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

export const expandC2CData = (tripData: BusRoute[], ithToNYC: boolean): BusRoute[] => {
    const expandedTripData: BusRoute[] = []

    const ithacaStops = ["Ithaca, North Campus", "Ithaca, Sage Hall", "Ithaca, Southeast B Lot Bus Shelter"]
    const nycStops = ["New York City, Weill Cornell Medical College", "New York City, F-Train to Tech Campus (3rd Ave & 64th St)", "New York City, Cornell Club"]

    if (ithToNYC) {
        tripData.forEach(trip => {
            ithacaStops.forEach((ith) => {
                nycStops.forEach((nyc) => {
                    expandedTripData.push(
                        {
                            "numSeats": trip.numSeats
                            "startTime": trip.startTime; // yyyy-MM-dd`T`HH:mm:ss - 2023-11-23T01:30:20
                            "endTime": string;
                            "price": trip.price;
                            "busCompany": trip.busCompany;
                            "origin": ith;
                            "destination": nyc;
                        }
                    )
                })
            })
        })
    } else {

    }

}