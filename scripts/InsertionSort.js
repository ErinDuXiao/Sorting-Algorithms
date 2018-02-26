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

class InsertionSort {

    constructor(entities, from, to) {
        this.entities = entities;
        this.insertionSortStart = 0;
        this.currentIndex = 0;
        if (from && to) {
            this.from = from;
            this.to = to;
        } else {
            this.from = 0;
            this.to = entities.length - 1;
        }
	}

     update() {
        this.sort();
     }

     sort() {
         if (this.insertionSortStart == 0) {
             let currentItem = this.entities[this.from];
             let nextItem = this.entities[this.from + 1];

             if(currentItem.height > nextItem.height) {
                 this.entities[this.from] = nextItem;
                 this.entities[this.from + 1] = currentItem;
             }

             this.insertionSortStart = this.from + 2;

         } else {

             if (this.currentIndex == 0) {
                 this.currentIndex = this.insertionSortStart;
                 this.insertionSortStart++;
             } else {

                 let currentItem = this.entities[this.currentIndex];
                 let previousItem = this.entities[this.currentIndex-1];

                 if (!currentItem || !previousItem)
                    return;

                 if(currentItem.height < previousItem.height) {
                     this.entities[this.currentIndex] = previousItem;
                     this.entities[this.currentIndex-1] = currentItem;
                     this.currentIndex--;
                 } else {
                     this.currentIndex = 0;
                 }


             }

         }
     }
}
