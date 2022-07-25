import AudioPlayer from './src/AudioPlayer'
import './assets/css/iconfont.css'

AudioPlayer.install = (Vue) => {
    Vue.component(AudioPlayer.name, AudioPlayer);
}

export default AudioPlayer;