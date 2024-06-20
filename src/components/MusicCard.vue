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
  <div class="cursor-pointer group perspective">
    <div class="shadow-sm rounded-2xl w-60 cursor-grab h-[18rem] bg-white relative preserve-3d duration-1000" :class="{
      'my-rotate-y-180': !isHidden,
    }">
      <div
        class="text-center absolute backface-hidden flex h-full w-full items-center justify-center border border-dashed rounded-lg">
        <IconMusicNoteBoldDuotone aria-hidden="true" class="text-6xl mx-auto text-red-400" />
      </div>


      <div v-if="music && !isHidden"
        class="flex p-8 flex-col justify-between h-full w-full absolute my-rotate-y-180 backface-hidden overflow-hidden">
        <p class="text-center text-gray-400">{{ music.title }}</p>
        <h4 class="font-bold text-4xl text-center text-black">{{ music.year }}</h4>
        <p class="text-center text-gray-400">{{ music.artist }}</p>
      </div>
    </div>
  </div>
</template>
