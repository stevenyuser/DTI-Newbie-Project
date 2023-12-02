import { BusCompanyEnum, BusCompanyIdEnum } from "../../../common/types";

export const formatDate = (date: Date) => {
    console.log("date: " + date)
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(date);
}

export const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit"
    }).format(date);
}

export const companyNameFromId = (id: string) => {
    switch(id as BusCompanyIdEnum) {
        case BusCompanyIdEnum.C2C:
            return BusCompanyEnum.C2C;
        case BusCompanyIdEnum.OurBus:
            return BusCompanyEnum.OurBus;
        case BusCompanyIdEnum.Megabus:
            return BusCompanyEnum.Megabus;
        case BusCompanyIdEnum.Flixbus:
            return BusCompanyEnum.Flixbus;
    }
}