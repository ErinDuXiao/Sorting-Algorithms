/**
 * Audio Track
 *
 * @copyright: Erin Du
 * @author: Erin Du
 * @version: 1.2.0
 *
 * @summary: Framework Singleton Class to contain a web app
 *
 */
'use strict';

class Product {
    constructor(id, name, artist, album, duration, path) {
        this.id = id;
        this.title = name;
        this.artist = artist;
        this.album = album;
        this.duration = duration;
        this.path = path;
        this.audio = undefined;
    }

    setAudio(audio) {
        this.audio = audio;
    }
}
