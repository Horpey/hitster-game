<script lang="ts" setup>
import IconPlayStreamBoldDuotone from 'virtual:icons/solar/play-stream-bold-duotone'
import draggable from 'vuedraggable'
import { useMusic } from '~/composables/useMusic'
import { Music } from '~/types/App';

const { timer, musicList, randomMusic, draggableList } = useMusic()


const drag = ref(false)

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost',
  }
})



onMounted(() => {
  draggableList.value = [
    randomMusic.value,
    ...musicList.value
  ]
})
</script>

<template>
  <div class="mx-auto md:py-20 py-6 max-w-6xl">
    <div class="rounded-xl mb-10 md:mx-12 mx-3 p-6 bg-gray-50 flex justify-between items-center">
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
        <p class="text-sm font-bold hidden md:block">
          8 Players joined
        </p>

        <button type="button" disabled
          class="rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          {{ timer }}
        </button>
      </div>
    </div>


    <draggable v-model="draggableList" class="flex md:gap-8 gap-4 items-center justify-center" :component-data="{
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

    <MusicControl />
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
