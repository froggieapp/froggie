export namespace Kick {
    export const enum EVENT_TYPES {
        ChatMessageEvent ='App\\Events\\ChatMessageEvent',
        FollowersUpdatedEvent = 'App\\Events\\FollowersUpdated',
        StopStreamEvent = 'App\\Events\\StopStreamBroadcast',
        GiftedSubEvent = 'App\\Events\\GiftedSubscriptionsEvent',
        ChannelSubEvent = 'App\\Events\\ChannelSubscriptionEvent',
        ConnectedEvent = 'pusher:connection_established',
        SocketSubscribedEvent = 'pusher_internal:subscription_succeeded',
        UserBannedEvent = 'App\\Events\\UserBannedEvent',
        PongEvent = 'pusher:pong"',
    }

    export type KickEvent = ChatMessageEvent
    | FollowersUpdatedEvent
    | StreamStopEvent
    | GiftedSubEvent
    | SubEvent
    | ConnectedEvent
    | SocketSubscribedEvent
    | UserBannedEvent
    | PongEvent;
    export interface ChatMessageEvent {
    channel: string
    event: EVENT_TYPES.ChatMessageEvent,
    data: {
        id: string
        chatroom_id: string
        content: string
        type: 'message'
        created_at: string
        sender: {
            id: number
            username: string | null
            slug: string
            identity: {
                color: string
                badges: string[]
            }
        } | undefined | null
    } | undefined | null
}

export interface FollowersUpdatedEvent {
    channel: string
    event: EVENT_TYPES.FollowersUpdatedEvent,
    data: {
        followersCount: string
        channel_id: string
        username: string | null
        created_at: string
        followed: boolean
    } | undefined | null
}

export interface StreamStopEvent {
    channel: string
    event: EVENT_TYPES.StopStreamEvent,
    data: {
        livestream: {
            id: string,
            channel: {
                id: string
                is_banned: boolean
            }
        }
    } | undefined | null
}

export interface GiftedSubEvent {
    channel: string
    event: EVENT_TYPES.GiftedSubEvent,
    data: {
        chatroom_id: string
        gifted_usernames: string[]
        gifter_username: string
    } | undefined | null
}

export interface SubEvent {
    channel: string
    event: EVENT_TYPES.ChannelSubEvent,
    data: {
        user_ids: string[]
        username: string
        channel_id: string
    } | undefined | null
}

export interface ConnectedEvent {
    channel: string
    event: EVENT_TYPES.ConnectedEvent,
    data: {
        socket_id: string
        activity_timeout: number
    } | undefined | null
}

export interface SocketSubscribedEvent {
    channel: string
    event: EVENT_TYPES.SocketSubscribedEvent,
    data: {} | undefined | null
}

export interface UserBannedEvent {
    channel: string
    event: EVENT_TYPES.UserBannedEvent,
    data: {
        id: string
        user: {
            id: string
            username: string
            slug: string
        }
        banned_by: {
            id: string
            username: string
            slug: string
        }
        expires_at: string
    } | undefined | null
}

export interface PongEvent {
    event: EVENT_TYPES.PongEvent,
    data: {} | undefined | null
}
}