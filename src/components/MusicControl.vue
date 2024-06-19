<script lang="ts" setup>
import IconPauseCircleBoldDuotone from 'virtual:icons/solar/pause-circle-bold-duotone'
import IconVolumeCrossBoldDuotine from 'virtual:icons/solar/volume-cross-bold-duotone'
import IconVolumeLoudBoldDuotine from 'virtual:icons/solar/volume-loud-bold-duotone'
import IconPlayCircleBoldDuotone from 'virtual:icons/solar/play-circle-bold-duotone'
import { HtmlHTMLAttributes } from 'vue';

const playerLength = ref(75)
const widget = ref()
const loud = ref(false)
const player = ref<HtmlHTMLAttributes>()
const isPlaying = ref(false)

onMounted(() => {
  if (player.value) {
    widget.value = SC.Widget(player.value);
  }
})

const handeleMusicPlay = () => {
  isPlaying.value = !isPlaying.value

  if (player.value) {
    let widget = SC.Widget(player.value);
    widget.toggle()
  }

  // const audio = new Audio('https://assets.coderrocketfuel.com/pomodoro-times-up.mp3')
  // audio.play()
}

const handleVolume = () => {
  loud.value = !loud.value

  if (player.value) {
    let widget = SC.Widget(player.value);
    widget.setVolume(loud.value ? 0 : 100)
  }


}
</script>

<template>
  <iframe class="sr-only" ref="player" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay"
    src=" https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293&amp&show_artwork=false">
  </iframe>

  <div v-if="player"
    class="mt-10 p-3 rounded-full bg-red-500 flex justify-between items-center mx-auto max-w-[8rem] gap-3">
    <button type="button" @click="handeleMusicPlay" class="disabled:opacity-70">
      <IconPauseCircleBoldDuotone v-if="isPlaying" class="text-white text-3xl" aria-hidden="true" />
      <IconPlayCircleBoldDuotone v-else class="text-white text-3xl" aria-hidden="true" />
    </button>

    <!-- <div class="relative flex w-full">
      <span class="h-1 block rounded-lg absolute left-0 bg-white" :style="{
        width: `${playerLength}%`
      }" />
      <span class="w-full h-1 block rounded-lg bg-white/30" />
    </div> -->

    <button type="button" @click="handleVolume">
      <IconVolumeLoudBoldDuotine v-if="loud" class="text-white text-3xl" aria-hidden="true" />
      <IconVolumeCrossBoldDuotine v-else class="text-white text-3xl" aria-hidden="true" />
    </button>
  </div>
</template>
