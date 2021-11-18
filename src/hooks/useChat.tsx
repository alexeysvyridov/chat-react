import { useEffect, useState, useRef, useCallback } from "react"
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'ws://localhost:5000';

const useChat = (userId:string) => {
    const [arrivalMessage,setArrivalMessage] = useState<any>(null)
    const socketRef: any = useRef(null)

    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL)
        socketRef.current.on("getMessage", (data:any) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
         })
        return() => {
            socketRef.current.disconnect()
        }
    }, [])


    const addUserSocket = useCallback((id:string) => {
        socketRef.current.emit("addUser", id)
    },[]);

    useEffect(() => {
        addUserSocket(userId)
    }, [addUserSocket, userId])

    const sendMessage = ({user, receiverId, newMessage}:any) => {
        socketRef.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        })
    }
    return {
        socketRef,
        addUserSocket,
        arrivalMessage,
        setArrivalMessage,
        sendMessage
    }
}

export default useChat