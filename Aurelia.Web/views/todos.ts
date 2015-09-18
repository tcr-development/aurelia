import t = require("./todo-item");
import _ = require("underscore");
import service = require("../services/todoService");

export class Todos {
   static inject = [service.ToDoService];

   constructor(
      private toDoSvc: service.ToDoService,
      public items: t.TodoItem[] = [],
      public filteredItems: t.TodoItem[] = [],
      public filter = "",
      public newTodoTitle = null,
      public areAllChecked = false) {
   }

   activate(params) {
      if (this.items.length < 1) {
         this.toDoSvc.getAll().then(result => {
            _.forEach(result, item => {
               var newTodoItem = new t.TodoItem(item.description, item.id, item.isComplete);
               this.items.push(newTodoItem);
               Object["observe"](newTodoItem, (ev) => this.onItemChanged(ev), ["update"]);
            });
            this.updateFilteredItems(params.filter);
         });
      } else {
         this.updateFilteredItems(params.filter);   
      }
   }

   addNewTodo(title = this.newTodoTitle) {
      if (title == undefined) return;

      title = title.trim();
      if (title.length === 0) return;

      this.toDoSvc.create({ id: -1, description: title, isComplete: false }).then(result => {
         var newTodoItem = new t.TodoItem(result.description, result.id, result.isComplete);
         this.items.push(newTodoItem);
         Object["observe"](newTodoItem, (ev) => this.onItemChanged(ev));
         this.newTodoTitle = null;
         this.updateFilteredItems(this.filter);
      });
   }

   areAllCheckedChanged() {
      _.each(this.items, i => i.isCompleted = this.areAllChecked);
      this.updateFilteredItems(this.filter);
   }

   clearCompletedTodos() {
      this.items = _(this.items).filter(i => !i.isCompleted);
      this.areAllChecked = false;
      this.updateFilteredItems(this.filter);
      //this.save();
   }

   deleteTodo(todoItem) {
      this.toDoSvc.delete(todoItem.id).then(() => {
         this.items = _(this.items).without(todoItem);
         this.updateFilteredItems(this.filter);
      });
   }

   onItemChanged(ev) {
      if (ev[0].name !== "description" && ev[0].name !== "isCompleted") {
         return;
      }
      var todoItem = <t.TodoItem>ev[0].object;
      if (todoItem.description === "") {
         this.deleteTodo(todoItem);
         return;
      }

      this.toDoSvc.update({id: todoItem.id, description: todoItem.description, isComplete: todoItem.isCompleted}).then(() => {
         this.areAllChecked = _(this.items).all(i => i.isCompleted);
         this.updateFilteredItems(this.filter);
      });
   }

   get countTodosLeft() {
      return _(this.items).filter(i => !i.isCompleted).length;
   }

   updateFilteredItems(filter) {
      this.filter = filter;

      switch (filter) {
         case "active":
            this.filteredItems = _(this.items).filter(i => !i.isCompleted);
            break;
         case "completed":
            this.filteredItems = _(this.items).filter(i => i.isCompleted);
            break;
         default:
            this.filteredItems = this.items;
            break;
      }
   }

}
