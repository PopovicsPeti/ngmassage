export class MedRecords{
    observation:    string;
    date:           string;
    recomendation:  string;

    constructor( observation: string, date: string, recomendation: string){
        this.observation = observation;
        this.date = date;
        this.recomendation = recomendation;
    }
}