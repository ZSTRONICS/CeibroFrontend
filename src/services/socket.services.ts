class WebSocketService {
  public static socket: any
  userId: string = ""
  public constructor() {
    WebSocketService.socket = null;
  }

  public isSocketConnected() {
    try {
      return WebSocketService.socket.connected
    } catch (error) {
      return false
    }
  }

  public getSocket() {
    return WebSocketService.socket
  }

  public setSocket(socket: any) {
    WebSocketService.socket = socket
  }

  public setUserId(userId: string) {
    this.userId = userId;
  }

  public logoutSocketsIO() {
    if (WebSocketService.socket) {
      WebSocketService.socket.disconnect();
      WebSocketService.socket = null
    }
  }

}

const socket = new WebSocketService()

export { socket };

