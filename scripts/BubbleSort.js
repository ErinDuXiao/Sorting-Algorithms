/**
 * Insertion sort visualization
 *
 * @copyright: Erin Du
 * @author: Erin Du
 * @version: 1.2.0
 *
 * @summary:
 *
 */
'use strict';

class BubbleSort {

    constructor(entities) {
        this.entities = entities;
        this.bubbleCurrentStart = 0;
        this.currentIndex = 0;
	}

    update() {
       this.sort();
    }

     sort() {
         if (this.currentIndex < this.entities.length-1) {
             let currentItem = this.entities[this.currentIndex];
             let nextItem = this.entities[this.currentIndex+1];

             if(currentItem.height > nextItem.height) {
                 this.entities[this.currentIndex] = nextItem;
                 this.entities[this.currentIndex+1] = currentItem;
             }
             this.currentIndex++;
         } else {
             this.bubbleCurrentStart++;
             this.currentIndex = this.bubbleCurrentStart;
         }
     }
}
