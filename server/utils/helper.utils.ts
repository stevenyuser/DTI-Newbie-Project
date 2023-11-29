
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