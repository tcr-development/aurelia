import aur = require("aurelia-router");

export class App {
   static inject = [aur.Router];

   constructor(private router: aur.Router) {
      this.router.configure((config) => {
         config.title = "TodoMvc";
         config.map([
            { route: ["", ":filter"], moduleId: "views/todos", nav: true }
         ]);
         return config;
      });
   }
}