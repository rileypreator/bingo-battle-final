import { BingoChoice } from "./bingoChoice.model";

export class Game {
    public id: string;
    public name: string;
    public description: string;    
    public bingoChoices: BingoChoice[]

    constructor(id: string, name: string, description: string, bingoChoices: BingoChoice[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.bingoChoices = bingoChoices;
    }
}