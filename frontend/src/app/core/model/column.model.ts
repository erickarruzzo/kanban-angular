import { Card } from "./card.model";

export class Column {
    public cards: Card[] = [];
    constructor(public id: string,
        public name?: string,
        public code?: string,
        public before?: string,
        public after?: string) { 
        }
}