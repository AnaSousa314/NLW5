import { useContext, useEffect, useRef } from 'react';
import { PlayerContext } from '../../../contexts/PlayerContext';
import Image from 'next/image';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import styles from './styles.module.scss';

export function Player(){

const audioRef = useRef<HTMLAudioElement>(null);//pega a referencia da tag audio do html 

const {
  episodeList, 
  currentEpisodeIndex, 
  isPlaying, 
  togglePlay,
  setPlayingState
} = useContext(PlayerContext);

useEffect(()=>{
  if(!audioRef.current){
    return;
  }

  if(isPlaying){
    audioRef.current.play();
  }else{
    audioRef.current.pause();

  }
},[isPlaying])

const episode = episodeList[currentEpisodeIndex]

console.log(episode);

return(
  <div className={styles.playerContainer}>
    <header>
      <img src="/playing.svg" alt="Tocando agora"/>
      <strong>Tocando agora</strong>
    </header>
    
    { episode ? (
    <div className={styles.currentEpisode}>
        <Image 
          width={592} 
          height={592} 
          src={episode.thumbnail} objectFit="cover"
        />

        <strong>{episode.title}</strong>  
        <span>{episode.members}</span>
    </div>
    ):(
      <div className={styles.emptyPlayer}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>
    )}

      <footer className={!episode ? styles.empty : ''}>

        <div className={styles.progress}>

          <span>00:00</span>

          <div className={styles.slider}>
              {episode ? (
                <Slider
                  trackStyle={{ backgroundColor: '#04d361'}}
                  railStyle={{backgroundColor:'#9f75ff'}}
                  handleStyle={{borderColor:'#04d361', borderWidth:4}}
                />
                ) : (
                  <div className={styles.emptySlider} />
                )}
          </div>

          <span>00:00</span>
        </div>

        { episode && (
          <audio 
            src={episode.url}  
            ref={audioRef}
            autoPlay
            onPlay={()=>setPlayingState(true)}//pelo teclado, muda botão
            onPause={()=>setPlayingState(false)}//pelo teclado
          />

        )}


        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar"/>
          </button>

          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior"/>
          </button>

          <button 
          type="button" 
          className={styles.playButton} disabled={!episode}
          onClick={togglePlay}
          >
              { isPlaying 
              ? <img src="/pause.svg" alt="Tocar"/>
              : <img src="/play.svg" alt="Tocar"/>
            }
          </button>

          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar próxima"/>
          </button>

          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repertir"/>
          </button>
        </div>
      </footer>
  </div>
);

}

//sem default, a importação é feita automaticamente. só pode ser feito nos componentes