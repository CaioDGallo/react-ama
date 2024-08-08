import { useParams } from "react-router-dom"
import { Message } from "./message"
import { getRoomMessages } from "../http/get-room-messages"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMessagesWebsocket } from "../hooks/use-messages-websocket"

export function Messages() {
    const { roomId } = useParams()

    if (!roomId) {
        throw new Error('Messages component must be rendered inside a room or roomId related page')
    }

    const { data } = useSuspenseQuery({
        queryKey: ['messages', roomId], 
        queryFn: () => getRoomMessages({ roomId })
    });

    useMessagesWebsocket({ roomId })

    const reactionSortedMessages = data.messages.sort((a, b) => b.reactionCount - a.reactionCount)

    return (
        <ol className="px-3 space-y-8 list-decimal list-outside">
            {reactionSortedMessages.map((message) => (
                <Message id={message.id} key={message.id} text={message.text} reactionCount={message.reactionCount} answered={message.answered} />
            ))}
        </ol>
    )
}
 
 
 
 
 
 
 
 

