define(["require", "exports", "aurelia-http-client"], function (require, exports, http) {
    var ToDoService = (function () {
        function ToDoService(httpClient) {
            this.httpClient = httpClient;
        }
        ToDoService.prototype.getAll = function () {
            return this.httpClient.get("api/ToDoApi").then(function (result) {
                return result.content;
            });
        };
        ToDoService.inject = [http.HttpClient];
        return ToDoService;
    })();
    exports.ToDoService = ToDoService;
});
//# sourceMappingURL=todoService.js.map