import database from '~/data/database';
import { Music } from '~/types/App';

const timer = ref('00:00')
const { playlist } = database

const musicList = ref<Music[]>([
  { "title": "Johnny B. Goode", "artist": "Chuck Berry", "year": 1958 },
  { "title": "Like a Rolling Stone", "artist": "Bob Dylan", "year": 1965 },
  { "title": "Good Vibrations", "artist": "The Beach Boys", "year": 1966 },
])
const draggableList = ref<Music[]>([])

const randomMusic = computed(() => {
  const filteredMusic = playlist.filter(item =>
    !musicList.value.some(excluded =>
      excluded.title === item.title && excluded.artist === item.artist && excluded.year === item.year
    )
  );

  const randomIndex = Math.floor(Math.random() * filteredMusic.length);
  let randomMusicItem = filteredMusic[randomIndex]
  randomMusicItem.hidden = true
  randomMusicItem.random = true
  return randomMusicItem
})

export function useMusic() {
  return {
    timer,
    musicList,
    draggableList,
    randomMusic
  }
}
