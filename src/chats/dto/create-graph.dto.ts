import { Column, TransitionDto } from "./index";

export class Graph {
    columns: Column[];
    transitions: TransitionDto[];
    constructor(columns: Column[], transitions: TransitionDto[]) {
        this.columns = columns;
        this.transitions = transitions;
    }
}
