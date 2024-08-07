import { ArrowRight } from 'lucide-react';
import gamaLogo from '../assets/gama-logo.svg';
import { useNavigate } from 'react-router-dom';

export function CreateRoom() {
    const navigate = useNavigate();

    function handleCreateRoom(data: FormData) {
        const theme = data.get('theme')?.toString();
        navigate('/room/1234');
    }

    return (
        <main className="h-screen flex items-center justify-center px-4">
            <div className="max-w-[450px] flex flex-col gap-6">
                <img src={gamaLogo} alt="GAMA logo" className='h-10' />

                <p className="leading-relaxed text-zinc-300 text-center">
                    Create a public AMA (Ask me anything) room and prioritize the most important questions for you.
                </p>

                <form
                    action={handleCreateRoom}
                    className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-sky-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1"
                >
                    <input
                        type="text"
                        placeholder="Room name"
                        name="theme"
                        className="flex-1 text-sm bg-transparent mx-2 outline-none placeholder:text-zinc-500 text-zinc-100"
                        autoComplete='off'
                    />

                    <button type='submit' className="bg-sky-400 text-sky-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm hover:bg-sky-500 transition-colors">
                        Create room
                        <ArrowRight className="size-4" />
                    </button>
                </form>
            </div>
        </main>
    )
}
