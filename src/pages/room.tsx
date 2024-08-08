import { useParams } from "react-router-dom"

import gamaLogo from '../assets/gama-logo.svg'
import { Share2 } from "lucide-react"
import { toast } from "sonner"
import { Messages } from "../components/messages"
import { Suspense } from "react"
import { CreateMessageForm } from "../components/create-message-form"

export function Room() {
    const { roomId } = useParams()

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
        <div className="flex flex-col gap-6 py-10 px-4 mx-auto max-w-[640px]">
            <div className="flex gap-3 items-center px-3">
                <img src={gamaLogo} alt="GAMA logo" className='h-5' />

                <span className="text-sm text-zinc-500 truncate">
                    Room ID: <span className="text-zinc-300">{roomId}</span>
                </span>

                <button type='submit' onClick={handleShareRoom} className="flex gap-1.5 items-center py-1.5 px-3 ml-auto text-sm font-medium rounded-lg transition-colors bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
                    Share
                    <Share2 className="size-4" />
                </button>
            </div>

            <div className="w-full h-px bg-zinc-900" />

            <CreateMessageForm />

            <Suspense fallback={<p>Loading...</p>}>
                <Messages />
            </Suspense>
        </div>
    )
}
