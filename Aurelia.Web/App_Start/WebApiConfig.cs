using Newtonsoft.Json.Serialization;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Aurelia.Web {
   public static class WebApiConfig {

      public static string ApiControllerOnly = "ApiControllerOnly";
      public static string ApiControllerAndId = "ApiControllerAndId";

      public static void Register(HttpConfiguration config) {
         // Web API configuration and services

         // Web API routes
         config.MapHttpAttributeRoutes();

         //api/todoapi/5
         config.Routes.MapHttpRoute(
             name: ApiControllerAndId,
             routeTemplate: "api/{controller}/{id}",
             defaults: null,
             constraints: new { id = @"^\d+$" } // all digits
         );

         //api/todoapi
         config.Routes.MapHttpRoute(
             name: ApiControllerOnly,
             routeTemplate: "api/{controller}"
         );

         var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
         jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
      }
   }
}
