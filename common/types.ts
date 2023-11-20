type Id = {
    readonly id: string;
}



export type BusRoute = {
    readonly date: Date;
    readonly price: number;
    readonly busCompany: BusCompany;
}

export type BusRouteWithId = BusRoute & Id;

export type Review = {
    readonly busId?: string;
    readonly userId: string,
    readonly date: Date;
    readonly busRoute?: BusRoute; // optional

    readonly title: string;
    readonly rating: number,
    readonly reviewText?: string; // optional
    readonly likes?: number; // optional
}

export type ReviewWithId = Review & Id;

export type BusCompany = {
    readonly name: string;
    readonly websiteUrl: string;
    readonly description: string;
    readonly averageRating: number;
    readonly reviews: readonly string[]; // array of Review IDs
}

export type BusCompanyWithId = BusCompany & Id;

export type User = {
    readonly name: string;
    readonly email: string;
    readonly reviews: readonly string[];
}

export type UserWithId = User & Id;