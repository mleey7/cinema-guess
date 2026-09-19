import { io, Socket } from 'socket.io-client';

// Determine socket URL based on current host
const SERVER_URL = window.location.port === '5173' 
  ? `http://${window.location.hostname}:3001` 
  : window.location.origin;

export const socket: Socket = io(SERVER_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000
});

export const API_BASE = window.location.port === '5173'
  ? `http://${window.location.hostname}:3001`
  : '';
