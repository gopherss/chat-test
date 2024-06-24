import { Controller, Post, Get, Delete, Param, Body, Patch } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Graph, Ticket, TransitionDto } from './dto';
// import { CreateChatDto } from './dto/create-chat.dto';
// import { UpdateChatDto } from './dto/update-chat.dto';
// import { MessagePattern } from '@nestjs/microservices';


@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }

  @Post('sync-chats')
  // @MessagePattern('sync.chats')
  async syncChatsToFirebase(){
   return await this.chatsService.syncChatsToFirebase();
  }
  
  @Delete()
  async removeAll(){
    return await this.chatsService.removeAllChats();
  } 

  @Patch('move-ticket')
  async moveTicket(
    @Body('ticketId') ticketId: string,
    @Body('fromColumnTitle') fromColumnTitle: string,
    @Body('toColumnTitle') toColumnTitle: string
  ) {
    return await this.chatsService.moveTicket(ticketId, fromColumnTitle, toColumnTitle);
  }

  @Get()
  async findAll() {
    return await this.chatsService.findAll();
  }

  @Post('validate')
  async validateTransition( @Body() graph: Graph, ticket: Ticket, transition: TransitionDto){
    return await this.chatsService.validateTransition(graph, ticket,transition);
  }
  
}

/*   // CRUD de ejemplo Firebase
  @Post()
  async create(@Body() createChatDto: CreateChatDto) {
    return await this.chatsService.create(createChatDto);
  }

  @Get()
  async findAll(): Promise<CreateChatDto> {
    return await this.chatsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.chatsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return await this.chatsService.update(id, updateChatDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.chatsService.remove(id);
  }

    */
