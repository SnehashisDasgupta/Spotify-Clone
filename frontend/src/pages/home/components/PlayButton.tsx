import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore"
import { Song } from "@/types"
import { Pause, Play } from "lucide-react";

const PlayButton = ({song}: {song: Song}) => {
    const { currentSong, togglePlay, setCurrentSong, isPlaying } = usePlayerStore();
    const isCurrentSong = song._id === currentSong?._id;

    const handlePlay = () => {
        if (isCurrentSong) togglePlay();
        else setCurrentSong(song);
    }

  return (
    <Button
        size={"icon"}
        onClick={handlePlay}
        className={`absolute bottom-3 right-2 bg-gray-800 hover:bg-gray-700 hover:scale-105 transition-all opacity-0 translate-y-2 group-hover:translate-y-0 ${isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
    >
        { isCurrentSong && isPlaying ? (
            <Pause className="size-5 text-green-500" />
        ) : (
            <Play className="size-5 text-green-500" />
        )}
    </Button>
  )
}

export default PlayButton