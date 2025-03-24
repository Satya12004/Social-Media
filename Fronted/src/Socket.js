import { io } from "socket.io-client";

let url = 'http://localhost:8090';
const socket = io(url, { transports: ['websocket'],
   
    reconnection: true,           // Enable reconnection
    reconnectionAttempts: 5,      // Number of attempts before giving up
    reconnectionDelay: 2000,      // Start with a 2-second delay before trying to reconnect
    reconnectionDelayMax: 5000,autoConnect:false    // Maximum delay (increases exponentially) 

});
export default socket;