<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { profileService } from '@/modules/profile/services/profileService'
import { MagnifyingGlassIcon, GiftIcon } from '@heroicons/vue/24/outline'
import type { ILeaderboardUser } from '../types/leaderboard'
import { telegramService } from '@/shared/services/telegram/telegramService'

const CACHE_DURATION = 24 * 60 * 60 * 1000
const MOCK_USERS_COUNT = 100

const AVATAR_COLORS = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-purple-500'
]

interface ICachedAvatar {
  url: string
  timestamp: number
}

const searchQuery = ref('')
const users = ref<ILeaderboardUser[]>([])
const currentUser = ref<ILeaderboardUser>({
  id: 0,
  name: '',
  avatar: '',
  giftsCount: 128,
  giftsReceived: 0,
  giftsSent: 0,
  lastActive: new Date(),
  position: 0
})

const leaderboard = computed(() => {
  return users.value
    .sort((a, b) => b.giftsCount - a.giftsCount)
    .map((user, index) => ({
      ...user,
      position: index + 1
    }))
})

const getMedal = (_position: number): string | null => {
  const MEDALS = ['🥇', '🥈', '🥉']
  return _position <= 3 ? MEDALS[_position - 1] : null
}

const getInitials = (_name: string): string => {
  return _name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

const getRandomColor = (_name: string): string => {
  const index = _name
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return AVATAR_COLORS[index % AVATAR_COLORS.length]
}


const getCachedAvatarAsync = (_userId: number): string | null => {
  const cached = localStorage.getItem(`avatar_${_userId}`)
  if (!cached) return null

  const { url, timestamp } = JSON.parse(cached) as ICachedAvatar
  return Date.now() - timestamp < CACHE_DURATION ? url : null
}

const cacheAvatarAsync = (_userId: number, _url: string): void => {
  const cacheData: ICachedAvatar = {
    url: _url,
    timestamp: Date.now()
  }
  localStorage.setItem(`avatar_${_userId}`, JSON.stringify(cacheData))
}

const generateMockUsers = (): ILeaderboardUser[] => {
  return Array.from({ length: MOCK_USERS_COUNT }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    avatar: `https://i.pravatar.cc/96?u=${i + 1}`,
    giftsCount: Math.floor(Math.random() * 1000) + 100,
    giftsReceived: Math.floor(Math.random() * 500),
    giftsSent: Math.floor(Math.random() * 500),
    lastActive: new Date()
  }))
}

const initCurrentUserAsync = async (): Promise<void> => {
  const telegramUser = telegramService.user
  if (!telegramUser) return

  currentUser.value = {
    id: telegramUser.id,
    name: `${telegramUser.first_name} ${telegramUser.last_name || ''}`.trim(),
    giftsCount: 128,
    giftsReceived: 64,
    giftsSent: 64,
    lastActive: new Date(),
    position: 160
  }

  try {
    const avatarUrl = await profileService.getUserAvatarAsync(currentUser.value.id)
    if (avatarUrl) {
      currentUser.value.avatar = avatarUrl
      cacheAvatarAsync(currentUser.value.id, avatarUrl)
    }
  } catch (error) {
    console.error('Не удалось загрузить аватар:', error)
  }
}

onMounted(async () => {
  users.value = generateMockUsers()
  await initCurrentUserAsync()
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <div class="sticky top-0 z-10 bg-white dark:bg-gray-900 px-4 py-2">
      <div class="relative">
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Поиск"
          class="w-full h-[36px] bg-[#F2F2F7] dark:bg-gray-800 rounded-[12px] pl-[32px] pr-4 text-[17px] placeholder-[#8E8E93]"
        >
        <MagnifyingGlassIcon class="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8E93]" />
      </div>
    </div>

    <div class="pb-[105px]">
      <div 
        v-for="user in leaderboard" 
        :key="user.id"
        class="h-[72px] px-4 py-3 flex items-center justify-between border-b border-[rgba(60,60,67,0.1)] dark:border-gray-800"
      >
        <div class="flex items-center">
          <div class="w-12 h-12 rounded-full overflow-hidden mr-3">
            <img 
              v-if="user.avatar" 
              :src="user.avatar" 
              :alt="user.name"
              class="w-full h-full object-cover"
            >
            <div 
              v-else 
              :class="[
                'w-full h-full flex items-center justify-center',
                getRandomColor(user.name)
              ]"
            >
              <span class="text-lg font-bold text-white">
                {{ getInitials(user.name) }}
              </span>
            </div>
          </div>
          <div>
            <div class="text-[17px] tracking-[-0.4px] font-medium text-gray-900 dark:text-white mb-1">
              {{ user.name }}
            </div>
            <div class="flex items-center gap-1">
              <GiftIcon class="w-4 h-4 text-[#0066FF]" />
              <span class="text-[15px] font-medium text-[#0066FF]">{{ user.giftsCount }}</span>
            </div>
          </div>
        </div>
        <div v-if="user.position && getMedal(user.position)" class="text-2xl w-6 text-center">
          {{ getMedal(user.position) }}
        </div>
        <span v-else class="text-[15px] font-medium text-[#8E8E93]">#{{ user.position }}</span>
      </div>
    </div>

    <div class="fixed bottom-[49px] left-0 right-0 bg-white dark:bg-gray-900 border-t border-[rgba(60,60,67,0.1)] dark:border-gray-800">
      <div class="flex items-center h-[56px] px-4">
        <div class="flex items-center flex-1">
          <div class="w-12 h-12 rounded-full overflow-hidden mr-3">
            <img 
              v-if="currentUser.avatar" 
              :src="currentUser.avatar" 
              :alt="currentUser.name"
              class="w-full h-full object-cover"
            >
            <div 
              v-else 
              :class="[
                'w-full h-full flex items-center justify-center',
                getRandomColor(currentUser.name)
              ]"
            >
              <span class="text-lg font-bold text-white">
                {{ getInitials(currentUser.name) }}
              </span>
            </div>
          </div>
          <div>
            <div class="flex items-center">
              <span class="text-[17px] tracking-[-0.4px] font-medium text-gray-900 dark:text-white">
                {{ currentUser.name }}
              </span>
              <span class="ml-1.5 px-1.5 py-0.5 text-[13px] bg-[#F2F2F7] dark:bg-gray-800 text-[#8E8E93] rounded">
                Вы
              </span>
            </div>
            <div class="flex items-center gap-1">
              <GiftIcon class="w-4 h-4 text-[#0066FF]" />
              <span class="text-[15px] font-medium text-[#0066FF]">{{ currentUser.giftsCount }}</span>
            </div>
          </div>
        </div>
        <span class="text-[15px] font-medium text-[#8E8E93]">#{{ currentUser.position }}</span>
      </div>
    </div>
  </div>
</template>