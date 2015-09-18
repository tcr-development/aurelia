var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    var Focus = (function () {
        function Focus(element) {
            this.element = element;
        }
        Focus.prototype.valueChanged = function (value) {
            if (value) {
                this.element.focus();
            }
        };
        __decorate([
            aurelia_framework_1.bindable, 
            __metadata('design:type', Object)
        ], Focus.prototype, "value");
        Focus = __decorate([
            aurelia_framework_1.customAttribute('focus', null),
            aurelia_framework_1.inject(Element), 
            __metadata('design:paramtypes', [HTMLElement])
        ], Focus);
        return Focus;
    })();
    exports.Focus = Focus;
});
//# sourceMappingURL=focus.js.map