export class CreateChatDto {
  readonly name: string;
  readonly age: number;
  readonly status: boolean;
}
export class createChatFunnelDto {
  columns: {
    id: string;
    title: string;
    type: {
      id: number;
      name: string;
    };
    order: number;
    limit: number | null;
    tickets: {
      chatInfo: {
        chatId: string; 
        datetimeCreation: string;
        supportAssignedId: number | null;
        number: string;
        text: {
          body: string;
        };
        tags: {
          id: number;
          name: string;
        }[];
      };
      clientinfo: {
        name: string;
        lastname: string;
        dni: string;
        email: string;
        birthdate: string;
        phoneNumber: string;
        age: string;
      };
    }[];
  }[];
}

