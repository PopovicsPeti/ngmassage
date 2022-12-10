

export class Product{
    public img: string;
    public name: string;
    public durationMin: number;
    public durationMed?: number;
    public durationMax?: number;
    public priceMin: number;
    public priceMed?: number;
    public priceMax?: number;
    public description: string;
    public profit: string;

        constructor(
                img: string,    
                name: string, 
                durationMin: number, 
                priceMin: number, 
                description: string, 
                profit: string,
                durationMed?: number, durationMax?: number,
                priceMed?: number, priceMax?: number,){
            this.img = img;
            this.name = name;
            this.durationMin = durationMin;
            this.durationMed = durationMed;
            this.durationMax = durationMax;
            this.priceMin = priceMin;
            this.priceMed = priceMed;
            this.priceMax = priceMax;
            this.description = description;
            this.profit = profit;
        }
}