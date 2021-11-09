import { useEffect, useState, useRef } from "react"
import io from 'socket.io-client'

const SOCKET_SERVER_URL = 'http://localhost:4000'
const NEW_CHAT_MESSAGE_EVENT = 'NEW_CHAT_MESSAGE_EVENT'
const useChat = (roomId: string) => {
    const [message, setMessage] = useState<any>([])
    const socketRef: any = useRef()

    useEffect(() => {

        socketRef.current = io(SOCKET_SERVER_URL, {
            query: { roomId }
        })

        socketRef.current.on('connect', () => {
            console.log('socket')
        })
        socketRef.current.message(NEW_CHAT_MESSAGE_EVENT, (message: any) => {
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id
            }

            setMessage((messages: any) => {
                return [...messages, incomingMessage]
            })
        })


        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId])

    const sendMessage = (messageBody: any) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
        })
    }
    return {
        message,
        sendMessage
    }
}

export default useChat