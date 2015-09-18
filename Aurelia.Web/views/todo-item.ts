var ESC_KEY = 27;

export class TodoItem {
   constructor(
      public description: string,
      public id: number = -1,
      public isCompleted = false,
      public isEditing = false,
      public lastLabelClick = 0,
      public editTitle:string = null) {

      this.description = this.description.trim();
   }

   labelClicked() {
      var now = Date.now();
      var duration = now - this.lastLabelClick;

      if (duration < 350) {
         this.editTitle = this.description;
         this.isEditing = true;
      }

      this.lastLabelClick = Date.now();
   }

   finishEditing() {
      this.description = this.editTitle.trim();
      this.isEditing = false;
   }

   onKeyUp(ev) {
      if (ev.keyCode === ESC_KEY) {
         this.editTitle = this.description;
         this.isEditing = false;
      }
   }
}
 