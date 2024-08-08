interface GetRoomMessagesRequest {
    roomId: string;
}


export interface GetRoomMessagesResponse {
    messages: Array<{
        id: string;
        text: string;
        reactionCount: number;
        answered: boolean;
    }>;
}

export async function getRoomMessages({ roomId }: GetRoomMessagesRequest): Promise<GetRoomMessagesResponse> {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/rooms/${roomId}/messages`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data: {
        messages: Array<{
        ID: string;
        Message: string;
        ReactionCount: number;
        Answered: boolean;
    }>
    } = await response.json();

    const messages = data.messages;

    return {
        messages: messages.map((message) => ({
            id: message.ID,
            text: message.Message,
            reactionCount: message.ReactionCount,
            answered: message.Answered,
        })),
    };
}
