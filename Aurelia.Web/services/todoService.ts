import http = require("aurelia-http-client");

export interface IToDoItem {
   description: string;
   isComplete: boolean;
   id: number;
}

export class ToDoService {
   static inject = [http.HttpClient];

   constructor(private httpClient: http.HttpClient) { }

   create(newItem: IToDoItem): Promise<IToDoItem> {
      return this.httpClient.post("api/ToDoApi", newItem).then(result => {
         return result.content;
      });
   }

   delete(id: number): Promise<boolean> {
      return this.httpClient.delete(`api/ToDoApi?id=${id}`).then(() => {
         return true;
      });
   }

   getAll() : Promise<IToDoItem[]> {
      return this.httpClient.get("api/ToDoApi").then(result => {
         return result.content;
      });
   }

   update(item: IToDoItem): Promise<IToDoItem> {
      return this.httpClient.put("api/ToDoApi", item).then(result => {
         return result.content;
      });
   }
}