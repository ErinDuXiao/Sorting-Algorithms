/**
 * App MAIN
 *
 * @copyright: Erin Du
 * @author: Erin Du
 * @version: 1.2.0
 *
 * @summary: Framework Singleton Class to contain a web app
 *
 */
'use strict';
const SECONDS_AS_MS = 1000;
const TARGET_FPS    = 60;
const TARGET_MS_PER_TICK = SECONDS_AS_MS / TARGET_FPS;

Array.prototype.shuffle = function() {
    let self = this;

    for (let i = self.length-1; i >=0; i--) {

        let randomIndex = Math.floor(Math.random()*(i+1));
        let itemAtIndex = self[randomIndex];

        self[randomIndex] = self[i];
        self[i] = itemAtIndex;
    }
    return self;
}

class App {

    constructor() {
        this.bubbleSortEntities = [];
        this.insertionSortEntities = [];
        this.quickSortEntities = [];
        this.lastTime = 0;
        this.setupEntities();
	}

    setupEntities() {
        let entityNum = 256;
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            // is mobile
            entityNum = 128;
        }

        let entity;
        for (let i = 0; i < entityNum; i++) {
            entity = new Entity("e-" + i, this.normalize(i, 0, 256) * 100, i);
            $(".display-area.bubble-sort").append(`<div class="entity ${entity.id}"></div>`);
            $(".display-area.insertion-sort").append(`<div class="entity ${entity.id}"></div>`);
            $(".display-area.quick-sort").append(`<div class="entity ${entity.id}"></div>`);
            this.bubbleSortEntities.push(entity);
        }
        this.bubbleSortEntities.shuffle();
        this.insertionSortEntities = this.bubbleSortEntities.slice();
        this.quickSortEntities = this.bubbleSortEntities.slice();
    }

    // TODO: move this to other class
    normalize(val, max, min) { return (val - min) / (max - min); }

    run() {
        this.bubbleSort = new BubbleSort(this.bubbleSortEntities);
        this.insertionSort = new InsertionSort(this.insertionSortEntities);
        this.quickSort = new QuickSort(this.quickSortEntities);
        this._start();

    }

    _start() {
        window.requestAnimationFrame( ( TARGET_MS_PER_TICK ) => { this._frame( TARGET_MS_PER_TICK ); } );
    }

    _frame( time ) {
          let seconds = (time - this.lastTime) / SECONDS_AS_MS;
          this.lastTime = time;

          this._update( seconds );
          this._render( seconds );

          window.requestAnimationFrame( ( seconds ) => { this._frame( seconds ); } );
     }

     _update(seconds) {
         this.bubbleSort.update();
         this.insertionSort.update();
         this.quickSort.update();
     }

     _render(seconds) {
         $(".display-area.bubble-sort").children(".entity").each((i, e) => {
             $(e).css({"height" : this.bubbleSortEntities[i].height + "px", "background-color": `hsl(${this.bubbleSortEntities[i].color}, 60%, 50%)`});
         });
         $(".display-area.insertion-sort").children(".entity").each((i, e) => {
             $(e).css({"height" : this.insertionSortEntities[i].height + "px", "background-color": `hsl(${this.insertionSortEntities[i].color}, 60%, 50%)`});
         });
         $(".display-area.quick-sort").children(".entity").each((i, e) => {
             $(e).css({"height" : this.quickSortEntities[i].height + "px", "background-color": `hsl(${this.quickSortEntities[i].color}, 60%, 50%)`});
         });
     }

}
$(document).ready( (event) => {

    let appMain = new App();
    appMain.run();

});
