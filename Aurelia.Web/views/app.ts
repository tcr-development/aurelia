import aur = require("aurelia-router");

export class App {
   static inject = [aur.Router];

   constructor(private router: aur.Router) {
      this.router.configure((config) => {
         config.title = "TodoMvc";
         config.map([
            { route: ["", ":filter"], moduleId: "views/todos", title: "ToDos", nav: true },
            { route: "about", moduleId: "views/about/about", title: "About", nav: true }
         ]);
         return config;
      });
   }
}