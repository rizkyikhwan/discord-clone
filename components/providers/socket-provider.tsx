"use client"

import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { io as ClientIO } from "socket.io-client"

type SocketContextType = {
  socket: any | null
  isConnected: boolean
  onlineUser: any[]
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUser: []
})

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser()
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [onlineUser, setOnlineUser] = useState([])

  useEffect(() => {
      const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
        path: "/api/socket/io",
        addTrailingSlash: false
      })

      socketInstance.on("connect", () => {
        if (user) {
          (async () => {
            try {
              const res = await axios.get(`/api/user/${user.id}`)
              const data = await res.data
              socketInstance.emit("new-user-add", data.id)
            } catch (error) {
              console.log(error);
            }
          })()   
          setIsConnected(true)
  
          socketInstance.on("get-users", (user: []) => {
            setOnlineUser(user)
          })
        }
      })

      socketInstance.on("disconnect", () => {
        setIsConnected(false)

        socketInstance.emit("offline");
      })

      setSocket(socketInstance)
      return () => socketInstance.disconnect()
  }, [user])

  return (
    <SocketContext.Provider value={{ socket, isConnected, onlineUser }}>
      {children}
    </SocketContext.Provider>
  )
}