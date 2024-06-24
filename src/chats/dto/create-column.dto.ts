import { Graph, Ticket } from ".";

export class Column {
    columnId: string;
    title: string;
    type: {
        id: string;
        name: string;
    };
    order: number;
    limit: number;
    tickets: Ticket[];

    constructor(columnId: string, title: string, type: any, order: number, limit: number) {
        this.columnId = columnId;
        this.title = title;
        this.type = type;
        this.order = order;
        this.limit = limit;
        this.tickets = [];
    }
}
