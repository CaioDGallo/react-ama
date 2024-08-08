import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { createMessage } from "../http/create-message";
import { toast } from "sonner";

export function CreateMessageForm(){
    const { roomId } = useParams()

    if (!roomId) {
        throw new Error('Messages component must be rendered inside a room or roomId related page')
    }


    async function handleAskQuestion(data: FormData) {
        const message = data.get('message')?.toString();

        if (!message || !roomId) {
            return;
        }

        try{
            await createMessage({ roomId, message });
        } catch (error) {
            toast.error('Something went wrong while creating the message');
        }
    }

    return (
        <form
            action={handleAskQuestion}
            className="flex gap-2 items-center p-2 rounded-xl border ring-offset-2 focus-within:ring-1 bg-zinc-900 border-zinc-800 ring-sky-400 ring-offset-zinc-950"
        >
            <input
                type="text"
                placeholder="What's on your mind?"
                name="message"
                className="flex-1 mx-2 text-sm bg-transparent outline-none placeholder:text-zinc-500 text-zinc-100"
                autoComplete='off'
                required
            />

            <button type='submit' className="flex gap-1.5 items-center py-1.5 px-3 text-sm font-medium rounded-lg transition-colors bg-sky-400 text-sky-950 hover:bg-sky-500">
                Ask a question
                <ArrowRight className="size-4" />
            </button>
        </form>
    );
}
