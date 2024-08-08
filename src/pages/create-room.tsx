import { ArrowRight } from 'lucide-react';
import gamaLogo from '../assets/gama-logo.svg';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../http/create-room';
import { toast } from 'sonner';

export function CreateRoom() {
    const navigate = useNavigate();

    async function handleCreateRoom(data: FormData) {
        const theme = data.get('theme')?.toString();

        if (!theme) {
            return;
        }

        try{
            const { roomId } = await createRoom({ theme });

            navigate(`/room/${roomId}`);
        } catch (error) {
            toast.error('Something went wrong while creating the room');
            return;
        }
    }

    return (
        <main className="flex justify-center items-center px-4 h-screen">
            <div className="flex flex-col gap-6 max-w-[450px]">
                <img src={gamaLogo} alt="GAMA logo" className='h-10' />

                <p className="leading-relaxed text-center text-zinc-300">
                    Create a public AMA (Ask me anything) room and prioritize the most important questions for you.
                </p>

                <form
                    action={handleCreateRoom}
                    className="flex gap-2 items-center p-2 rounded-xl border ring-offset-2 focus-within:ring-1 bg-zinc-900 border-zinc-800 ring-sky-400 ring-offset-zinc-950"
                >
                    <input
                        type="text"
                        placeholder="Room name"
                        name="theme"
                        className="flex-1 mx-2 text-sm bg-transparent outline-none placeholder:text-zinc-500 text-zinc-100"
                        autoComplete='off'
                        required
                    />

                    <button type='submit' className="flex gap-1.5 items-center py-1.5 px-3 text-sm font-medium rounded-lg transition-colors bg-sky-400 text-sky-950 hover:bg-sky-500">
                        Create room
                        <ArrowRight className="size-4" />
                    </button>
                </form>
            </div>
        </main>
    )
}
