import { Column } from ".";

export class Funnel {
    columns: Column[];
   
    constructor(columns: Column[]) {
        this.columns = columns;
    }
}
