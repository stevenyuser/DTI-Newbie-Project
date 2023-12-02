import * as cheerio from "cheerio";
import { C2CLocations, OurBusLocations, BusRoute, MegabusLocations } from "../../common/types";
import { time12to24, time12to24Add5, stringifyC2CLocation } from "../utils/helper.utils";

// only scrape C2C for:
// North Campus to Cornell Club
// Cornell Club to North Campus
//
// paths:
// ITH-NYC: North, Sage, B Lot => Cornell Club, F Train, Weill Cornell
// NYC-ITH: Weill Cornell, F Train, Cornell Club => B Lot, Sage, North
export const scrapeC2C = async (pickup: C2CLocations, dropoff: C2CLocations, date: Date): Promise<BusRoute[]> => {
    
    const dateString = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(date);

    const response = await fetch('https://c2cbus.ipp.cornell.edu/mobile/?a=mobile', {
        method: 'POST',
        headers: {
            'authority': 'c2cbus.ipp.cornell.edu',
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9,und;q=0.8',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'cookie': '_ga=GA1.2.2009361319.1696800467; _ga_VKE65X7QYM=GS1.2.1699445916.6.1.1699447216.0.0.0; _hp2_id.3001039959=%7B%22userId%22%3A%225517641778191662%22%2C%22pageviewId%22%3A%224596943607911114%22%2C%22sessionId%22%3A%22850780294395342%22%2C%22identity%22%3A%22uu-2-2dbef03bc8e47a3a4da24e8bb514859c22cd9810850560f7103b4dde288c80ef-GTDkw0Eah6uohqhXZ7zSk8TH1zJG9mbz7wTVI1Si%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; mode=true; ASP.NET_SessionId=jdqe2edqzm4nly2o44iocrmz',
            'dnt': '1',
            'origin': 'https://c2cbus.ipp.cornell.edu',
            'referer': 'https://c2cbus.ipp.cornell.edu/mobile/?a=mobile',
            'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'x-microsoftajax': 'Delta=true',
            'x-requested-with': 'XMLHttpRequest'
        },
        body: new URLSearchParams({
            'ctl00$cph$smg': 'ctl00$cph$smg|ctl00$cph$btnDepCal',
            'ctl00$cph$ddlTripType': 'One Way',
            'ctl00$cph$ddlQty': '1',
            'ctl00$cph$ddlDepPickLocation': pickup,
            'ctl00$cph$ddlDepDropLocation': dropoff,
            'ctl00$cph$txtDepDate': '',
            'ctl00$cph$flDepDate': dateString,
            'vs_gid': '734dcc62-7e92-401c-92cf-7af91a28e493',
            '__EVENTTARGET': '',
            '__EVENTARGUMENT': '',
            '__LASTFOCUS': '',
            '__VIEWSTATE': '',
            '__EVENTVALIDATION': '/wEdADuvVXD1oYELeveMr0vHCmYPVrM8DSZwTLvYfWTBnyTKEOkNb29kemPWyNzUYczbejHS7FmZfmlFB84mmO03H0bzK7EuzUKni8T+xgvqUnqfvrcTyy9e9fEQZCPqb0CrK6fml5XJVtMDzoM3SjyEgZKFNRohXwSYUKGdc3TVlAEhEP/Afu15tH5pPj7bzYoprL3x+tVVYkkkOcbH6cOHcinjNEQ4m3m/HczG+nkv2ory3F8HzzfdY32GSI8rP3NkOtfzqAf00R+1JQR2oPx9INJD90e0AADkuMwhT+izbIdQvLo2uHsZVf2anvwT8XCNXA4CV0WSuIacMGGG2eGYdUnvn+OwxmSwl5Kv74ShGLhuxQbqWR6wf5dJY1Ua+Mj8SJuwSwxMs8T5WbtqCCctV/ghFOpK1/IZe0JDbtwYcC5/Ai82h8g/Jif1rGqPJHJNliuvj7fFkzPARPR+iWX0erCB4VNZ0EEaHAcsujfV6QQtLNAulcB1PdT8SQg13vj1a5V3I8MW6kWsecPXZ+SnJPF7ua2R5SNdKS+7ct8hjO+eUZSgtz14C1jODVwDkjSsSkWQgMqQgnNcJJmmFYzP+S/AS0VytQwch0AM4qQ8Q0JZK0vM/rD89keMA/ypkgg+L0atdbU50/3HxO1Gg1J6mGvKVaccnxH2hl1R/czOASN9fcvRL5ar1D55YWw8Jd9RHDpVsomBbndef/n4JmpRxgqG9XMnGdrhHvd3doq4xSBLKgAauq/p9wxgZY4a5OWpWXpj+mCCwn8GgK3Q0rzypEJjXlcZM3fJelJ3UaDytxq3X+x5+zYa4z4HSCtrwSmTVooPsuf3hIpmkd4ZsPazLknVHmqTjAM8d+cYiIGDlL77UzgSelOshyKZzoc2yCkQK1FszKGBMKCjmoROaNRe7bbmF/KPRjsDpmXNIP1/5sUonYEpGKTZ1ALQp8cZ0zF//lyke2nKHnq75v94QSu3VOJjWuKcKzSZemme1zQ4EKI+k2DUQGvIKfMtG+4Dil/lLcK6CmifZ5sTugccxYZH4dI1OQagh1nVYy9dAxOciHDvVazv/FLRrmkvAB9pnHTqlvaWwtu6pl4b/ODkuXLvS4e2tGKSBpeLm5mi3QVL1usfPks1jfHUZmp4BxGhwjXrl7ohMo/8LncK1NgfvyJlEkTBORKqfMkC3IWWHC+rMyMqm1FZ6ddayosAM/quJc9ngG/t6Ob2Y52XBzeEdqQK3NoTuMPEwNYo3Tl+iUQj2Qbgvt3jQ+0Vc9pBDbJr5GxQ6na48XB6KTTOFkTNIGGOC0iH',
            '__ASYNCPOST': 'true',
            'ctl00$cph$btnDepCal': 'Search'
        })
    });

    const body = await response.text();

    const $ = cheerio.load(body);

    // console.log(body);

    const $selected = $("label.radio");

    // console.log("Seats for the date: ");

    const tripData: string[] = [];

    $selected.each((i, elem) => {
        console.log($(elem).text());

        tripData.push($(elem).text());
    });

    console.log("C2C Data: " + tripData);

    // timeSeatString format XX:XX AM, XX Seats
    return tripData.map((timeSeatString): BusRoute => (
        {
            "numSeats": Number(timeSeatString.split(", ")[1].split(" Seats")[0]),
            "startTime": date.toISOString().slice(0, 10) + "T" + time12to24(timeSeatString.split(", ")[0]),
            "endTime": date.toISOString().slice(0, 10) + "T" + time12to24Add5(timeSeatString.split(", ")[0]),
            "price": 90,
            "busCompanyId": "C2C",
            "origin": stringifyC2CLocation(pickup),
            "destination": stringifyC2CLocation(dropoff),
        }
    ))
}

export const scrapeOurBus = async (pickup: OurBusLocations, dropoff: OurBusLocations, date: Date): Promise<BusRoute[]> => {
    const dateString = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(date);

    const url = `https://www.ourbus.com/booknow?origin=${pickup}&destination=${dropoff}&departure_date=${dateString}&adult=1`

    const response = await fetch(url);

    const body = await response.text();

    // console.log(body);

    var defaultSearchString = body.substring(body.indexOf("{", body.indexOf("var defaultSearch = '") + 1), body.indexOf("';", body.indexOf("var defaultSearch = '") + 1));
    
    // console.log(defaultSearchString);

    // console.log();

    const defaultSearch = JSON.parse(defaultSearchString);
    // console.log(defaultSearch);

    const tripData = defaultSearch.searchedRouteList.list;
    console.log("OurBus Data: " + tripData);

    if(tripData === undefined) {
        return [];
    }

    return tripData.map(({ available_seat, src_stop_name, dest_stop_name, src_landmark, dest_landmark, travel_date, src_stop_eta, dest_stop_eta, pass_amount, booking_fee, facility_fee }): BusRoute => {
        return {
            "numSeats": Number(available_seat),
            "startTime": String(travel_date + "T" + src_stop_eta),
            "endTime": String(travel_date + "T" + dest_stop_eta),
            "price": Number(pass_amount + booking_fee + facility_fee),
            "busCompanyId": "OurBus",
            "origin": String(src_stop_name),
            "destination": String(dest_stop_name),
        }
    })
}

export const scrapeMegabus = async (pickup: MegabusLocations, dropoff: MegabusLocations, date: Date): Promise<BusRoute[]> => {
    const dateString = new Intl.DateTimeFormat("fr-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(date);

    const url = `https://us.megabus.com/journey-planner/api/journeys?originId=${pickup}&destinationId=${dropoff}&departureDate=${dateString}&totalPassengers=1&concessionCount=0&nusCount=0&otherDisabilityCount=0&wheelchairSeated=0&pcaCount=0&days=1`

    const response = await fetch(url);

    const data = await response.json();

    const journeys = data.journeys;

    if (journeys === undefined) {
        return [];
    }

    return journeys.map(({ departureDateTime, arrivalDateTime, price, origin, destination }): BusRoute => (
        {
            "numSeats": -1,
            "startTime": departureDateTime,
            "endTime": arrivalDateTime,
            "price": price,
            "busCompanyId": "Megabus",
            "origin": origin.cityName,
            "destination": destination.cityName,
        }
    ));
}