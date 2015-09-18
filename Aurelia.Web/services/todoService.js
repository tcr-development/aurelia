define(["require", "exports", "aurelia-http-client"], function (require, exports, http) {
    var ToDoService = (function () {
        function ToDoService(httpClient) {
            this.httpClient = httpClient;
        }
        ToDoService.prototype.create = function (newItem) {
            return this.httpClient.post("api/ToDoApi", newItem).then(function (result) {
                return result.content;
            });
        };
        ToDoService.prototype.delete = function (id) {
            return this.httpClient.delete("api/ToDoApi?id=" + id).then(function () {
                return true;
            });
        };
        ToDoService.prototype.getAll = function () {
            return this.httpClient.get("api/ToDoApi").then(function (result) {
                return result.content;
            });
        };
        ToDoService.prototype.update = function (item) {
            return this.httpClient.put("api/ToDoApi", item).then(function (result) {
                return result.content;
            });
        };
        ToDoService.inject = [http.HttpClient];
        return ToDoService;
    })();
    exports.ToDoService = ToDoService;
});
//# sourceMappingURL=todoService.js.map