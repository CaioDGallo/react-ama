import { useEffect } from "react";
import { GetRoomMessagesResponse } from "../http/get-room-messages";
import { useQueryClient } from "@tanstack/react-query";

interface UseMessagesWebSocketParams {
    roomId: string;
}

type WebhookMessage = 
    | { kind: 'message_created', value: { id: string, message: string } }
    | { kind: 'message_answered', value: { id: string } }
    | { kind: 'message_reaction_increased' | 'message_reaction_decreased', value: { id: string, reaction_count: number } }

export function useMessagesWebsocket({ roomId }: UseMessagesWebSocketParams) {
    const queryClient = useQueryClient()

    useEffect(() => {
        const ws = new WebSocket(`${import.meta.env.VITE_APP_API_WS_SCHEMA}${import.meta.env.VITE_APP_API_URL}/subscribe/${roomId}`);

        ws.onopen = () => {
            console.log('connected');
        }

        ws.onclose = () => {
            console.log('disconnected');
        }

        ws.onmessage = (event) => {
            const data: WebhookMessage = JSON.parse(event.data);

            switch (data.kind) {
                case 'message_created':
                    queryClient.setQueryData<GetRoomMessagesResponse>(['messages', roomId], state => {
                        return {
                            messages: [
                                ...(state?.messages || []),
                                {
                                    id: data.value.id,
                                    text: data.value.message,
                                    reactionCount: 0,
                                    answered: false
                                }
                            ]
                        }
                    });
                    
                    break;
                case 'message_answered':
                    queryClient.setQueryData<GetRoomMessagesResponse>(['messages', roomId], state => {
                        if(!state){
                            return undefined
                        }

                        return {
                            messages: state.messages.map(message => {
                                if(message.id === data.value.id){
                                    return {
                                        ...message,
                                        answered: true
                                    }
                                }

                                return message
                            })
                        }
                    });
                    break;

                case 'message_reaction_increased':
                case 'message_reaction_decreased':
                    queryClient.setQueryData<GetRoomMessagesResponse>(['messages', roomId], state => {
                        if(!state){
                            return undefined
                        }

                        return {
                            messages: state.messages.map(message => {
                                if(message.id === data.value.id){
                                    return {
                                        ...message,
                                        reactionCount: data.value.reaction_count,
                                    }
                                }

                                return message
                            })
                        }
                    });
                    break;
            }
        }

        return () => {
            ws.close();
        }
    }, [roomId, queryClient]);
}
