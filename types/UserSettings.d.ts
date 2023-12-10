namespace UserSettings {
    export interface SettingsChannel {
        name: string
        order: number
        avatar: string
        chatroomId: string
        channelId: string
    }
  
    export interface UserSettingsData {
        channels?: SettingsChannel[]
    }
}
