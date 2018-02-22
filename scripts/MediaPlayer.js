/**
 * Media player
 *
 * @copyright: Erin Du
 * @author: Erin Du
 * @version: 1.2.0
 *
 * @summary: MediaPlayer App
 *
 */
'use strict';

class MediaPlayer {

    constructor(playlist) {
        app.private.members( this, {
            playlist: playlist,
            currentSong: undefined,
            currentSongInfo: undefined
	    });
	}

    nextSong() {
        let my = app.private.members( this );

        if (my.currentSong) {
            this.play((my.currentSongInfo.id + 1).toString());
        } else {
            this.play((1).toString());
        }
    }

    previousSong() {
        let my = app.private.members( this );

        // do nothing if it is the first song
        if (!my.currentSong || my.currentSongInfo.id == "0")
            return;

        this.play((my.currentSongInfo.id - 1).toString());

    }

    playAt(percentage) {
        if (!percentage)
            return;

        let my = app.private.members( this );

        if (!my.currentSong)
            return;

        my.currentSong.setPercent(percentage);

    }

    fastForward() {
        let my = app.private.members( this );

        if (!my.currentSong)
            return;

        my.currentSong.setTime(my.currentSong.getTime() + 10);
    }

    rewind() {
        let my = app.private.members( this );

        if (!my.currentSong)
            return;

        my.currentSong.setTime(my.currentSong.getTime() - 10);
    }

    pause() {
        let my = app.private.members( this );

        if (!my.currentSong)
            return;

        my.currentSong.pause();
    }

	stop() {
        let my = app.private.members( this );

        if (!my.currentSong)
            return;

        my.currentSong.stop();
        my.currentSong = undefined;
        my.currentSongInfo = undefined;
	};

    play(musicId) {
        let my = app.private.members( this );

        // if there is no song selected
        if (!musicId) {
            // if it is paused
            if (my.currentSong && my.currentSong.isPaused()) {
                // start the music from the position
                my.currentSong.togglePlay();
                return my.currentSongInfo;

            } else {
                // set first song as the default one
                musicId = "0";
            }
        }

        if (my.currentSongInfo) {
            if (my.currentSongInfo.id == musicId) {
                // attempted to play same song
                return;
            }else {
                // stop current song;
                this.stop();
            }
        }

        // get the song info which needs to be played
        let requestedSongInfo = my.playlist.get(musicId);

        if (!requestedSongInfo) {
            // there is no song to play
            return;
        }

        my.currentSongInfo = requestedSongInfo;

        // if it was first time to play or not
        if (my.currentSongInfo.audio) {
            // it was already cahced, don't need to get it again
            my.currentSong = my.currentSongInfo.audio;


        } else {
            // it is first time
            // get the file and create a buzz object
            my.currentSong = new buzz.sound(SERVER_DIR + my.currentSongInfo.path);

            // cache it into the object
            my.currentSongInfo.setAudio(my.currentSong);
        }

        my.currentSong.play();

    }

    getCurrentSongInfo() {
        let my = app.private.members( this );
        return my.currentSongInfo;
    }

    getCurrentSongTitle() {
        let my = app.private.members( this );

        if (!my.currentSongInfo)
            return "";

        return my.currentSongInfo.title;
    }

    getCurrentSongProgress() {
        let my = app.private.members( this );

        if (!my.currentSong)
            return 0;

        return my.currentSong.getPercent();
    }


}
