<script lang="ts" setup>
import IconPlayStreamBoldDuotone from 'virtual:icons/solar/play-stream-bold-duotone'
import IconPauseCircleBoldDuotone from 'virtual:icons/solar/pause-circle-bold-duotone'
import IconVolumeCrossBoldDuotine from 'virtual:icons/solar/volume-cross-bold-duotone'
import IconVolumeLoudBoldDuotine from 'virtual:icons/solar/volume-loud-bold-duotone'
import { Music } from '~/types/App';
import database from '~/data/database';
import draggable from 'vuedraggable'

const musicList = ref<Music[]>([
  { "title": "Johnny B. Goode", "artist": "Chuck Berry", "year": 1958 },
  { "title": "Like a Rolling Stone", "artist": "Bob Dylan", "year": 1965 },
  { "title": "Good Vibrations", "artist": "The Beach Boys", "year": 1966 },
])


const { playlist } = database
const loud = ref(false)
const drag = ref(false)
const playerLength = ref(75)

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost',
  }
})


const randomMusic = computed(() => {
  const filteredMusic = playlist.filter(item =>
    !musicList.value.some(excluded =>
      excluded.title === item.title && excluded.artist === item.artist && excluded.year === item.year
    )
  );

  const randomIndex = Math.floor(Math.random() * filteredMusic.length);
  let randomMusicItem = filteredMusic[randomIndex]
  randomMusicItem.hidden = true
  return randomMusicItem
})

const draggableList = ref<Music[]>([])

onMounted(() => {
  draggableList.value = [
    randomMusic.value,
    ...musicList.value
  ]
  handeleMusicPlay()
})

const handeleMusicPlay = () => {

}

const handleVolume = () => {
  loud.value = !loud.value
}
</script>

<template>
  <div class="mx-auto py-20 max-w-6xl">
    <div class="rounded-xl mb-10 mx-12 p-6 bg-gray-50 flex justify-between items-center">
      <div class="group block flex-shrink-0">
        <div class="flex items-center">
          <div>
            <img class="inline-block h-9 w-9 rounded-xl"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">Horpey Eureka</p>
            <p class="text-xs font-medium text-gray-500 group-hover:text-gray-700">#28392</p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <span>
          <IconPlayStreamBoldDuotone class="text-2xl text-red-400" />
        </span>
        <p class="text-sm font-bold">
          8 Players joined
        </p>

        <button type="button"
          class="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          Complete
        </button>
      </div>
    </div>


    <draggable v-model="draggableList" class="flex gap-8 items-center justify-center" :component-data="{
      tag: 'div',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }" v-bind="dragOptions" item-key="order">
      <template #item="{ element, index }">
        <div :key="index" class="list-group-item">
          <MusicCard :is-hidden="element?.hidden" :music="element" />
        </div>
      </template>
    </draggable>

    <div class="mt-10 p-3 rounded-full bg-red-500 flex justify-between items-center mx-auto max-w-[18rem] gap-3">
      <button type="button" disabled class="disabled:opacity-70">
        <IconPauseCircleBoldDuotone class="text-white text-3xl" aria-hidden="true" />
      </button>

      <div class="relative flex w-full">
        <span class="h-1 block rounded-lg absolute left-0 bg-white" :style="{
          width: `${playerLength}%`
        }" />
        <span class="w-full h-1 block rounded-lg bg-white/30" />
      </div>

      <button type="button" @click="handleVolume">
        <IconVolumeLoudBoldDuotine v-if="loud" class="text-white text-3xl" aria-hidden="true" />
        <IconVolumeCrossBoldDuotine v-else class="text-white text-3xl" aria-hidden="true" />
      </button>
    </div>

  </div>
</template>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #1f938d32;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: grab;
}
</style>
