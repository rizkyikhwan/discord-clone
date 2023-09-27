import { ActiveUsersProps, NextApiResponseServerIo } from "@/type"
import { Profile } from "@prisma/client"
import { Server as NetServer } from "http"
import { NextApiRequest } from "next"
import { Server as ServerIO } from "socket.io"

export const config = {
  api: {
    bodyParser: false
  }
}

let activeUsers: ActiveUsersProps[] = []

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io"
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: path,
      // @ts-ignore
      addTrailingSlash: false
    })
    res.socket.server.io = io 

    io.on("connection", (socket) => {
      console.log("User connected");

      socket.on("new-user-add", (newUserId) => {
        if (!activeUsers.some(user => user.userId === newUserId)) {
          activeUsers.push({ userId: newUserId, socketId: socket.id })
          console.log("new user is here!", activeUsers);
        }

        io.emit("get-users", activeUsers)
      })

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("user disconnected", activeUsers);

        io.emit("get-users", activeUsers);
      });

      socket.on("offline", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("user is offline", activeUsers);

        io.emit("get-users", activeUsers);
      });
    })
  }

  res.end()
}

export default ioHandler