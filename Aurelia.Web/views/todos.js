define(["require", "exports", "./todo-item", "underscore", "../services/todoService"], function (require, exports, t, _, service) {
    var Todos = (function () {
        function Todos(toDoSvc, items, filteredItems, filter, newTodoTitle, areAllChecked) {
            if (items === void 0) { items = []; }
            if (filteredItems === void 0) { filteredItems = []; }
            if (filter === void 0) { filter = ""; }
            if (newTodoTitle === void 0) { newTodoTitle = null; }
            if (areAllChecked === void 0) { areAllChecked = false; }
            this.toDoSvc = toDoSvc;
            this.items = items;
            this.filteredItems = filteredItems;
            this.filter = filter;
            this.newTodoTitle = newTodoTitle;
            this.areAllChecked = areAllChecked;
        }
        Todos.prototype.activate = function (params) {
            var _this = this;
            this.toDoSvc.getAll().then(function (result) {
                _.forEach(result, function (item) {
                    var newTodoItem = new t.TodoItem(item.description, item.id, item.isComplete);
                    _this.items.push(newTodoItem);
                    Object["observe"](newTodoItem, function (ev) { return _this.onItemChanged(ev); }, ["update"]);
                });
            });
            this.updateFilteredItems(params.filter);
        };
        Todos.prototype.addNewTodo = function (title) {
            var _this = this;
            if (title === void 0) { title = this.newTodoTitle; }
            if (title == undefined)
                return;
            title = title.trim();
            if (title.length === 0)
                return;
            this.toDoSvc.create({ id: -1, description: title, isComplete: false }).then(function (result) {
                var newTodoItem = new t.TodoItem(result.description, result.id, result.isComplete);
                _this.items.push(newTodoItem);
                Object["observe"](newTodoItem, function (ev) { return _this.onItemChanged(ev); });
                _this.newTodoTitle = null;
                _this.updateFilteredItems(_this.filter);
            });
        };
        Todos.prototype.areAllCheckedChanged = function () {
            var _this = this;
            _.each(this.items, function (i) { return i.isCompleted = _this.areAllChecked; });
            this.updateFilteredItems(this.filter);
        };
        Todos.prototype.clearCompletedTodos = function () {
            this.items = _(this.items).filter(function (i) { return !i.isCompleted; });
            this.areAllChecked = false;
            this.updateFilteredItems(this.filter);
            //this.save();
        };
        Todos.prototype.deleteTodo = function (todoItem) {
            var _this = this;
            this.toDoSvc.delete(todoItem.id).then(function () {
                _this.items = _(_this.items).without(todoItem);
                _this.updateFilteredItems(_this.filter);
            });
        };
        Todos.prototype.onItemChanged = function (ev) {
            var _this = this;
            if (ev[0].name !== "description" && ev[0].name !== "isCompleted") {
                return;
            }
            var todoItem = ev[0].object;
            if (todoItem.description === "") {
                this.deleteTodo(todoItem);
                return;
            }
            this.toDoSvc.update({ id: todoItem.id, description: todoItem.description, isComplete: todoItem.isCompleted }).then(function () {
                _this.areAllChecked = _(_this.items).all(function (i) { return i.isCompleted; });
                _this.updateFilteredItems(_this.filter);
            });
        };
        Object.defineProperty(Todos.prototype, "countTodosLeft", {
            get: function () {
                return _(this.items).filter(function (i) { return !i.isCompleted; }).length;
            },
            enumerable: true,
            configurable: true
        });
        Todos.prototype.updateFilteredItems = function (filter) {
            this.filter = filter;
            switch (filter) {
                case "active":
                    this.filteredItems = _(this.items).filter(function (i) { return !i.isCompleted; });
                    break;
                case "completed":
                    this.filteredItems = _(this.items).filter(function (i) { return i.isCompleted; });
                    break;
                default:
                    this.filteredItems = this.items;
                    break;
            }
        };
        Todos.inject = [service.ToDoService];
        return Todos;
    })();
    exports.Todos = Todos;
});
//# sourceMappingURL=todos.js.map