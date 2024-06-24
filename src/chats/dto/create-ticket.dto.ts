
export class Ticket {
  ticketId: string;
  chatInfo: {
    chatId: string;
    datetimeCreation: string;
    supportAssignedId: string | null;
    chatNumber: string;
    text: {
      body: string;
    };
    tags: {
      id: number;
      name: string;
    }[];
  };
  clientInfo: {
    clientId: number;
    name: string;
    lastname: string;
    dni: string;
    email: string;
    birthdate: string;
    phoneNumber: string;
    age: number;
  };
  columnId: string


  constructor(ticketId: string, chatInfo: any, clientInfo: any, columnId: string) {
    this.ticketId = ticketId;
    this.chatInfo = chatInfo;
    this.clientInfo = clientInfo;
    this.columnId = columnId;
  }
}
