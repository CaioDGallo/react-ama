import { ArrowUp } from "lucide-react";
import { useState } from "react";

interface MessageProps {
    text: string
    reactionCount: number
    answered?: boolean
}

export function Message({ text, reactionCount, answered = false }: MessageProps) {
    const [hasReacted, setHasReacted] = useState(false)

    function handleReactToMessage() {
        setHasReacted(true)
    }

    return (
        <li data-answered={answered} className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none">
            {text}

            {hasReacted ? (
                <button
                    className="mt-3 flex items-center gap-2 text-sky-400 text-sm font-medium hover:text-sky-500 transition-colors"
                    type="button"
                >
                    <ArrowUp className="size-4" />
                    Upvote question ({reactionCount})
                </button>
            ) : (
                <button
                    className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300 transition-colors"
                    type="button"
                    onClick={handleReactToMessage}
                >
                    <ArrowUp className="size-4" />
                    Upvote question ({reactionCount})
                </button>
            )}
        </li>
    )
}
