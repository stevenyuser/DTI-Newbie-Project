// date format // yyyy-MM-dd`T`HH:mm:ss - 2023-11-23T01:30:20

export enum BusCompanyEnum {
    C2C = "Cornell C2C",
    OurBus = "OurBus",
    FlixBus = "FlixBus"
}

export type BusRoute = {
    numSeats: number;
    startTime: string; // yyyy-MM-dd`T`HH:mm:ss - 2023-11-23T01:30:20
    endTime: string;
    price: number;
    busCompany: string;
    origin: string;
    destination: string;
};

export type Review = {
  busCompany: string;

  // optional info
  rideDate?: string;
  ridePrice?: number;
  rideOrigin?: string;
  rideDestination?: string;

  title: string;
  rating: number;
  reviewText: string;
  likes: number;

  userName: string;
  netId: string;
  reviewDateTime: string,
};

export type BusCompany = {
  name: string;
  websiteUrl: string;
  description: string;
  averageRating: number;
};



export enum C2CLocations {
    IthacaNorthCampus = "7,16", // Ithaca, North Campus
    IthacaSageHall = "7,17", // Ithaca, Sage Hall
    IthacaBusShelter = "7,38", // Ithaca, Southeast B Lot Bus Shelter
    NYCWeillCornell = "8,20", // New York City, Weill Cornell Medical College
    NYCFTrain = "8,39", // New York City, F-Train to Tech Campus (3rd Ave & 64th St)
    NYCCornellClub = "8,19" // New York City, Cornell Club
}

export enum OurBusLocations {
    Ithaca = "Ithaca,%20NY", // Ithaca, NY
    NYC = "New%20York,%20NY", // New York, NY
    FortLee = "Fort%20Lee,%20NJ" // Fort Lee, NJ
}

export enum GeneralLocations {
  NYC = "NYC",
  Ithaca = "Ithaca"
}