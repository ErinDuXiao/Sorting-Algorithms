/**
 * Insertion sort visualization
 *
 * @copyright: Erin Du
 * @author: Erin Du
 * @version: 1.2.0
 *
 * @summary: Framework Singleton Class to contain a web app
 *
 */
'use strict';

class QuickSort {

    constructor(entities, startIdx, lastIdx, lastSortFlg) {
        this.entities = entities;
        this.currentTask = [];
        this.lastSortFlg = lastSortFlg;
        this.postQuickSortTask = [];
        this.startIdx = startIdx;

        if (lastSortFlg) {
            this.partitionIndex = Math.floor((lastIdx - startIdx)/2) + startIdx;
            this.lastIndex = lastIdx;
            this.pivot = this.entities[this.partitionIndex];
            this.currentIndex = startIdx;

        } else {
            this.partitionIndex = Math.floor(this.entities.length/2);
            this.lastIndex = this.entities.length-1;
            this.pivot = this.entities[this.partitionIndex];
            this.currentIndex = 0;
        }

	}

    update() {
       this.sort();
    }

     sort() {
         if (this.currentIndex >= this.lastIndex) {
            // end
            if (this.lastSortFlg) {
                if (this.postQuickSortTask.length == 0) {
                    this.postQuickSortTask.push(new InsertionSort(this.entities, this.startIdx, this.currentIndex));
                    this.postQuickSortTask.push(new InsertionSort(this.entities, this.currentIndex, this.lastIndex));
                } else {
                    this.postQuickSortTask[0].update();
                    this.postQuickSortTask[1].update();
                }
                return;
            }

            if (this.currentTask.length == 0) {
                this.currentTask.push(new QuickSort(this.entities, 0, this.currentIndex, true));
                this.currentTask.push(new QuickSort(this.entities, this.currentIndex, this.entities.length-1, true));
            } else {
                this.currentTask[0].update();
                this.currentTask[1].update();

            }

            return;
         }

         let currentItem = this.entities[this.currentIndex];

         // if (!currentItem)
         //    return;

         if (this.pivot.height > currentItem.height) {
             // put left
             this.currentIndex++;

         } else {
             // put right
             let last = this.entities[this.lastIndex];
             if (last.height < this.pivot.height) {
                 // swap
                 this.entities[this.currentIndex] = last;
                 this.entities[this.lastIndex] = currentItem;
                 this.currentIndex++;
                 this.lastIndex--;
             } else {
                 this.lastIndex--;
             }
         }
     }
}
