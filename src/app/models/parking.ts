import { Plate } from "./plate";

export class Parking {

    id: number;
    plate: Plate;
    amount: number;
    start: Date;
    endParking: Date;

    constructor(id: number, plate: Plate, amount: number, start: Date, end: Date) {
        this.id = id;
        this.plate = plate;
        this.amount = amount;
        this.start = start;
        this.endParking = end;
    }

}
