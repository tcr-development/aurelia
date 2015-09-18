using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Aurelia.Web.Controllers {
   public class ToDoApiController : ApiController {
      // GET: api/ToDoApi
      public IHttpActionResult Get() {
         return Ok(ToDoItems);
      }

      // GET: api/ToDoApi/5
      public IHttpActionResult Get(int id) {
         var retVal = ToDoItems.SingleOrDefault(x => x.Id == id);
         
         if (retVal == null) {
            return NotFound();
         }

         return Ok(retVal);
      }

      // POST: api/ToDoApi
      public IHttpActionResult Post(ToDoItemPostModel value) {
         if (!ModelState.IsValid) {
            return BadRequest(ModelState);
         }

         var newItem = new ToDoItem {
            Id = ToDoItems.Max(x => x.Id) + 1,
            Description = value.Description,
            IsComplete = value.IsComplete
         };

         ToDoItems.Add(newItem);

         return CreatedAtRoute(WebApiConfig.ApiControllerAndId, new { id = newItem.Id }, newItem);
      }

      // PUT: api/ToDoApi/5
      public IHttpActionResult Put(ToDoItem value) {
         if (!ModelState.IsValid) {
            return BadRequest(ModelState);
         }
         try {

            var existingItem = ToDoItems.SingleOrDefault(x => x.Id == value.Id);
            if (existingItem == null) {
               return NotFound();
            }

            existingItem.IsComplete = value.IsComplete;
            existingItem.Description = value.Description;

            return Ok(existingItem);

         }
         catch {
            return InternalServerError();
         }

      }

      // DELETE: api/ToDoApi/5
      public IHttpActionResult Delete(int id) {
         var existingItem = ToDoItems.SingleOrDefault(x => x.Id == id);
         if (existingItem == null) {
            return NotFound();
         }

         ToDoItems.Remove(existingItem);

         return Ok();
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

   public class ToDoItemPostModel {
      public int? Id { get; set; }
      public string Description { get; set; }
      public bool IsComplete { get; set; }

   }
}
