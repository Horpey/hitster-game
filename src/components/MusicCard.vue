<script lang="ts" setup>
import IconMusicNoteBoldDuotone from 'virtual:icons/solar/music-note-bold-duotone'
import { Music } from '~/types/App';

interface Props {
  isHidden?: boolean
  music?: Music
}

defineProps<Props>()
</script>

<template>
  <div class="shadow-sm rounded-2xl w-60 p-8 cursor-grab h-[18rem] bg-white">
    <div v-if="isHidden" class="text-center flex h-full items-center justify-center border border-dashed rounded-lg">
      <IconMusicNoteBoldDuotone aria-hidden="true" class="text-6xl mx-auto text-red-400" />
    </div>

    <template v-else>
      <div v-if="music" class="flex flex-col justify-between h-full">
        <p class="text-center text-gray-400">{{ music.title }}</p>
        <h4 class="font-bold text-4xl text-center text-black">{{ music.year }}</h4>
        <p class="text-center text-gray-400">{{ music.artist }}</p>
      </div>
    </template>



  </div>
</template>
