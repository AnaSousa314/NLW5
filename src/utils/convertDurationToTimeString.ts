export function convertDurationToTimeString(duration: number) {
    const  hours = Math.floor(duration / 3600); //esta em segundos
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const timeString = [hours, minutes, seconds].map(unit=> String(unit).padStart(2, '0')).join(':');//ele adicionara dois 0 na frente quando for 1min ou 1seg por exemplo, para ficar 01:00

    return timeString;
}