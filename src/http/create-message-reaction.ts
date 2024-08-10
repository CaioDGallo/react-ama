interface CreateMessageReactionRequest {
    messageId: string;
    roomId: string;
}

export async function createMessageReaction({ messageId, roomId }: CreateMessageReactionRequest) {
    await fetch(`${import.meta.env.VITE_APP_API_SCHEMA}${import.meta.env.VITE_APP_API_URL}/api/rooms/${roomId}/messages/${messageId}/react`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
