import { Booking } from "../auth/booking.model";
import { MedRecords } from "./medicalRecord.model";
import { Problems } from "./problems.model";


export class Client{
    public name:           string;
    public bornDate:       string;
    public adress:         string;
    public email:          string;
    public problems:       Array<Problems>;
    public otherProblems:  string;
    public date:           string;
    public isClient:       boolean;
    public booking:        Array<Booking>;
    public medRecords:      Array<MedRecords>; 

    constructor(name: string, bornDate: string, adress: string, email: string, problems: Array<Problems>, otherProblems: string, date: string, isClient: boolean = false, booking: Array<Booking>, medRecords: Array<MedRecords>){

        this.name = name;
        this.bornDate = bornDate;
        this.adress = adress;
        this.email = email;
        this.problems = problems;
        this.otherProblems = otherProblems;
        this.date = date;
        this.isClient = isClient;
        this.booking = booking;
        this.medRecords = medRecords;
    }

}

