import { useParams } from "react-router-dom"

import gamaLogo from '../assets/gama-logo.svg'
import { ArrowRight, ArrowUp, Share2 } from "lucide-react"
import { toast } from "sonner"
import { Message } from "../components/message"

export function Room() {
    const { roomId } = useParams()

    function handleAskQuestion(data: FormData) {
    }

    function handleShareRoom() {
        const url = window.location.href.toString()

        if (navigator.share !== undefined && navigator.canShare()) {
            navigator.share({
                title: 'GAMA Room',
                text: 'Join my GAMA room!',
                url
            })
        } else {
            navigator.clipboard.writeText(url)

            toast.info('Room URL copied to clipboard!')
        }
    }

    return (
        <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
            <div className="flex items-center gap-3 px-3">
                <img src={gamaLogo} alt="GAMA logo" className='h-5' />

                <span className="text-sm text-zinc-500 truncate">
                    Room ID: <span className="text-zinc-300">{roomId}</span>
                </span>

                <button type='submit' onClick={handleShareRoom} className="ml-auto bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-zinc-700 transition-colors">
                    Share
                    <Share2 className="size-4" />
                </button>
            </div>

            <div className="h-px w-full bg-zinc-900" />

            <form
                action={handleAskQuestion}
                className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-sky-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1"
            >
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    name="theme"
                    className="flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100"
                    autoComplete='off'
                />

                <button type='submit' className="bg-sky-400 text-sky-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-sky-500 transition-colors">
                    Ask a question
                    <ArrowRight className="size-4" />
                </button>
            </form>

            <ol className="list-decimal list-outside px-3 space-y-8 ">
                <Message text="What is GoLang and why should I learn it? How does it compare to other programming languages?" reactionCount={14} answered={true} />
                <Message text="Is it possible to change carreer paths to GoLang?" reactionCount={14} answered={false} />
            </ol>
        </div>
    )
}
