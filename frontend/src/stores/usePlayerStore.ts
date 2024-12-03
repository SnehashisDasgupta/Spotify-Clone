import { Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;

    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex?: number) => void;
    setCurrentSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    // when page refresh
    initializeQueue: (songs: Song[]) => {
        // add the songs on the page to the queue serially
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
        });
    },

    // when user clicks on an album
    playAlbum: (songs: Song[], startIndex = 0) => {
        if (songs.length === 0) return;

        const song = songs[startIndex];

        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true,
        });
    },

    // when user clicks on a song
    setCurrentSong: (song: Song | null) => {
        if (!song) return;

        const songIndex = get().queue.findIndex((s) => s._id === song._id);

        set({
            currentSong: song,
            currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
            isPlaying: true,
        });
    },

    // when user clicks on the play/pause button
    togglePlay: () => {
        set({
            isPlaying: !get().isPlaying,
        });
    },

    // when user clicks on the next button
    playNext: () => {
        const { queue, currentIndex } = get();
        const nextIndex = currentIndex + 1;

        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex];
            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true,
            });
        } else {
            //no next Song
            set({ isPlaying: false });
        }
    },

    // when user clicks on the previous button
    playPrevious: () => {
        const { queue, currentIndex } = get();
        const previousIndex = currentIndex - 1;

        if (previousIndex >= 0) {
            const previousSong = queue[previousIndex];
            set({
                currentSong: previousSong,
                currentIndex: previousIndex,
                isPlaying: true,
            });
        } else {
            // no previous song
            set({ isPlaying: false });
        }
    },
}));