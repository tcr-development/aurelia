define(["require", "exports"], function (require, exports) {
    var ESC_KEY = 27;
    var TodoItem = (function () {
        function TodoItem(description, id, isCompleted, isEditing, lastLabelClick, editTitle) {
            if (id === void 0) { id = -1; }
            if (isCompleted === void 0) { isCompleted = false; }
            if (isEditing === void 0) { isEditing = false; }
            if (lastLabelClick === void 0) { lastLabelClick = 0; }
            if (editTitle === void 0) { editTitle = null; }
            this.description = description;
            this.id = id;
            this.isCompleted = isCompleted;
            this.isEditing = isEditing;
            this.lastLabelClick = lastLabelClick;
            this.editTitle = editTitle;
            this.description = this.description.trim();
        }
        TodoItem.prototype.labelClicked = function () {
            var now = Date.now();
            var duration = now - this.lastLabelClick;
            if (duration < 350) {
                this.editTitle = this.description;
                this.isEditing = true;
            }
            this.lastLabelClick = Date.now();
        };
        TodoItem.prototype.finishEditing = function () {
            this.description = this.editTitle.trim();
            this.isEditing = false;
        };
        TodoItem.prototype.onKeyUp = function (ev) {
            if (ev.keyCode === ESC_KEY) {
                this.editTitle = this.description;
                this.isEditing = false;
            }
        };
        return TodoItem;
    })();
    exports.TodoItem = TodoItem;
});
//# sourceMappingURL=todo-item.js.map