import { Injectable, NotFoundException } from '@nestjs/common';
import { createChatFunnelDto } from './dto/create-chat.dto';
import { DataSnapshot, get, ref, set } from 'firebase/database';
import { firebaseDatabase } from '../firebase/firebase.config';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Graph, Ticket, TransitionDto } from './dto';

@Injectable()
export class ChatsService {
  private whapiUrl = 'https://gate.whapi.cloud/chats';
  private whapiToken = 'UU9CDXpw4so6xNYYXL6kqc9N042KqOew';

  async syncChatsToFirebase() {
    try {
      const chats = await this.fetchChatsFromWhapi();
      const boardData = this.createChatFunnel(chats);

      await this.saveBoardDataToFirebase(boardData);
      return { message: 'Firebase Data Save' };
    } catch (error) {
      console.error('Error al sincronizar los chats con Firebase:', error);
      throw new Error('Error al sincronizar los chats con Firebase');
    }
  }

  private async fetchChatsFromWhapi(): Promise<any[]> {
    try {
      const response = await axios.get(this.whapiUrl, {
        headers: { Authorization: `Bearer ${this.whapiToken}` },
      });

      const whapiResponse = response.data;
      if (!whapiResponse.chats || !Array.isArray(whapiResponse.chats)) {
        throw new Error('Unexpected response from Whapi: Response is not an array');
      }

      return whapiResponse.chats;
    } catch (error) {
      console.error('Error fetching chats from Whapi:', error);
      throw new Error('Error fetching chats from Whapi');
    }
  }

  private createChatFunnel(chats: any[]): createChatFunnelDto {
    const boardData: createChatFunnelDto = {
      columns: [
        {
          id: uuidv4(),
          title: 'READY',
          type: { id: 1, name: 'todo' },
          order: 0,
          limit: null,
          tickets: []
        },
        {
          id: uuidv4(),
          title: 'IN_PROGRESS',
          type: { id: 2, name: 'in-progress' },
          order: 1,
          limit: null,
          tickets: []
        },
        {
          id: uuidv4(),
          title: 'COMPLETED',
          type: { id: 3, name: 'done' },
          order: 2,
          limit: null,
          tickets: []
        }
      ]
    };

    chats.forEach(chat => {
      if (chat.last_message?.text?.body) {
        const ticket = this.createTicketFromChat(chat);

        const readyColumn = boardData.columns.find(column => column.title === 'READY');
        if (readyColumn) {
          readyColumn.tickets.push(ticket);
        } else {
          console.warn('No se encontró la columna READY');
        }
      } else {
        return('El objeto text o la propiedad body no están en el chat:');
      }
    });

    return boardData;
  }

  private createTicketFromChat(chat: any) {
    return {
      chatInfo: {
        chatId: chat.id,
        datetimeCreation: chat.timestamp,
        supportAssignedId: null,
        number: chat.id.slice(0, 11),
        text: { body: chat.last_message.text.body },
        tags: [
          { id: 1231231, name: "atencion general" },
          { id: 1231244, name: "reclamos" }
        ]
      },
      clientinfo: {
        name: chat.name || 'Nombre Predeterminado',
        lastname: 'Apellido',
        dni: 'DNI Number',
        email: 'email@gmail.com',
        birthdate: '19/08/2005',
        phoneNumber: chat.id.slice(2, 11),
        age: 'Edad'
      }
    };
  }

  private async saveBoardDataToFirebase(boardData: createChatFunnelDto) {
    const dataReference = ref(firebaseDatabase, 'BoardData');
    await set(dataReference, boardData);
  }

  async removeAllChats() {
    const chatsReference = ref(firebaseDatabase, 'Chats');
    await set(chatsReference, null);
    return { message: 'All chats removed successfully' };
  }

  async moveTicket(ticketId: string, fromColumnTitle: string, toColumnTitle: string) {
    const boardDataRef = ref(firebaseDatabase, 'BoardData');
    const boardDataSnapshot = await get(boardDataRef);
    if (!boardDataSnapshot.exists()) {
      throw new NotFoundException('No board data found in Firebase');
    }

    const boardData = boardDataSnapshot.val() as createChatFunnelDto;
    const fromColumn = boardData.columns.find(column => column.title === fromColumnTitle);
    const toColumn = boardData.columns.find(column => column.title === toColumnTitle);

    if (!fromColumn) {
      throw new NotFoundException(`Column '${fromColumnTitle}' not found`);
    }
    if (!toColumn) {
      throw new NotFoundException(`Column '${toColumnTitle}' not found`);
    }

    if (!fromColumn.tickets) {
      fromColumn.tickets = [];
    }
    if (!toColumn.tickets) {
      toColumn.tickets = [];
    }

    const ticketIndex = fromColumn.tickets.findIndex(ticket => ticket.chatInfo.chatId === ticketId);
    if (ticketIndex === -1) {
      throw new NotFoundException('Ticket not found in the source column');
    }

    const [ticket] = fromColumn.tickets.splice(ticketIndex, 1);
    toColumn.tickets.push(ticket);

    await set(boardDataRef, boardData);
    return { message: 'Ticket moved successfully' };
  }

  async findAll() {
    const dataReference = ref(firebaseDatabase, 'BoardData');
    const snapshot: DataSnapshot = await get(dataReference);
    return snapshot.val();
  }



  async validateTransition (graph: Graph, ticket: Ticket, transition: TransitionDto){
    
  }


}




/* 
  // Crud de ejemplo firesbase

  async create(createChatDto: CreateChatDto) {
    const dataReference = ref(firebaseDatabase, 'Chats');
    const newElementReference = push(dataReference, { dataReference: createChatDto });
    await set(newElementReference, createChatDto);
    return { id: newElementReference.key, ...createChatDto };
  }

  async findAll() {
    const dataReference = ref(firebaseDatabase, 'Chats');
    const snapshot: DataSnapshot = await get(dataReference);
    return snapshot.val();
  }

  async findOne(id: string) {
    const dataReference = ref(firebaseDatabase, `Chats/${id}`);
    const snapshot: DataSnapshot = await get(dataReference);
    if (!snapshot.exists()) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }
    return snapshot.val();
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    const dataReference = ref(firebaseDatabase, `Chats/${id}`);
    const snapshot: DataSnapshot = await get(dataReference);
    if (!snapshot.exists()) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }
    await update(dataReference, updateChatDto);
    return { id, ...updateChatDto };
  }

  async remove(id: string) {
    const dataReference = ref(firebaseDatabase, `Chats/${id}`);
    const snapshot: DataSnapshot = await get(dataReference);
    if (!snapshot.exists()) {
      throw new NotFoundException(`Chat with ID ${id} not found`);
    }
    await set(dataReference, null); // Esto elimina el nodo del chat
    return { message: `Chat with ID ${id} removed successfully` };
  }

  async removeAllChats() {
    const chatsReference = ref(firebaseDatabase, 'Chats');
    await set(chatsReference, null); // This will remove all chat nodes
    return { message: 'All chats removed successfully' };
  }

 */

