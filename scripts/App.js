/**
 * App Singleton MAIN
 *
 * @copyright: Erin Du
 * @author: Erin Du
 * @version: 1.2.0
 *
 * @summary: Framework Singleton Class to contain a web app
 *
 */
'use strict';

// import {PDATA} from "./PrivateData.js";

// if you does this way you can instansiate the class like other languages.
// import {PDATA, PrivateDataManager} from "./PrivateData.js"
// let a = new PrivateDataManager();
class App {

    constructor() {
        app.private.members( this, {
            // done:   false,
            userId: 0,
            playlist: new Map(),
            mediaPlayer: undefined,
            lastTime: 0,
            isUserTouchingSlider: false
	    });

        this.setupHandlers();
        this.setupSlider();
	}

    setupSlider() {
        let my = app.private.members( this );

        $("#track-slider").bind( "mousedown touchstart", (event) => {
            // prevent auto update
            my.isUserTouchingSlider = true;
        });

        // Event bind for PC and mobile
        $("#track-slider").bind( "mouseup touchend", (event) => {
            this.sliderInputEvent(event);
            my.isUserTouchingSlider = false;
        });
    }

    sliderInputEvent(event) {
        // console.log(event.currentTarget.value);
        let my = app.private.members( this );
        my.mediaPlayer.playAt(event.currentTarget.value);
    }

    setupHandlers() {
        let my = app.private.members( this );

        $("#play-button").on("click", (event) => {
            my.mediaPlayer.play();
            // this.setNewSongToVisualizer();
        });

        $("#pause-button").on("click", (event) => {
            my.mediaPlayer.pause();
        });

        $("#fast-forward-button").on("click", (event) => {
            my.mediaPlayer.fastForward();
        });

        $("#rewind-button").on("click", (event) => {
            my.mediaPlayer.rewind();
        });

        $("#previous-song-button").on("click", (event) => {
            my.mediaPlayer.previousSong();
        });

        $("#next-song-button").on("click", (event) => {
            my.mediaPlayer.nextSong();
        });

        $("#play-list").on("click", "li", (event) => {
            my.mediaPlayer.play($(event.currentTarget).attr("data-music-id"));
            // this.setNewSongToVisualizer();
        });

    }

    // setNewSongToVisualizer() {
    //     let my = app.private.members( this );
    //     let currentSong = my.mediaPlayer.getCurrentSongInfo();
    //
    //     if (!currentSong.audio)
    //         return;
    //
    //     this.audioCtx.decodeAudioData(currentSong.audio.getBuffered, (buffer) => {
    //           let source = this.audioCtx.createBufferSource();
    //           source.buffer = buffer;
    //           source.connect(analyser);
    //           source.start(0);
    //     });
    // }

	run() {
        // Run the app
	    // One way to make private things easier to read as members

    	this.updateData();
    	this.refreshView();
	};

    // It is able to use then instead of then declear a function as async
	updateData() {
        // Update the app/simulation model
    	// is the app finished running?
    	let my = app.private.members( this );

        // Access server to get playlist
        $.post(SERVER, "action=get_playlist")
            .then((data) => {
                 console.log(data);
	             let result = JSON.parse(data);
                 console.log(result);
                 if (!result.tracks) {
                     return;
                 }

                 let id = 0;
                 result.tracks.forEach((track) => {
                     my.playlist.set(`${id}`, new AudioTrack(id++, track.Title, track.Author, track.Album, track.length, track.FileName));
                 });

                 this.refreshView();
		    });

        // Initialize media player with the data
        my.mediaPlayer = new MediaPlayer(my.playlist);
    }

    refreshView(time) {
    	let my = app.private.members( this );
        // this.setupVisualizer();
        this.refreshPlaylist();
        this.realTimeRefresh();
    }

    realTimeRefresh(time) {
        let my = app.private.members( this );
        let seconds = (time - my.lastTime) / 1000;
        my.lastTime = time;

        this.refreshCurrentSongInfo();
        this.refreshSlider();
        // this.draw();

        window.requestAnimationFrame( ( seconds ) => { this.realTimeRefresh( seconds ); } );
    }

    // setupVisualizer() {
    //     // https://github.com/soarflat-sandbox/web-audio/tree/master/docs/demo3
    //     // Setup Audio Visualizer
    //     let my = app.private.members( this );
    //     if (!my.mediaPlayer)
    //         return;
    //
    //     this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    //     this.analyser = this.audioCtx.createAnalyser();
    //     this.bufferLength;
    //
    //     this.analyser.fftSize = 128; //2048
    //     this.bufferLength = this.analyser.frequencyBinCount;
    //
    //     for (let i = 0; i < this.analyser.fftSize; i++) {
    //         $("#image-viewer").append(`<div class="visualizer-element"></div>`);
    //     }
    //
    // }

    // draw() {
    //     let spectrums = new Uint8Array(this.bufferLength);
    //
    //     if (!this.analyser) return;
    //     this.analyser.getByteFrequencyData(spectrums);
    //     let visualizers = $("#image-viewer").children();
    //     for(var i = 0; i < this.bufferLength; i++) {
    //         visualizers[i].width = spectrums[i] + "px";
    //     }
    // }

    refreshPlaylist() {
        let my = app.private.members( this );
        let mapIter = my.playlist[Symbol.iterator]();
        for (var v of mapIter) {
            $("#play-list").append(`<li data-music-id="${v[1].id}">${v[1].title}</li>`);
        }
    }

    refreshCurrentSongInfo() {
        let my = app.private.members( this );
        if (my.mediaPlayer)
            $("#track-title").html(my.mediaPlayer.getCurrentSongTitle());
    }

    refreshSlider() {
        let my = app.private.members( this );

        if (my.isUserTouchingSlider)
            return; // do nothing

        let progress = my.mediaPlayer.getCurrentSongProgress();
        if (progress >= 100) {
            my.mediaPlayer.nextSong();
        }

        // update progress
        $("#track-slider").val(my.mediaPlayer.getCurrentSongProgress());
    }

    showModernStyle() {
        $(".win98").removeClass("win98");
    }

    showClassicStyle() {
        $("body").addClass("win98");
    }

    getCurrentSongTitle() {
        let my = app.private.members( this );
        return my.mediaPlayer.getCurrentSongTitle();
    }

}  // Run the unnamed function and assign the results to app for use.


// ===================================================================
// MAIN
// Define the set of private methods that you want to make public and return
// them
$(document).ready( (event) => {

    this.appMain = new App();
    appMain.run();

});
