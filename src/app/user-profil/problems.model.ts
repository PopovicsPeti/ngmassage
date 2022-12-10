export class Problems{
    public id: number;
    public select: boolean;
    public name: string;

    constructor(id: number, select: boolean, name: string){
        this.id = id;
        this.select = select;
        this.name = name;
    }
}