"use strict";

var __assign = undefined && undefined.__assign || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
    var _ = { label: 0, sent: function sent() {
            if (t[0] & 1) throw t[1];return t[1];
        }, trys: [], ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return step([n, v]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) {
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:case 1:
                        t = op;break;
                    case 4:
                        _.label++;return { value: op[1], done: false };
                    case 5:
                        _.label++;y = op[1];op = [0];continue;
                    case 7:
                        op = _.ops.pop();_.trys.pop();continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;continue;
                        }
                        if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                            _.label = op[1];break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];t = op;break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];_.ops.push(op);break;
                        }
                        if (t[2]) _.ops.pop();
                        _.trys.pop();continue;
                }
                op = body.call(thisArg, _);
            } catch (e) {
                op = [6, e];y = 0;
            } finally {
                f = t = 0;
            }
        }if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var NoSchemaError_1 = require("./util/NoSchemaError");
var apollo_link_1 = require("apollo-link");
var immutable_1 = require("immutable");
var makeOperation_1 = require("./util/makeOperation");
var parseHeaders_1 = require("./util/parseHeaders");
var SchemaFetcher = /** @class */function () {
    function SchemaFetcher(linkGetter) {
        this.subscriptions = immutable_1.Map();
        this.cache = immutable_1.Map();
        this.fetching = immutable_1.Map();
        this.linkGetter = linkGetter;
    }
    SchemaFetcher.prototype.fetch = function (session) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, cachedSchema, fetching, promise;
            return __generator(this, function (_a) {
                hash = this.hash(session);
                cachedSchema = this.cache.get(hash);
                if (cachedSchema) {
                    return [2 /*return*/, cachedSchema];
                }
                fetching = this.fetching.get(hash);
                if (fetching) {
                    return [2 /*return*/, fetching];
                }
                promise = this.fetchSchema(session);
                this.fetching = this.fetching.set(hash, promise);
                return [2 /*return*/, promise];
            });
        });
    };
    SchemaFetcher.prototype.subscribe = function (session, cb) {
        var hash = this.hash(session);
        this.subscriptions = this.subscriptions.set(hash, cb);
    };
    SchemaFetcher.prototype.refetch = function (session) {
        return this.fetchSchema(session);
    };
    SchemaFetcher.prototype.hash = function (session) {
        return session.endpoint + "~" + (session.headers || '');
    };
    SchemaFetcher.prototype.fetchSchema = function (session) {
        var _this = this;
        var hash = this.hash(session);
        var endpoint = session.endpoint;
        var headers = __assign({}, parseHeaders_1.parseHeaders(session.headers), { 'X-Apollo-Tracing': '1' });
        var options = immutable_1.set(session, 'headers', headers);
        var link = this.linkGetter(options).link;
        var operation = makeOperation_1.makeOperation({ query: graphql_1.introspectionQuery });
        return new Promise(function (resolve, reject) {
            apollo_link_1.execute(link, operation).subscribe({
                next: function next(schemaData) {
                    if (schemaData && (schemaData.errors && schemaData.errors.length > 0 || !schemaData.data)) {
                        throw new Error(JSON.stringify(schemaData, null, 2));
                    }
                    if (!schemaData) {
                        throw new NoSchemaError_1.NoSchemaError(endpoint);
                    }
                    var schema = graphql_1.buildClientSchema(schemaData.data);
                    var tracingSupported = schemaData.extensions && Boolean(schemaData.extensions.tracing) || false;
                    var result = {
                        schema: schema,
                        tracingSupported: tracingSupported
                    };
                    _this.cache = _this.cache.set(_this.hash(session), result);
                    resolve(result);
                    _this.fetching = _this.fetching.remove(hash);
                    var subscription = _this.subscriptions.get(hash);
                    if (subscription) {
                        subscription(result.schema);
                    }
                },
                error: function error(err) {
                    reject(err);
                    _this.fetching = _this.fetching.remove(_this.hash(session));
                }
            });
        });
    };
    return SchemaFetcher;
}();
exports.SchemaFetcher = SchemaFetcher;
//# sourceMappingURL=SchemaFetcher.js.map