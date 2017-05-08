"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var meeting = [
            { id: 1, title: 'mis', date: '10-2-2020', place: 'alex', purpose: 'gathering', priority: 'Max', state: 'Active' }
        ];
        return { meeting: meeting };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map