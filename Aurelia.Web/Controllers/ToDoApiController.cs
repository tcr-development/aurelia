using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Aurelia.Web.Controllers {
   public class ToDoApiController : ApiController {
      // GET: api/ToDoApi
      public IEnumerable<ToDoItem> Get() {
         return ToDoItems;
      }

      // GET: api/ToDoApi/5
      public ToDoItem Get(int id) {
         return ToDoItems.Single(x => x.Id == id);
      }

      // POST: api/ToDoApi
      public void Post([FromBody]string value) {
      }

      // PUT: api/ToDoApi/5
      public void Put(int id, [FromBody]string value) {
      }

      // DELETE: api/ToDoApi/5
      public void Delete(int id) {
      }

      private static readonly List<ToDoItem> ToDoItems = new List<ToDoItem> {
         new ToDoItem { Id = 1, Description = "test this from api", IsComplete = false},
         new ToDoItem { Id = 2, Description = "again from api", IsComplete = true},
         new ToDoItem { Id = 3, Description = "another item", IsComplete = false}
      };
   }

   public class ToDoItem {
      public int Id { get; set; }
      public string Description { get; set; }
      public bool IsComplete { get; set; }
   }
}
