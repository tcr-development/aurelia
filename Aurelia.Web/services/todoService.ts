import http = require("aurelia-http-client");

export interface IToDoItem {
   description: string;
   isComplete: boolean;
   id: number;
}

export class ToDoService {
   static inject = [http.HttpClient];

   constructor(private httpClient: http.HttpClient) {
      
   }

   getAll() : Promise<IToDoItem[]> {
      return this.httpClient.get("api/ToDoApi").then(result => {
         return result.content;
      });
   }
}