import axios from 'axios'
import { telegramService } from '@/shared/services/telegram/telegramService'

const API_URL = import.meta.env.VITE_API_URL

interface IProfileResponse {
  avatarUrl: string
}

export const profileService = {
  async getUserAvatarAsync(): Promise<string | null> {
    try {
      const user = telegramService.user
      if (!user) {
        throw new Error('Пользователь не авторизован')
      }

      const { data } = await axios.get<IProfileResponse>(`${API_URL}/api/users/me/avatar`, {
        params: { userId: user.id }
      })
      
      return data.avatarUrl
    } catch (error) {
      console.error('Ошибка при получении аватара:', error)
      return null
    }
  }
}
