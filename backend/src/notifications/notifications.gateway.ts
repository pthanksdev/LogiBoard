import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationsGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit() {
    // Simulate real-time GPS streaming down the socket for all IN_TRANSIT shipments
    setInterval(() => {
      // In a real application, this would fetch from Redis or a driver's mobile app GPS
      // Here we blast a generic random offset to simulate live movement
      const offsetLat = (Math.random() - 0.5) * 0.001;
      const offsetLng = (Math.random() - 0.5) * 0.001;

      this.server.emit('locationUpdate', {
        timestamp: new Date().toISOString(),
        deltaLat: offsetLat,
        deltaLng: offsetLng,
      });
    }, 2000); // 2-second live ping interval
  }
}
