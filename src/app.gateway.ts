import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

const socketPort: number = parseInt(process.env.socket_port);

@WebSocketGateway(socketPort,{
  allowEIO3: true
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() wss;

  handleConnection(client: any, ...args): any {

    console.log(client.id);

    client.emit('connection', 'Successcfully connected to server')

    client.on('sendMessage',function(params){
      console.log(params);
    })


  }

  handleDisconnect(client: any): any {
  }


}