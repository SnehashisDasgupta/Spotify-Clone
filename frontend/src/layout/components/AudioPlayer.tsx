import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, playNext, isPlaying } = usePlayerStore();

  // handle play/pause logic
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  // handle song ends
  useEffect(() => {
    const audio = audioRef.current; // current audio element

    const handleEnded = () => {
      playNext();
    };

    audio?.addEventListener("ended", handleEnded); // add event listener

    // when the song ends, eventListner will ended and triggers the 'playNext' function
    return () => audio?.removeEventListener("ended", handleEnded); // remove event listener
  }, [playNext]);

  // handle song changes
  useEffect(() => {
    if (!currentSong || !audioRef.current) return;

    const audio = audioRef.current; // current audio element

    const isSongChange = prevSongRef.current !== currentSong?.audioUrl; // check if the song has changed

    if (isSongChange) {
      audio.src = currentSong?.audioUrl; // update audio source
      audio.currentTime = 0; // reset playback position
      prevSongRef.current = currentSong?.audioUrl; // update prevSongRef
      if (isPlaying) audio.play(); // play the song
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
