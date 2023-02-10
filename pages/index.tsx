import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { scales } from './helpers/scale.helper';
import { notes } from './helpers/notes.helper';
import { Chords, chordsInScale } from './helpers/chord.helper';

interface Song {
  scale: string;
  tune: Tune[];
}

interface Tune {
  position?: number;
  chord?: number;
  startBeat: number;
  endBeat: number;
}

function playNotes(song: Song, tempo: number) {
  const audioCtx = new AudioContext();
  const beatDuration = 60 / tempo;
  let startTime = audioCtx.currentTime;
  let endTime = startTime;

  // TODO: Add Chord Handling
  song.tune.forEach((note) => {
    if (note.position) {
      // TODO: Sort out octaves
      const frequency = notes[`${scales[song.scale][note.position - 1]}4`];

      startTime = endTime;
      endTime = startTime + (note.endBeat - note.startBeat) * beatDuration;

      const oscillator = audioCtx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      oscillator.connect(audioCtx.destination);
      oscillator.start(startTime);
      oscillator.stop(endTime);
    };
  });
}

const playSong = () => {
  const song = {
    scale: 'A minor',
    tune: [
      { position: 6, startBeat: 1, endBeat: 1.3 },
      { position: 7, startBeat: 1.4, endBeat: 1.6 },
      { position: 6, startBeat: 1.7, endBeat: 2 },
      { position: 4, startBeat: 2, endBeat: 3 },
      { position: 1, startBeat: 3, endBeat: 4 },
      { position: 5, startBeat: 4, endBeat: 5 },
    ]
  }

  playNotes(song, 60);
};



export default function Home() {
  return (
    <>
      <Head>
        <title>Create A Song</title>
        <meta name="description" content="Create A Song" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>

        <button onClick={playSong}>Play Song</button>

      </main>
    </>
  )
}
