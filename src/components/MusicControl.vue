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

const { timer, draggableList } = useMusic()


onMounted(() => {
  if (player.value) {
    widget.value = SC.Widget(player.value);
  }
})

const initiateTimer = () => {
  timer.value = '00:15'
  let count = 15
  const interval = setInterval(() => {
    count--
    timer.value = `00:${count}`
    if (count === 0) {
      clearInterval(interval)
      draggableList.value = draggableList.value.map(item => {
        if (item.random) {
          item.hidden = false
        }
        return item
      })

      let widget = SC.Widget(player.value);
      widget.pause()
    }
  }, 1500)
}

const handeleMusicPlay = () => {
  isPlaying.value = true

  if (player.value) {
    let widget = SC.Widget(player.value);
    widget.play()
    initiateTimer()
  }
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
    src=" https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1707945366&color=%23ff5500">
  </iframe>

  <div v-if="player"
    class="mt-10 p-3 rounded-full bg-red-500 flex justify-between items-center mx-auto max-w-[8rem] gap-3">
    <button :disabled="isPlaying" type="button" @click="handeleMusicPlay" class="disabled:opacity-70">
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
      <IconVolumeCrossBoldDuotine v-if="loud" class="text-white text-3xl" aria-hidden="true" />
      <IconVolumeLoudBoldDuotine v-else class="text-white text-3xl" aria-hidden="true" />
    </button>
  </div>
</template>
