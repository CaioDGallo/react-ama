import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createMessageReaction } from "../http/create-message-reaction";
import { toast } from "sonner";
import { removeMessageReaction } from "../http/remove-message-reaction";

interface MessageProps {
    id: string
    text: string
    reactionCount: number
    answered?: boolean
}

export function Message({ id: messageId, text, reactionCount, answered = false }: MessageProps) {
    const [hasReacted, setHasReacted] = useState(false)
    const { roomId } = useParams()

    if (!roomId) {
        throw new Error('Messages component must be rendered inside a room or roomId related page')
    }

    async function createMessageReactionAction(){
        if (!roomId) {
            return
        }

        try{
            await createMessageReaction({ roomId, messageId: messageId })
        } catch (error) {
            toast.error('Something went wrong while reacting to the message')
        }

        setHasReacted(true)
    }

    async function removeMessageReactionAction(){
        if (!roomId) {
            return
        }

        try{
            await removeMessageReaction({ roomId, messageId: messageId })
        } catch (error) {
            toast.error('Something went wrong while removing the message reaction')
        }

        setHasReacted(false)
    }

    return (
        <li data-answered={answered} className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
            {text}

            {hasReacted ? (
                <button
                    className="flex gap-2 items-center mt-3 text-sm font-medium transition-colors text-sky-400 hover:text-sky-500"
                    type="button"
                    onClick={removeMessageReactionAction}
                >
                    <ArrowUp className="size-4" />
                    Upvote question ({reactionCount})
                </button>
            ) : (
                <button
                    className="flex gap-2 items-center mt-3 text-sm font-medium transition-colors text-zinc-400 hover:text-zinc-300"
                    type="button"
                    onClick={createMessageReactionAction}
                >
                    <ArrowUp className="size-4" />
                    Upvote question ({reactionCount})
                </button>
            )}
        </li>
    )
}
