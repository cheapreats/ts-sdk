import { GraphQLClient } from 'graphql-request';
import axios from 'axios';

function strToIdentifier(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        if (str[i].match(/[A-Za-z0-9]/)) {
            result += str[i].toLowerCase();
        }
        else if ((str[i] === "_" || str[i] === " " || str[i] === "-") &&
            result[result.length - 1] !== "_") {
            result += "_";
        }
    }
    if (result[result.length - 1] === "_") {
        result = result.slice(0, result.length - 1);
    }
    if (result[0] === "_") {
        result = result.slice(1, result.length);
    }
    return result;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/**
 * Class representing a simple network adaptor
 * Author: Jun Zheng
 * License: UNLICENSED
 */
var Adaptor = /** @class */ (function () {
    function Adaptor(config) {
        /**
         * Construct the adaptor
         * @param {any} config
         */
        this._config = config;
    }
    /**
     * Run an adaptor request
     * @param {any} config
     */
    Adaptor.prototype.run = function (config) {
        throw new Error("Not implemented");
    };
    return Adaptor;
}());

/**
 * Class representing a network link
 * Author: Jun Zheng
 * License: UNLICENSED
 */
var Link = /** @class */ (function () {
    /**
     * Initialize the link with an URL
     * @param url
     */
    function Link(url) {
        this._url = url;
    }
    /**
     * Run a request
     * @param config
     */
    Link.prototype.run = function (config) {
        throw new Error("Not implemented");
    };
    return Link;
}());

/**
 * Class representing a network link that has request/response structure
 * Author: Jun Zheng
 * License: UNLICENSED
 */
var SynchronousLink = /** @class */ (function (_super) {
    __extends(SynchronousLink, _super);
    /**
     * @param  {} url
     */
    function SynchronousLink(url) {
        var _this = _super.call(this, url) || this;
        _this._type = "sync";
        return _this;
    }
    return SynchronousLink;
}(Link));

var GraphQLLink = /** @class */ (function (_super) {
    __extends(GraphQLLink, _super);
    /**
     * Construct a new GraphQLLink
     * @param {string} url
     * @param {obejct} config = {}
     */
    function GraphQLLink(url, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, url) || this;
        _this._headers = config.headers || {};
        _this._constructClient();
        return _this;
    }
    /**
     * Reconstruct a client instance.
     * @private
     */
    GraphQLLink.prototype._constructClient = function () {
        this._client = new GraphQLClient(this._url, {
            headers: this._headers
        });
    };
    /**
     * Alias for run
     * @param config
     * @returns
     */
    GraphQLLink.prototype.query = function (config) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.run(config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Alias for run
     * @param config
     * @returns
     */
    GraphQLLink.prototype.mutate = function (config) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.run(config)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Run a new graphql request
     * @param config
     * @returns {Promise<Object>}
     */
    GraphQLLink.prototype.run = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._client.request(config.query, config.variables || {})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return GraphQLLink;
}(SynchronousLink));

var packageDotJson = { version: "1.10.35" };

var CheaprEatsGraphQLAdaptor = /** @class */ (function (_super) {
    __extends(CheaprEatsGraphQLAdaptor, _super);
    function CheaprEatsGraphQLAdaptor(config) {
        var _this = _super.call(this, config) || this;
        _this._graphQLLink = new GraphQLLink(config.graphQLEndpoint, {
            version: packageDotJson.version 
        });
        return _this;
    }
    /**
     * This function sets the authentication for an application to be authorized to make calls to CheaprEats API
     * @param  {string} token - The Authentication Token
     */
    CheaprEatsGraphQLAdaptor.prototype.setAuthenticationToken = function (token) {
        this._graphQLLink = new GraphQLLink(this._config.graphQLEndpoint, {
            headers: {
                version: packageDotJson.version,
                authorization: token
            }
        });
    };
    /**
     * @param  {string} url - The URL of the GraphQL API
     */
    CheaprEatsGraphQLAdaptor.prototype.setGraphQLEndpoint = function (url) {
        this._graphQLLink = new GraphQLLink(url);
        this._config.graphQLEndpoint = url;
    };
    /**
     * @param  {string} query
     * @param  {object} variables = {}
     */
    CheaprEatsGraphQLAdaptor.prototype.query = function (query, variables) {
        if (variables === void 0) { variables = {}; }
        return this._graphQLLink.query({ query: query, variables: variables });
    };
    /**
     * @param  {string} query
     * @param  {object} variables = {}
     */
    CheaprEatsGraphQLAdaptor.prototype.mutate = function (query, variables) {
        if (variables === void 0) { variables = {}; }
        return this._graphQLLink.mutate({ query: query, variables: variables });
    };
    return CheaprEatsGraphQLAdaptor;
}(Adaptor));
// module.exports = CheaprEatsGraphQLAdaptor;

var AuthorizationController = /** @class */ (function () {
    function AuthorizationController(app) {
        this.app = app;
        this.getTokenScope = this.getTokenScope.bind(this);
    }
    AuthorizationController.prototype.getTokenScope = function (token) {
        var _this = this;
        var queryString = "\n            query {\n                auth_token_scope(token: \"" + token + "\")\n            }\n        ";
        return new Promise(function (resolve, reject) {
            return _this.app
                .getAdaptor()
                .query(queryString)
                .then(function (data) {
                resolve(data.auth_token_scope);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return AuthorizationController;
}());

var CartController = /** @class */ (function () {
    function CartController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.updateNote = this.updateNote.bind(this);
        this.removeCoupon = this.removeCoupon.bind(this);
        this.applyCoupon = this.applyCoupon.bind(this);
        this.delete = this.delete.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.create = this.create.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    CartController.prototype.updateNote = function (cartId, note) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($cartId: String!, $note: String!) {\n                    updateNoteForCart(cart_id: $cartId, note: $note) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                cartId: cartId,
                note: note
            })
                .then(function (result) {
                resolve(result.updateNoteForCart);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    CartController.prototype.removeCoupon = function (cartId, cartCouponId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($cartId: String!, $cartCouponId: String!) {\n                    removeCouponFromCart(cart_id: $cartId, cart_coupon_id: $cartCouponId) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                cartId: cartId,
                cartCouponId: cartCouponId
            })
                .then(function (result) {
                resolve(result.removeCouponFromCart);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    CartController.prototype.applyCoupon = function (cartId, couponCode) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($cartId: String!, $couponCode: String!) {\n                    applyCouponToCart(cart_id: $cartId, coupon_code: $couponCode) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                cartId: cartId,
                couponCode: couponCode
            })
                .then(function (result) {
                resolve(result.applyCouponToCart);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Delete a cart
     * @param {string} cartId
     * @returns {Promise<Cart>}
     */
    CartController.prototype.delete = function (cartId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($cartId: String!) {\n                    deleteCart(cart_id: $cartId)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                cartId: cartId
            })
                .then(function (result) {
                resolve(result.deleteCart);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Remove an item from currently active cart.
     * @param {string} cartId
     * @param {string} cartItemId
     * @returns {Promise<Cart>}
     */
    CartController.prototype.removeItem = function (cartId, cartItemId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($cartId: String!, $cartItemId: String!) {\n                    removeItemFromCart(\n                        cart_id: $cartId,\n                        cart_item_id: $cartItemId\n                    ) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                cartId: cartId,
                cartItemId: cartItemId
            })
                .then(function (result) {
                resolve(result.removeItemFromCart);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Add an new item to currently active cart.
     * @param {string} cartId
     * @param {AddItemToCartInput} item
     * @returns {Promise<Cart>}
     */
    CartController.prototype.addItem = function (cartId, item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($cartId: String!, $item: AddItemToCartInput!) {\n                    addItemToCart(\n                        cart_id: $cartId,\n                        item: $item\n                    ) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                cartId: cartId,
                item: item
            })
                .then(function (result) {
                resolve(result.addItemCart);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Create a new cart, remove all old carts.
     * @param {string} customerId
     * @param {string} vendorId
     * @returns {Promise<Cart>}
     */
    CartController.prototype.create = function (customerId, vendorId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($customerId: String!, $vendorId: String!) {\n                    createCart(\n                        customer_id: $customerId,\n                        vendor_id: $vendorId\n                    ) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                customerId: customerId,
                vendorId: vendorId
            })
                .then(function (result) {
                resolve(result.createCart);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return CartController;
}());

/**
 * Controller for categories.
 */
var CategoryController = /** @class */ (function () {
    function CategoryController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.batchUpdate = this.batchUpdate.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new category, return category ID if successful
     * @param {CreateCategoryInput} category - The category object
     * @returns {Promise<string>} - The id of the category that was created
     */
    CategoryController.prototype.create = function (category) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createCategoryMutation ($category: CreateCategoryInput!) {\n                    createCategory(category: $category) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                category: category
            })
                .then(function (result) {
                resolve(result.createCategory._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Delete a category
     * @param {string} id - The category id that will be deleted
     * @returns {Promise<string>}
     */
    CategoryController.prototype.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation deleteCategoryMutation ($id: String!) {\n                    deleteCategory(id: $id)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result.deleteCategory);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update category
     * @param {string} id - The id of the category that will be updated
     * @param {UpdateCategoryInput} category - The updated category object
     * @returns {Promise<string>} - Returns the id of the updated category
     */
    CategoryController.prototype.update = function (id, category) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation updateCategoryMutation ($id: String!, $category: UpdateCategoryInput!) {\n                    updateCategory(id: $id, category: $category) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                category: category
            })
                .then(function (result) {
                resolve(result.updateCategory._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Batch update a list of categories.
     * @param {Array<BatchUpdateCategoriesInput>} categories List of BatchUpdateCategoriesInput
     * @returns {Promise<Array<Category>>} List of categories with _id field
     */
    CategoryController.prototype.batchUpdate = function (categories) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($categories: [BatchUpdateCategoriesInput]!){\n                    batchUpdateCategories(categories: $categories) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                categories: categories
            })
                .then(function (result) {
                resolve(result.batchUpdateCategories);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return CategoryController;
}());

var ResetCodeSendMethod;
(function (ResetCodeSendMethod) {
    ResetCodeSendMethod["EMAIL"] = "EMAIL";
    ResetCodeSendMethod["SMS"] = "SMS";
})(ResetCodeSendMethod || (ResetCodeSendMethod = {}));
/**
 * Controller for employees.
 */
var EmployeeController = /** @class */ (function () {
    function EmployeeController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.enrollTerminalFcm = this.enrollTerminalFcm.bind(this);
        this.revokeTerminalFcm = this.revokeTerminalFcm.bind(this);
        this.resetEmployeePassword = this.resetEmployeePassword.bind(this);
        this.sendPasswordResetCode = this.sendPasswordResetCode.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new employee, return employee ID if successful
     * @param {CreateEmployeeInput} employee - The Employee Object
     * @returns {Promise<string>} - The id of the Employee Object
     */
    EmployeeController.prototype.create = function (employee) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createEmployeeMutation ($employee: CreateEmployeeInput!) {\n                    createEmployee(employee: $employee) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                employee: employee
            })
                .then(function (result) {
                resolve(result.createEmployee._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update a employee
     * @param {string} id - The id of the Employee Object
     * @param {UpdateEmployeeInput} employee - The Employee Object
     * @returns {Promise<string>} - The id of the Employee Object
     */
    EmployeeController.prototype.update = function (id, employee) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation updateEmployeeMutation ($id: String!, $employee: UpdateEmployeeInput!) {\n                    updateEmployee(id: $id, employee: $employee) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                employee: employee
            })
                .then(function (result) {
                resolve(result.updateEmployee._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Delete a Employee instance
     * @param {string} id - The id of the Employee Object
     * @returns {Promise<string>}
     */
    EmployeeController.prototype.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation deleteEmployee ($id: String!) {\n                    deleteEmployee(id: $id)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result.deleteEmployee);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Enroll a new FCM token for terminal app
     * @param {string} id - The id of the Employee Object
     * @param {string} token - The FCM token for the Terminal Mobile App
     * @returns {Promise<Employee>}
     */
    EmployeeController.prototype.enrollTerminalFcm = function (id, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation enrollEmployeeTerminalFcmToken ($id: String!, $token: String!) {\n                    enrollEmployeeTerminalFcmToken(id: $id, token: $token) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                token: token
            })
                .then(function (result) {
                resolve(result.enrollEmployeeTerminalFcmToken);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Revoke a FCM token for terminal app
     * @param {string} token - The FCM token for the Terminal Mobile App
     * @returns {Promise<string>}
     */
    EmployeeController.prototype.revokeTerminalFcm = function (token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation revokeEmployeeTerminalFcmToken ($token: String!) {\n                    revokeEmployeeTerminalFcmToken(token: $token)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                token: token
            })
                .then(function (result) {
                resolve(result.revokeEmployeeTerminalFcmToken);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Resets an employee password
     * @param {string} id - Id of the employee
     * @param {string} email_address - Email address of the employee
     * @param {string} code - Reset code
     * @param {string} password - The new password to set
     * @returns {Promise<string>}
     */
    //QUESTION id and email_address are optional??
    EmployeeController.prototype.resetEmployeePassword = function (id, email_address, code, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation resetEmployeePassword ($id: String, $email_address:String, $code:String!, $password:String!) {\n                    resetEmployeePassword(id: $id, email_address: $email_address, code: $code, password: $password) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                email_address: email_address,
                code: code,
                password: password
            })
                .then(function (result) {
                resolve(result.resetEmployeePassword._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Sends a password reset code to employee
     * @param {string} email_address - Id of the employee
     * @param {Method} method - The new password to set
     * @returns {Promise<string>}
     */
    EmployeeController.prototype.sendPasswordResetCode = function (email_address, method) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation sendEmployeePasswordResetCode ($email_address: String!, $method:ResetCodeSendMethod) {\n                    sendEmployeePasswordResetCode(email_address: $email_address, method:$method)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                email_address: email_address,
                method: method
            })
                .then(function (result) {
                resolve(result.sendEmployeePasswordResetCode);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return EmployeeController;
}());

/**
 * Controller for customers.
 */
var CustomerController = /** @class */ (function () {
    function CustomerController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.updateCreditCard = this.updateCreditCard.bind(this);
        this.enrollApnsToken = this.enrollApnsToken.bind(this);
        this.revokeApnsToken = this.revokeApnsToken.bind(this);
        this.enrollFcmToken = this.enrollFcmToken.bind(this);
        this.revokeFcmToken = this.revokeFcmToken.bind(this);
        this.createWallet = this.createWallet.bind(this);
        this.reloadWallet = this.reloadWallet.bind(this);
        this.sendPasswordResetCode = this.sendPasswordResetCode.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.refundWallet = this.refundWallet.bind(this);
        this.createWalletTransaction = this.createWalletTransaction.bind(this);
        this.addFavouriteVendor = this.addFavouriteVendor.bind(this);
        this.removeFavouriteVendor = this.removeFavouriteVendor.bind(this);
        this.addFavouriteItem = this.addFavouriteItem.bind(this);
        this.removeFavouriteItem = this.removeFavouriteItem.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new customer, return customer ID if successful
     * @param {CreateCustomerInput} customer - The Customer object to be created
     * @returns {Promise<string>} - The id of the Customer object that was created
     */
    CustomerController.prototype.create = function (customer) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createCustomerMutation ($customer: CreateCustomerInput!) {\n                    createCustomer(customer: $customer) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                customer: customer
            })
                .then(function (result) {
                resolve(result.createCustomer._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update a customer
     * @param {string} id - The id of the Customer object
     * @param {UpdateCustomerInput} customer - The updated Customer object
     * @returns {Promise<string>} - The id of the Customer Object that was updated
     */
    CustomerController.prototype.update = function (id, customer) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation updateCustomerMutation ($id: String!, $customer: UpdateCustomerInput!) {\n                    updateCustomer(id: $id, customer: $customer) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                customer: customer
            })
                .then(function (result) {
                resolve(result.updateCustomer._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Enroll a new APNs token
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The APNS Token
     * @returns {Promise<Customer>}
     */
    CustomerController.prototype.enrollApnsToken = function (id, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation enrollCustomerApnsTokenMutation ($id: String!, $token: String!) {\n                    enrollCustomerApnsToken(id: $id, token: $token) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                token: token
            })
                .then(function (result) {
                resolve(result.enrollCustomerApnsToken);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Revoke an APNs token
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The APNS Token
     * @returns {Promise<Customer>}
     */
    CustomerController.prototype.revokeApnsToken = function (id, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation revokeCustomerApnsTokenMutation ($id: String!, $token: String!) {\n                    revokeCustomerApnsToken(id: $id, token: $token) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                token: token
            })
                .then(function (result) {
                resolve(result.revokeCustomerApnsToken);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Enroll a new FCM token
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The FCM Token
     * @returns {Promise<Customer>}
     */
    CustomerController.prototype.enrollFcmToken = function (id, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation enrollCustomerFcmTokenMutation ($id: String!, $token: String!) {\n                    enrollCustomerFcmToken(id: $id, token: $token) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                token: token
            })
                .then(function (result) {
                resolve(result.enrollCustomerFcmToken);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Revoke an FCM token
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The FCM Token
     * @returns {Promise<Customer>}
     */
    CustomerController.prototype.revokeFcmToken = function (id, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation revokeCustomerFcmTokenMutation ($id: String!, $token: String!) {\n                    revokeCustomerFcmToken(id: $id, token: $token) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                token: token
            })
                .then(function (result) {
                resolve(result.revokeCustomerFcmToken);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update a customer's credit card
     * @param {string} id - The id of the Customer Object
     * @param {string} token - The Stripe Token
     * @returns {Promise<Customer>}
     */
    CustomerController.prototype.updateCreditCard = function (id, token) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation updateCustomerCreditCardMutation ($id: String!, $token: String!) {\n                    updateCustomerCreditCard(id: $id, token: $token) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                token: token
            })
                .then(function (result) {
                resolve(result.updateCustomerCreditCard);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Create Customer Wallet
     * @param {string} id - The id of the Customer Object
     * @returns {Promise<string>} - The id of the wallet that was created
     */
    //QUESTION: Why does this return coupon??
    CustomerController.prototype.createWallet = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createCustomerWallet ($id: String!) {\n                    createCustomerWallet(id: $id) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result.createCustomerWallet._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Reload customer wallet
     * @param {string} id - The id of the Customer Object
     * @param  {number} amount - The amount to load the wallet (in cents)
     * @param  {string} payment_method - The selected payment method
     * @returns {Promise<string>} - The id of the wallet that was reloaded
     */
    //QUESTION: Why does this return coupon??
    CustomerController.prototype.reloadWallet = function (id, amount, payment_method) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation reloadCustomerWallet ($id: String!, $amount: Int!, $payment_method: String!) {\n                    reloadCustomerWallet(id: $id, amount: $amount, payment_method: $payment_method) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                amount: amount,
                payment_method: payment_method
            })
                .then(function (result) {
                resolve(result.reloadCustomerWallet._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Send password reset code to customer
     * @param  {string} email_address - The email address of the customer
     * @param  {ResetCodeSendMethod} method - The method to receive the code on, either EMAIL (default) or SMS
     * @returns {Promise<string>}
     */
    CustomerController.prototype.sendPasswordResetCode = function (email_address, method) {
        var _this = this;
        if (method === void 0) { method = ResetCodeSendMethod.EMAIL; }
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation sendCustomerPasswordResetCode ($email_address: String!, $method: ResetCodeSendMethod) {\n                    sendCustomerPasswordResetCode(email_address: $email_address, method:$method)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                email_address: email_address,
                method: method
            })
                .then(function (result) {
                resolve(result.sendCustomerPasswordResetCode);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Reset Customer Password
     * @param  {string} email_address - The email address of the customer
     * @param  {string} code - Temporary Code for Password Resets
     * @param  {string} password - The new password
     * @returns {Promise<string>}
     */
    CustomerController.prototype.resetPassword = function (email_address, code, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation resetCustomerPassword ($email_address: String!, $code: String!, $password: String!) {\n                    resetCustomerPassword(email_address: $email_address, code: $code, password: $password) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                email_address: email_address,
                code: code,
                password: password
            })
                .then(function (result) {
                resolve(result.resetCustomerPassword._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Refund customer wallet by vendor
     * @param {string} id - The id of the Customer
     * @param  {string} vendor_id - ID of the Vendor issuing the refund
     * @param  {number} amount - The amount to refund the wallet (in cents)
     * @param  {string} order_id - Optional orderId selected payment method
     * @returns {Promise<string>} - The id of the wallet that was reloaded
     */
    //QUESTION: Why does this return coupon??
    CustomerController.prototype.refundWallet = function (id, vendor_id, amount, order_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!, $vendor_id: String!, $amount: Int!, $order_id: String) {\n                    refundCustomerWallet(id: $id, vendor_id: $vendor_id, amount: $amount, order_id: $order_id) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                vendor_id: vendor_id,
                amount: amount,
                order_id: order_id
            })
                .then(function (result) {
                resolve(result.refundCustomerWallet._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Create a wallet transaction for customer
     * @param {string} id - The id of the Customer
     * @param  {string} transaction_type - Transaction type, either 'reload' or 'purchase'
     * @param  {number} amount - The amount in cents
     * @param  {string} description - Optional description for transaction
     * @returns {Promise<string>} - The id of the wallet that was reloaded
     */
    //QUESTION: Why does this return coupon??
    CustomerController.prototype.createWalletTransaction = function (id, transaction_type, amount, description) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!, $transaction_type: String!, $amount: Int!, $description: String) {\n                    createCustomerWalletTransaction(id: $id, transaction_type: $transaction_type, amount: $amount, description: $description) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                transaction_type: transaction_type,
                amount: amount,
                description: description
            })
                .then(function (result) {
                resolve(result.createCustomerWalletTransaction._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Add a favourite vendor for customer
     * @param {string} id - The id of the Customer
     * @param  {string} vendor_id - The id of the vendor
     * @returns {Promise<string>} - The id of customer whose favourite vendor was updated
     */
    CustomerController.prototype.addFavouriteVendor = function (id, vendor_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!, $vendor_id: String!) {\n                    addFavouriteVendorForCustomer (id: $id, vendor_id: $vendor_id) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                vendor_id: vendor_id
            })
                .then(function (result) {
                resolve(result.addFavouriteVendorForCustomer._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Remove a favourite vendor for customer
     * @param {string} id - The id of the Customer
     * @param  {string} vendor_id - The id of the vendor
     * @returns {Promise<string>} - The id of customer whose favourite vendor was updated
     */
    CustomerController.prototype.removeFavouriteVendor = function (id, vendor_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!, $vendor_id: String!) {\n                    removeFavouriteVendorForCustomer (id: $id, vendor_id: $vendor_id) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                vendor_id: vendor_id
            })
                .then(function (result) {
                resolve(result.removeFavouriteVendorForCustomer._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Add a favourite item for customer
     * @param {string} id - The id of the Customer
     * @param  {string} item_id - The id of the item
     * @returns {Promise<string>} - The id of customer whose favourite item was updated
     */
    CustomerController.prototype.addFavouriteItem = function (id, item_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!, $item_id: String!) {\n                    addFavouriteItemForCustomer (id: $id, item_id: $item_id) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                item_id: item_id
            })
                .then(function (result) {
                resolve(result.addFavouriteItemForCustomer._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Remove a favourite item for customer
     * @param {string} id - The id of the Customer
     * @param  {string} item_id - The id of the item
     * @returns {Promise<string>} - The id of customer whose favourite item was updated
     */
    CustomerController.prototype.removeFavouriteItem = function (id, item_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id:String!, $item_id:String!) {\n                    removeFavouriteItemForCustomer (id:$id, item_id:$item_id) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                item_id: item_id
            })
                .then(function (result) {
                resolve(result.removeFavouriteItemForCustomer._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return CustomerController;
}());

var CustomerTokenController = /** @class */ (function () {
    function CustomerTokenController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new CustomerToken, return CustomerToken ID if successful
     * @param {string} email_address - The email address of the Customer
     * @param {string} password - The password of the Customer
     * @returns {Promise<CustomerToken>}
     */
    CustomerTokenController.prototype.create = function (email_address, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createCustomerTokenMutation ($email_address: String!, $password: String!) {\n                    createCustomerToken(email_address: $email_address, password: $password) {\n                        _id\n                        body\n                        created_at\n                        updated_at\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                email_address: email_address,
                password: password
            })
                .then(function (result) {
                resolve(result.createCustomerToken);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return CustomerTokenController;
}());

/**
 * Controller for coupons.
 */
var CouponController = /** @class */ (function () {
    function CouponController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new coupon, return coupon ID if successful
     * @param {CreateCouponInput} category - The Coupon Object
     * @returns {Promise<string>}
     */
    CouponController.prototype.create = function (coupon) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createCouponMutation ($coupon: CreateCouponInput!) {\n                    createCoupon(coupon: $coupon) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                coupon: coupon
            })
                .then(function (result) {
                resolve(result.createCoupon._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return CouponController;
}());

var EmployeeTokenController = /** @class */ (function () {
    function EmployeeTokenController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new EmployeeToken, return EmployeeToken ID if successful
     * @param {string} vendor_id - The id of the Vendor this employee will be assigned to
     * @param {string} username - The Username of the Employee
     * @param {string} password - The password of the Employee
     * @returns {Promise<string>}
     */
    EmployeeTokenController.prototype.create = function (vendor_id, username, password) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createEmployeeTokenMutation ($vendor_id: String!, $username: String!, $password: String!) {\n                    createEmployeeToken(vendor_id: $vendor_id, username: $username, password: $password) {\n                        body\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                vendor_id: vendor_id,
                username: username,
                password: password
            })
                .then(function (result) {
                resolve(result.createEmployeeToken.body);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return EmployeeTokenController;
}());

var UserTypes;
(function (UserTypes) {
    UserTypes["VENDOR_ADMIN"] = "VENDOR_ADMIN";
    UserTypes["VENDOR_EMPLOYEE"] = "VENDOR_EMPLOYEE";
    UserTypes["CUSTOMER"] = "CUSTOMER";
    UserTypes["MASTER"] = "MASTER";
    UserTypes["INVALID"] = "INVALID";
})(UserTypes || (UserTypes = {}));
/**
 * Controller for the graph.
 */
var GraphController = /** @class */ (function () {
    function GraphController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.query = this.query.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    GraphController.prototype.query = function (query, variables) {
        if (variables === void 0) { variables = {}; }
        return this.app.getAdaptor().query(query, variables);
    };
    return GraphController;
}());

var HeadOfficeController = /** @class */ (function () {
    function HeadOfficeController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new HeadOffice
     * @param {string} identifier - The identifier for the Head Office Object
     * @returns {Promise<string>} - The id of the Head Office object
     */
    HeadOfficeController.prototype.create = function (identifier) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createHeadOffice ($identifier: String!) {\n                    createHeadOffice(identifier: $identifier) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                identifier: identifier
            })
                .then(function (result) {
                resolve(result.createHeadOffice._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update a HeadOffice
     * @param {string} id - The id of the Head Office Object
     * @param {string} identifier - The identifier for the Head Office Object
     * @returns {Promise<string>} - The id of the Head Office object
     */
    HeadOfficeController.prototype.update = function (id, identifier) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation updateHeadOffice ($id: String!, $identifier: String!) {\n                    updateHeadOffice(id: $id, identifier: $identifier) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                identifier: identifier
            })
                .then(function (result) {
                resolve(result.updateHeadOffice._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Delete a HeadOffice instance
     * @param {string} id - The id of the Head Office Object
     * @returns {Promise<string>}
     */
    HeadOfficeController.prototype.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation deleteHeadOffice ($id: String!) {\n                    deleteHeadOffice(id: $id)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result.deleteHeadOffice);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return HeadOfficeController;
}());

/**
 * Controller for menu items.
 */
var MenuItemController = /** @class */ (function () {
    function MenuItemController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.batchUpdate = this.batchUpdate.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new MenuItem, returns MenuItem _id if successful
     * @param {CreateMenuItemInput} menu_item - The MenuItem object
     * @returns {Promise<string>} - The id of the MenuItem object
     */
    MenuItemController.prototype.create = function (menu_item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createMenuItemMutation ($menu_item: CreateMenuItemInput!) {\n                    createMenuItem(menu_item: $menu_item) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                menu_item: menu_item
            })
                .then(function (result) {
                resolve(result.createMenuItem._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update an existing MenuItem based on given ID/menu_item, returns _id if successful
     * @param {string} id - The id of the MenuItem Object
     * @param {UpdateMenuItemInput} menu_item - The MenuItem Object
     * @returns {Promise<string>} - The id of the MenuItem object
     */
    MenuItemController.prototype.update = function (id, menu_item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation updateMenuItemMutation ($id: String!, $menu_item: UpdateMenuItemInput!) {\n                    updateMenuItem(id: $id, menu_item: $menu_item) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                menu_item: menu_item
            })
                .then(function (result) {
                resolve(result.updateMenuItem._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Batch update a list of menu items.
     * @param {Array<BatchUpdateMenuItemsInput>} menu_items List of BatchUpdateMenuItemsInput
     * @returns {Promise<Array<MenuItem>>} List of menu items with _id field
     */
    MenuItemController.prototype.batchUpdate = function (menu_items) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation batchUpdateMenuItems ($menu_items: [BatchUpdateMenuItemsInput]!) {\n                    batchUpdateMenuItems(menu_items: $menu_items) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                menu_items: menu_items
            })
                .then(function (result) {
                resolve(result.batchUpdateMenuItems);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Delete a MenuItem
     * @param {string} id - The id of the MenuItem Object
     * @returns {Promise<void>} - The id of the MenuItem object
     */
    //QUESTION correct usage of void?
    MenuItemController.prototype.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation deleteMenuItemMutation ($id: String!) {\n                    deleteMenuItem(id: $id)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function () {
                resolve();
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return MenuItemController;
}());

/**
 * Controller for modifiers.
 */
var ModifierController = /** @class */ (function () {
    function ModifierController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new Modifier
     * @param {CreateModifierInput} modifier - The Modifier Object
     * @returns {Promise<string>} - The id of the Modifier Object
     */
    ModifierController.prototype.create = function (modifier) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createModifier ($modifier: CreateModifierInput!) {\n                    createModifier(modifier: $modifier) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                modifier: modifier
            })
                .then(function (result) {
                resolve(result.createModifier._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update an existing Modifier
     * @param {string} id - The id of the Modifier Object
     * @param {UpdateModifierInput} modifier - The Modifier Object
     * @returns {Promise<string>} - The id of the Modifier Object
     */
    ModifierController.prototype.update = function (id, modifier) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation updateModifier ($id: String!, $modifier: UpdateModifierInput!) {\n                    updateModifier(id: $id, modifier: $modifier) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                modifier: modifier
            })
                .then(function (result) {
                resolve(result.updateModifier._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Delete an existing Modifier
     * @param {string} id - The id of the Modifier Object
     * @returns {Promise<void>}
     */
    //QUESTION correct usage of void?
    ModifierController.prototype.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation deleteModifier ($id: String!) {\n                    deleteModifier(id: $id)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function () {
                resolve();
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return ModifierController;
}());

var VendorApprovalStatus;
(function (VendorApprovalStatus) {
    VendorApprovalStatus["NOT_APPROVED"] = "NOT_APPROVED";
    VendorApprovalStatus["PENDING"] = "PENDING";
    VendorApprovalStatus["APPROVED"] = "APPROVED";
})(VendorApprovalStatus || (VendorApprovalStatus = {}));
var PayoutAutoRequestSchedule;
(function (PayoutAutoRequestSchedule) {
    PayoutAutoRequestSchedule["OFF"] = "OFF";
    PayoutAutoRequestSchedule["WEEKLY"] = "WEEKLY";
    PayoutAutoRequestSchedule["BI_WEEKLY"] = "BI_WEEKLY";
    PayoutAutoRequestSchedule["MONTHLY"] = "MONTHLY";
})(PayoutAutoRequestSchedule || (PayoutAutoRequestSchedule = {}));
var VendorAnalyticsCustomerType;
(function (VendorAnalyticsCustomerType) {
    VendorAnalyticsCustomerType["FIRST_TIME"] = "FIRST_TIME";
    VendorAnalyticsCustomerType["CASUAL"] = "CASUAL";
    VendorAnalyticsCustomerType["REGULAR"] = "REGULAR";
})(VendorAnalyticsCustomerType || (VendorAnalyticsCustomerType = {}));
/**
 * Controller for vendors.
 */
var VendorController = /** @class */ (function () {
    function VendorController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.deleteVendorTester = this.deleteVendorTester.bind(this);
        this.addVendorTesterByEmailAddress = this.addVendorTesterByEmailAddress.bind(this);
        this.updateVendorApprovalStatus = this.updateVendorApprovalStatus.bind(this);
        this.requestVendorApproval = this.requestVendorApproval.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.createWithEmployee = this.createWithEmployee.bind(this);
        this.updateAllMenuItemsStatus = this.updateAllMenuItemsStatus.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Delete a vendor tester by ID.
     * @param {string} id Vendor tester's ID.
     * @returns {Promise<string>}
     */
    VendorController.prototype.deleteVendorTester = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!) {\n                    deleteVendorTester(id: $id)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result.deleteVendorTester);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Add a new vendor tester by email address.
     * @param {string} id Vendor's ID.
     * @param {string} email_address Customer's email address to add as a tester.
     * @returns {Promise<VendorTester>}
     */
    VendorController.prototype.addVendorTesterByEmailAddress = function (id, email_address) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!, $email_address: String!) {\n                    addVendorTesterByEmailAddress(id: $id, email_address: $email_address) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                email_address: email_address
            })
                .then(function (result) {
                resolve(result.addVendorTesterByEmailAddress);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update a vendor's approval status, this can only be called by master.
     * @param {string} id ID of the vendor.
     * @param {VendorApprovalStatus} approval_status New approval status, can be APPROVED, PENDING, NOT_APPROVED
     * @returns {Promise<string>}
     */
    VendorController.prototype.updateVendorApprovalStatus = function (id, approval_status) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!, $approval_status: VendorApprovalStatus!) {\n                    updateVendorApprovalStatus(id: $id, approval_status: $approval_status) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                approval_status: approval_status
            })
                .then(function (result) {
                resolve(result.updateVendorApprovalStatus._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Request profile approval from administrators before publishing the store.
     * @param {string} id ID of the vendor.
     * @returns {Promise<string>}
     */
    VendorController.prototype.requestVendorApproval = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!) {\n                    requestVendorApproval(id: $id)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result.requestVendorApproval);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * TODO: Deprecate this method
     * Create a new vendor, return vendor ID if successful
     * @param {Object} vendor - The Vendor Object
     * @returns {Promise<any>}
     */
    //QUESTION is this fully deprecated?? Because not in playground
    VendorController.prototype.create = function (vendor) {
        var _this = this;
        console.warn("Vendor.create is deprecated, it is recommended for you to move to Vendor.createWithEmployee");
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createVendorMutation ($vendor: CreateVendorInput!) {\n                    createVendor(vendor: $vendor) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                vendor: vendor
            })
                .then(function (result) {
                //@ts-ignore deprecated
                resolve(result.createVendor._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Create a new Vendor Object with an Employee Object
     * @param {CreateVendorWithEmployeeInput} vendor - The Vendor Object
     * @returns {Promise<string>} - The id of the Vendor Object
     */
    VendorController.prototype.createWithEmployee = function (vendor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createVendorWithEmployeeMutation($vendor: CreateVendorWithEmployeeInput!) {\n                    createVendorWithEmployee(vendor: $vendor) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                vendor: vendor
            })
                .then(function (result) {
                resolve(result.createVendorWithEmployee._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update a vendor
     * @param {string} id - The id of the Vendor Object
     * @param {UpdateVendorInput} vendor - The Vendor Object
     * @returns {Promise<string>}
     */
    VendorController.prototype.update = function (id, vendor) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation updateVendorMutation ($id: String!, $vendor: UpdateVendorInput!) {\n                    updateVendor(id: $id, vendor: $vendor) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                vendor: vendor
            })
                .then(function (result) {
                resolve(result.updateVendor._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update a vendor
     * @param {string} vendor_id - The id of the Vendor Object
     * @param {string} status - Updated status of the items
     * @returns {Promise<string>}
     */
    VendorController.prototype.updateAllMenuItemsStatus = function (vendor_id, status) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($vendor_id: String!, $status: String!) {\n                    updateAllMenuItemsStatusForVendor(vendor_id: $vendor_id, status: $status)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                vendor_id: vendor_id,
                status: status
            })
                .then(function (result) {
                resolve(result.updateAllMenuItemsStatusForVendor);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return VendorController;
}());

var VerificationController = /** @class */ (function () {
    function VerificationController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.startVerificationSession = this.startVerificationSession.bind(this);
        this.checkVerificationSession = this.checkVerificationSession.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    // QUESTION only result is returned so I cannot specify which key within result is actually present
    /**
     * Start a new SMS verification Session
     * @param {string} phone_number - The phone to be verified
     * @returns {Promise<MutateResult>} - The uuid required to verify the verification code
     */
    VerificationController.prototype.startVerificationSession = function (phone_number) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createSmsVerificationSessionMutation ($phone_number:String!) {\n                    createSmsVerificationSession(phone_number:$phone_number) {\n                        uuid\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                phone_number: phone_number
            })
                .then(function (result) {
                resolve(result);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Verify an Phone number via code received
     * @param {string} uuid - UUID of the verification request
     * @param {string} verification_code - Verification code received on the device
     * @returns {Promise<MutateResult>} - verification status along with the number corresponding to the UUID
     */
    VerificationController.prototype.checkVerificationSession = function (uuid, verification_code) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation verifySmsVerificationSessionMutation ($uuid:String!, $verification_code:String!) {\n                    verifySmsVerificationSession(uuid:$uuid, verification_code:$verification_code) {\n                        phone_number,\n                        verified_status\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                uuid: uuid,
                verification_code: verification_code
            })
                .then(function (result) {
                resolve(result);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return VerificationController;
}());

/**
 * Class representing a simple HTTP server link
 * Author: Jun Zheng
 * License: UNLICENSED
 */
var HttpLink = /** @class */ (function (_super) {
    __extends(HttpLink, _super);
    // _url: string;
    /**
     * Construct the link with URL
     * @param url
     */
    function HttpLink(url) {
        return _super.call(this, url) || this;
    }
    /**
     * Run a get request
     * @param config
     * @returns {Promise<Object>}
     */
    HttpLink.prototype.get = function (config) {
        if (config === void 0) { config = {}; }
        return this.run(Object.assign(config, { method: "get" }));
    };
    /**
     * Run a post request
     * @param config
     * @returns {Promise<Object>}
     */
    HttpLink.prototype.post = function (config) {
        if (config === void 0) { config = {}; }
        return this.run(Object.assign(config, { method: "post" }));
    };
    /**
     * Run a put request
     * @param config
     * @returns {Promise<Object>}
     */
    HttpLink.prototype.put = function (config) {
        if (config === void 0) { config = {}; }
        return this.run(Object.assign(config, { method: "put" }));
    };
    /**
     * Run a delete request
     * @param config
     * @returns {Promise<Object>}
     */
    HttpLink.prototype.delete = function (config) {
        if (config === void 0) { config = {}; }
        return this.run(Object.assign(config, { method: "delete" }));
    };
    /**
     * Runs a new http request
     * @param config
     * @returns {Promise<object>}
     */
    HttpLink.prototype.run = function (config) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            axios
                .request({
                method: config.method,
                url: _this._url,
                data: config.data ? config.data : {},
                headers: config.headers ? config.headers : {}
            })
                .then(function (data) {
                resolve(data);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return HttpLink;
}(SynchronousLink));

var ValidationController = /** @class */ (function () {
    function ValidationController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.customerSignupEmail = this.customerSignupEmail.bind(this);
        this.customerSignupPhone = this.customerSignupPhone.bind(this);
    }
    ValidationController.prototype.getHttpLink = function (append) {
        if (append === void 0) { append = ""; }
        return new HttpLink(this.app.getConfiguration().endpoints.validationEndpoint.production +
            append);
    };
    // ADD MUTATION METHODS BELOW
    /**
     * Check if an email can be used for customer account creation
     * @param {string} email - An email
     * @returns {Promise<any>}
     */
    ValidationController.prototype.customerSignupEmail = function (email) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var link = _this.getHttpLink("/customer/signup/email");
            link
                .post({
                data: { email: email }
            })
                .then(function (data) {
                resolve(data.data);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Check if a phone number can be used for customer account creation
     * @param {string} phone - The phone number to send the code to (Without Country Code & no spaces/special characters)
     * @returns {Promise<any>}
     */
    ValidationController.prototype.customerSignupPhone = function (phone) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var link = _this.getHttpLink("/customer/signup/phone");
            link
                .post({
                data: { phone: phone }
            })
                .then(function (data) {
                resolve(data.data);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return ValidationController;
}());

var SurveyQuestionType;
(function (SurveyQuestionType) {
    SurveyQuestionType["CHECKBOX"] = "CHECKBOX";
    SurveyQuestionType["MULTI_CHECKBOX"] = "MULTI_CHECKBOX";
    SurveyQuestionType["SHORT_ANSWER"] = "SHORT_ANSWER";
    SurveyQuestionType["RATING"] = "RATING";
})(SurveyQuestionType || (SurveyQuestionType = {}));
var SurveyDeliveryRule;
(function (SurveyDeliveryRule) {
    SurveyDeliveryRule["AFTER_ORDER"] = "AFTER_ORDER";
})(SurveyDeliveryRule || (SurveyDeliveryRule = {}));
var SurveyController = /** @class */ (function () {
    function SurveyController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.archive = this.archive.bind(this);
        this.delete = this.delete.bind(this);
        this.release = this.release.bind(this);
        this.createSurveyResponse = this.createSurveyResponse.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new Survey and return the ID of the created object if successful
     * @param {CreateSurveyInput} survey - The Survey Object
     * @returns {Promise<string>}
     */
    SurveyController.prototype.create = function (survey) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($survey: CreateSurveyInput!) {\n                    createSurvey(survey: $survey) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                survey: survey
            })
                .then(function (result) {
                resolve(result.createSurvey._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update a Survey and return the ID of the updated object if successful
     * @param {string} id - The id of the survey to be modified
     * @param {UpdateSurveyInput} survey - The Modified Survey Object
     * @returns {Promise<string>}
     */
    SurveyController.prototype.update = function (id, survey) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!, $survey: UpdateSurveyInput!) {\n                    updateSurvey(id: $id, survey: $survey) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                survey: survey
            })
                .then(function (result) {
                resolve(result.updateSurvey._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Archive a Survey
     * @param {string} id - The id of the Survey Object
     * @returns {Promise<Survey>} - Confirmation String
     */
    SurveyController.prototype.archive = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!) {\n                    archiveSurvey(id: $id)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result.archiveSurvey);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Delete a Survey
     * @param {string} id - The id of the Survey Object
     * @returns {Promise<string>} - Confirmation String
     */
    SurveyController.prototype.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!) {\n                    deleteSurvey(id: $id)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result.deleteSurvey);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Release a Survey
     * @param {string} id - The id of the Survey Object
     * @returns {Promise<string>} - The id of the Survey object
     */
    SurveyController.prototype.release = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!) {\n                    releaseSurvey(id: $id) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result.releaseSurvey._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Create a SurveyResponse object for a Survey object and returns the SurveyResponse ID if successful
     * @param {string} survey_id - The Survey Object ID
     * @param {CreateSurveyResponseInput} survey_response - The survey response object; the CreateSurveyResponseInput object
     * @returns {Promise<string>}
     */
    SurveyController.prototype.createSurveyResponse = function (survey_id, survey_response) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($survey_id: String!, $survey_response: CreateSurveyResponseInput!) {\n                    createSurveyResponse(survey_id: $survey_id, survey_response: $survey_response) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                survey_id: survey_id,
                survey_response: survey_response
            })
                .then(function (result) {
                resolve(result.createSurveyResponse._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return SurveyController;
}());

var OrderType;
(function (OrderType) {
    OrderType["EAT_IN"] = "EAT_IN";
    OrderType["TAKE_OUT"] = "TAKE_OUT";
    OrderType["DELIVERY"] = "DELIVERY";
})(OrderType || (OrderType = {}));
var OrderCancellationReason;
(function (OrderCancellationReason) {
    OrderCancellationReason["VENDOR_CANCELLED"] = "VENDOR_CANCELLED";
    OrderCancellationReason["VENDOR_PREP_CANCELLED"] = "VENDOR_PREP_CANCELLED";
    OrderCancellationReason["VENDOR_ITEM_SOLD_OUT"] = "VENDOR_ITEM_SOLD_OUT";
    OrderCancellationReason["VENDOR_STORE_CLOSING_SOON"] = "VENDOR_STORE_CLOSING_SOON";
    OrderCancellationReason["CUSTOMER_NOT_PICKED_UP"] = "CUSTOMER_NOT_PICKED_UP";
    OrderCancellationReason["CUSTOMER_CANCELLED"] = "CUSTOMER_CANCELLED";
    OrderCancellationReason["OTHER"] = "OTHER";
})(OrderCancellationReason || (OrderCancellationReason = {}));
/**
 * Controller for orders.
 */
var OrderController = /** @class */ (function () {
    function OrderController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.cancel = this.cancel.bind(this);
        this.beginPreparing = this.beginPreparing.bind(this);
        this.prepared = this.prepared.bind(this);
        this.complete = this.complete.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Place a new order, you must be authenticated as a customer to use this
     * @param {CreateOrderInput} order - The Order Object
     * @param {boolean} [dry] - Indicator for dry order placement
     * @param {boolean} [clear_cart] - Indicator to clear all cart after order placement
     * @returns {Promise<string>} - The id of the Order Object
     */
    OrderController.prototype.create = function (order, dry, // default False
    clear_cart // default False
    ) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createOrderMutation ($order: CreateOrderInput!, $dry: Boolean, $clear_cart: Boolean) {\n                    createOrder(order: $order, dry: $dry, clear_cart: $clear_cart) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                order: order,
                dry: dry,
                clear_cart: clear_cart
            })
                .then(function (result) {
                resolve(result.createOrder._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    //QUESTION because only result is returned I can't be more specific than MutateResult
    // Usually it is result.[mutation name] and then it is more specific what is within the result
    /**
     * Cancel a order, must be authenticated as vendor
     * @param {string} id - The id of the Order Object
     * @param {OrderCancellationReason} reason - input type OrderCancellationReason enum indicating reason
     * @param {string} description - Additional details on order cancellation
     * @returns {Promise<MutateResult>}
     */
    OrderController.prototype.cancel = function (id, reason, description) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation cancelOrderMutation ($id: String!, $reason: OrderCancellationReason!, $description: String){\n                    cancelOrder(id: $id, reason: $reason, description: $description){\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                reason: reason,
                description: description
            })
                .then(function (result) {
                resolve(result);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Set a order as preparing with estimated time
     * @param {string} id - The id of the Order Object
     * @param {number} estimated_preparing_sec - The amount of time the Order will take before it will be prepared
     * @returns {Promise<MutateResult>}
     */
    OrderController.prototype.beginPreparing = function (id, estimated_preparing_sec) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation beginPreparingOrder($id: String!, $estimated_preparing_sec: Int!){\n                    beginPreparingOrder(id: $id, estimated_preparing_sec: $estimated_preparing_sec){\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                estimated_preparing_sec: estimated_preparing_sec
            })
                .then(function (result) {
                resolve(result);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Set order as prepared
     * @param {string} id - The id of the Order Object
     * @returns {Promise<MutateResult>}
     */
    OrderController.prototype.prepared = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation preparedOrderMutation ($id: String!){\n                    preparedOrder (id: $id){\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Complete an order
     * @param {string} id - The id of the Order Object
     * @returns {Promise<MutateResult>}
     */
    OrderController.prototype.complete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation completeOrderMutation ($id: String!){\n                    completeOrder(id: $id){\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return OrderController;
}());

var ImageController = /** @class */ (function () {
    function ImageController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.upload = this.upload.bind(this);
        this.getLink = this.getLink.bind(this);
    }
    /**
     * Get HttpLink appended with append
     * @param  {string} append=""
     * @returns {HttpLink}
     */
    ImageController.prototype.getHttpLink = function (append) {
        if (append === void 0) { append = ""; }
        return new HttpLink(this.app.getConfiguration().endpoints.imageEndpoint.production + append);
    };
    // ADD MUTATION METHODS BELOW
    /**
     * Upload an new image
     * @param {string} image - Image in base64 format
     * @returns {Promise<any>}
     */
    ImageController.prototype.upload = function (image) {
        var link = this.getHttpLink("/upload");
        return new Promise(function (resolve, reject) {
            link
                .post({
                data: {
                    image: image
                }
            })
                .then(function (result) {
                resolve(result.data);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Get an image link with size
     * @param {string} id
     * @param {string} size (100px, 300px, 600px or 1200px)
     * @returns {string}
     */
    ImageController.prototype.getLink = function (id, size) {
        return (this.app.getConfiguration().endpoints.imageEndpoint.distribution +
            "/" +
            id +
            "-" +
            size +
            ".png");
    };
    return ImageController;
}());

var PayoutMethod;
(function (PayoutMethod) {
    PayoutMethod["MANUAL"] = "MANUAL";
})(PayoutMethod || (PayoutMethod = {}));
var PayoutStatus;
(function (PayoutStatus) {
    PayoutStatus["PENDING"] = "PENDING";
    PayoutStatus["IN_TRANSIT"] = "IN_TRANSIT";
    PayoutStatus["PAID"] = "PAID";
    PayoutStatus["CANCELLED"] = "CANCELLED";
})(PayoutStatus || (PayoutStatus = {}));
var ServiceChargeType;
(function (ServiceChargeType) {
    ServiceChargeType["CREDIT"] = "CREDIT";
    ServiceChargeType["DEBIT"] = "DEBIT";
})(ServiceChargeType || (ServiceChargeType = {}));
var ServiceChargeReason;
(function (ServiceChargeReason) {
    ServiceChargeReason["ORDER_TRANSACTION_FEE"] = "ORDER_TRANSACTION_FEE";
    ServiceChargeReason["PAYOUT_REQUEST_FEE"] = "PAYOUT_REQUEST_FEE";
    ServiceChargeReason["OTHER"] = "OTHER";
    ServiceChargeReason["OTHER_TAXABLE"] = "OTHER_TAXABLE";
    ServiceChargeReason["TAX"] = "TAX";
})(ServiceChargeReason || (ServiceChargeReason = {}));
/**
 * Controller related to payouts
 */
var PayoutController = /** @class */ (function () {
    function PayoutController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.request = this.request.bind(this);
        this.update = this.update.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new payout request
     * @param {String} vendor_id - Vendor ID
     * @param {Boolean} dry - Dry run or not
     * @returns {Promise<Payout>}
     */
    PayoutController.prototype.request = function (vendor_id, dry // default False
    ) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($vendor_id: String!, $dry: Boolean) {\n                    requestPayout(vendor_id: $vendor_id, dry: $dry) {\n                        _id\n                        total\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                vendor_id: vendor_id,
                dry: dry
            })
                //QUESTION only _id and total will be accessible is this the expected behaviour
                .then(function (result) {
                resolve(result.requestPayout);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update an existing pending payout
     * @param {string} id - Payout ID
     * @param {UpdatePayoutInput} payout - Updated payout object
     * @returns {Promise<string>}
     */
    PayoutController.prototype.update = function (id, payout) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!, $payout:UpdatePayoutInput!) {\n                    updatePayout(id: $id, payout: $payout) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                payout: payout
            })
                .then(function (result) {
                resolve(result.updatePayout._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Cancel a Payout
     * @param {string} id - Payout ID
     * @returns {Promise<Payout>}
     */
    PayoutController.prototype.cancel = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!) {\n                    cancelPayout(id: $id)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result.cancelPayout);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return PayoutController;
}());

/**
 * Controller related to explore page
 */
var ExplorePageController = /** @class */ (function () {
    function ExplorePageController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.replace = this.replace.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Replace the explore page
     * @param {Array<Advertisements>} advertisements - List of Explore page Ads
     * @param {Array<DailyDeals>} daily_deals - List of Explore page Daily Ads
     * @param {Array<SpecialDeals>} special_deals - List of Explore page Special Deals
     * @param {Array<TimelyDeals>} timely_deals - List of Explore page Timely Deals
     * @returns {Promise<String>} - Updated at
     */
    ExplorePageController.prototype.replace = function (advertisements, daily_deals, special_deals, timely_deals) {
        var _this = this;
        //QUESTION PR coupons is not included as option in mutation but exists as an option in the schema??
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($advertisements: [AdvertisementInput], $daily_deals: [DailyDealsInput], $special_deals: [SpecialDealsInput], $timely_deals: [TimelyDealsInput]) { \n                    replaceExplorePage(advertisements: $advertisements, daily_deals: $daily_deals, special_deals: $special_deals, timely_deals: $timely_deals) {\n                        updated_at\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                advertisements: advertisements,
                daily_deals: daily_deals,
                special_deals: special_deals,
                timely_deals: timely_deals
            })
                .then(function (result) {
                resolve(result.replaceExplorePage.updated_at);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return ExplorePageController;
}());

var FlashSaleType;
(function (FlashSaleType) {
    FlashSaleType["DOLLAR"] = "DOLLAR";
    FlashSaleType["PERCENTAGE"] = "PERCENTAGE";
})(FlashSaleType || (FlashSaleType = {}));
/**
 * Controller related to flash sales
 */
var FlashSaleController = /** @class */ (function () {
    function FlashSaleController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new flash sale
     * @param {string} vendor_id - Vendor ID
     * @param {FlashSaleType} type - If the flash sale is on PERCENTAGE or DOLLAR basis
     * @param {number} amount - Amount in cents to base the flash sale off of
     * @param {Array<FlashSaleItemInput>} items - List of items included in Flash Sale
     * @param {string} start_at - Start time for Flash Sale in ISO format
     * @param {string} end_at - End time for Flash Sale in ISO format
     * @returns {Promise<string>}
     */
    FlashSaleController.prototype.create = function (vendor_id, type, amount, items, start_at, end_at) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation($vendor_id: String!, $type: FlashSaleType!, $amount: Int!, $items: [FlashSaleItemInput]!, $start_at: String!, $end_at: String!) {\n                    createFlashSale(vendor_id: $vendor_id, type: $type, amount: $amount, items:$items, start_at:$start_at, end_at:$end_at) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                vendor_id: vendor_id,
                type: type,
                amount: amount,
                items: items,
                start_at: start_at,
                end_at: end_at
            })
                .then(function (result) {
                resolve(result.createFlashSale._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update existing flash sale
     * @param {string} id - Flash Sale ID
     * @param {Array<FlashSaleItems>} items - Updated List of items for Flash Sale
     * @param {string} end_at - End time for Flash Sale in ISO format
     * @returns {Promise<string>}
     */
    FlashSaleController.prototype.update = function (id, items, end_at) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation($id: String!, $items: [FlashSaleItemInput], $end_at: String) {\n                    updateFlashSale(id: $id, items:$items, end_at:$end_at) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                items: items,
                end_at: end_at
            })
                .then(function (result) {
                resolve(result.updateFlashSale._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return FlashSaleController;
}());

var TipController = /** @class */ (function () {
    function TipController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a tip
     * @param  {string} order_id - ID of the order tip is issued for
     * @param  {number} amount - Tip amount in cents
     * @returns {Promise<string>} - Returns the id of the tip created
     */
    //QUESTION Description is not in mutation but it is an optional field in GRAPH QL
    TipController.prototype.create = function (order_id, amount) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($order_id:String!, $amount:Int!) {\n                    createTip(order_id:$order_id, amount:$amount) {\n                        _id,\n                    }\n                }             \n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                order_id: order_id,
                amount: amount
            })
                .then(function (result) {
                resolve(result.createTip._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return TipController;
}());

var LoyaltyProgramType;
(function (LoyaltyProgramType) {
    LoyaltyProgramType["DOLLAR"] = "DOLLAR";
    LoyaltyProgramType["ORDER"] = "ORDER";
    LoyaltyProgramType["ITEM"] = "ITEM";
})(LoyaltyProgramType || (LoyaltyProgramType = {}));
/**
 * Controller for loyalty programs.
 */
var LoyaltyProgramController = /** @class */ (function () {
    function LoyaltyProgramController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new Loyalty Program, returns LoyaltyProgram _id if successful
     * @param {CreateLoyaltyProgramInput} loyalty_program - The LoyaltyProgram object input
     * @returns {Promise<string>} - The id of the LoyaltyProgram object
     */
    LoyaltyProgramController.prototype.create = function (loyalty_program) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($loyalty_program: CreateLoyaltyProgramInput!) {\n                    createLoyaltyProgram(loyalty_program: $loyalty_program) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                loyalty_program: loyalty_program
            })
                .then(function (result) {
                resolve(result.createLoyaltyProgram._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update an existing Loyalty Program, returns LoyaltyProgram _id if successful
     * @param {String} id - ID of the LoyaltyProgram object to update
     * @param {UpdateLoyaltyProgramInput} loyalty_program - The LoyaltyProgram update object input
     * @returns {Promise<string>} - The id of the LoyaltyProgram object
     */
    LoyaltyProgramController.prototype.update = function (id, loyalty_program) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id:String!, $loyalty_program: UpdateLoyaltyProgramInput!) {\n                    updateLoyaltyProgram(id:$id, loyalty_program: $loyalty_program) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                loyalty_program: loyalty_program
            })
                .then(function (result) {
                resolve(result.updateLoyaltyProgram._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Delete a Loyalty Program
     * @param {string} id - The id of the Loyalty Program
     * @returns {Promise<string>} - Return string
     */
    LoyaltyProgramController.prototype.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!) {\n                    deleteLoyaltyProgram(id: $id)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result.deleteLoyaltyProgram);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return LoyaltyProgramController;
}());

var LoyaltyTransactionType;
(function (LoyaltyTransactionType) {
    LoyaltyTransactionType["EARNING"] = "EARNING";
    LoyaltyTransactionType["EARNING_FRIEND"] = "EARNING_FRIEND";
    LoyaltyTransactionType["SHARING"] = "SHARING";
    LoyaltyTransactionType["REDEEMING"] = "REDEEMING";
})(LoyaltyTransactionType || (LoyaltyTransactionType = {}));
/**
 * Controller for loyalty cards.
 */
var LoyaltyCardController = /** @class */ (function () {
    function LoyaltyCardController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.createLoyaltyCardAndEnroll = this.createLoyaltyCardAndEnroll.bind(this);
        this.awardPointsToLoyaltyCard = this.awardPointsToLoyaltyCard.bind(this);
        this.awardShareablePointsToLoyaltyCard = this.awardShareablePointsToLoyaltyCard.bind(this);
        this.shareLoyaltyPoints = this.shareLoyaltyPoints.bind(this);
        this.redeemLoyaltyPointsForCoupon = this.redeemLoyaltyPointsForCoupon.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new Loyalty Card, automatically enrolling user in the loyalty program
     * @param {CreateLoyaltyCardInput} loyalty_card - The LoyaltyCard object input
     * @returns {Promise<string>} - The id of the LoyaltyCard object
     */
    LoyaltyCardController.prototype.createLoyaltyCardAndEnroll = function (loyalty_card) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($loyalty_card:CreateLoyaltyCardInput!) {\n                    createLoyaltyCardAndEnroll(loyalty_card: $loyalty_card) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                loyalty_card: loyalty_card
            })
                .then(function (result) {
                resolve(result.createLoyaltyCardAndEnroll._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Award usable points to a loyalty card
     * @param {string} id - ID of the loyalty card to which points are awarded
     * @param {number} amount - Number of points to award to loyalty card
     * @returns {Promise<string>} - The id of the LoyaltyTransaction
     */
    LoyaltyCardController.prototype.awardPointsToLoyaltyCard = function (id, amount) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!, $amount: Int!) {\n                    awardPointsToLoyaltyCard(id: $id, amount: $amount) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                amount: amount
            })
                .then(function (result) {
                resolve(result.awardPointsToLoyaltyCard._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Award shareable points to a loyalty card
     * @param {string} id - ID of the loyalty card to which shareable points are awarded
     * @param {number} amount - Number of shareable points to award to loyalty card
     * @returns {Promise<string>} - The id of the LoyaltyTransaction
     */
    LoyaltyCardController.prototype.awardShareablePointsToLoyaltyCard = function (id, amount) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!, $amount: Int!) {\n                    awardShareablePointsToLoyaltyCard(id: $id, amount: $amount) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                amount: amount
            })
                .then(function (result) {
                resolve(result.awardShareablePointsToLoyaltyCard._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Enable sharing of loyalty points from one loyalty card to another
     * @param {string} sender_customer_id - ID of the customer transferring loyalty points
     * @param {string} receiver_phone_number - Phone number of the receiver receiving the points
     * @param {string} loyalty_program_id - ID of the loyalty program in context of which points are shared
     * @param {number} no_of_points_to_share - Number of points to share
     * @returns {Promise<string>} - The id of the LoyaltyTransaction
     */
    LoyaltyCardController.prototype.shareLoyaltyPoints = function (sender_customer_id, receiver_phone_number, loyalty_program_id, no_of_points_to_share) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($sender_customer_id: String!, $receiver_phone_number: String!, $loyalty_program_id: String!, $no_of_points_to_share: Int!) {\n                    shareLoyaltyPoints(sender_customer_id: $sender_customer_id, receiver_phone_number: $receiver_phone_number, loyalty_program_id: $loyalty_program_id, no_of_points_to_share: $no_of_points_to_share) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                sender_customer_id: sender_customer_id,
                receiver_phone_number: receiver_phone_number,
                loyalty_program_id: loyalty_program_id,
                no_of_points_to_share: no_of_points_to_share
            })
                .then(function (result) {
                resolve(result.shareLoyaltyPoints._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Redeem a coupon in exchange of loyalty points for a particular item redeemable in a vendor's loyalty program
     * @param {string} loyalty_card_id - The id of the Loyalty Card
     * @param {string} menu_item_id - The id of the Menu ID which must be a redeemable in the vendor's loyalty plan
     * @returns {Promise<string>} - ID of the Coupon generated
     */
    LoyaltyCardController.prototype.redeemLoyaltyPointsForCoupon = function (loyalty_card_id, menu_item_id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($loyalty_card_id: String!, $menu_item_id: String!) {\n                    redeemLoyaltyPointsForCoupon(loyalty_card_id: $loyalty_card_id, menu_item_id: $menu_item_id) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                loyalty_card_id: loyalty_card_id,
                menu_item_id: menu_item_id
            })
                .then(function (result) {
                resolve(result.redeemLoyaltyPointsForCoupon._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return LoyaltyCardController;
}());

/**
 * Controller for redeemable items.
 */
var RedeemableItemController = /** @class */ (function () {
    function RedeemableItemController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    /**
     * Create a new Redeemable Item, returns RedeemableItem _id if successful
     * @param {CreateRedeemableItemInput} redeemable_item - The RedeemableItem object input
     * @returns {Promise<string>} - The id of the RedeemableItem object
     */
    RedeemableItemController.prototype.create = function (redeemable_item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation createRedeemableItem ($redeemable_item: CreateRedeemableItemInput!) {\n                    createRedeemableItem(redeemable_item: $redeemable_item) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                redeemable_item: redeemable_item
            })
                .then(function (result) {
                resolve(result.createRedeemableItem._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Update an existing RedeemableItem, returns RedeemableItem _id if successful
     * @param {string} id - ID of the RedeemableItem object to update
     * @param {UpdateRedeemableItemInput} redeemable_item - The RedeemableItem update object input
     * @returns {Promise<string>} - The id of the RedeemableItem object
     */
    RedeemableItemController.prototype.update = function (id, redeemable_item) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id:String!, $redeemable_item: UpdateRedeemableItemInput!) {\n                    updateRedeemableItem(id: $id, redeemable_item: $redeemable_item) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                redeemable_item: redeemable_item
            })
                .then(function (result) {
                resolve(result.updateRedeemableItem._id);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Delete a RedeemableItem
     * @param {string} id - The id of the RedeemableItem
     * @returns {Promise<string>} - Return string
     */
    RedeemableItemController.prototype.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!) {\n                    deleteRedeemableItem(id: $id)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result.deleteRedeemableItem);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return RedeemableItemController;
}());

/**
 * Controller for remote configuration.
 */
var RemoteConfigurationController = /** @class */ (function () {
    function RemoteConfigurationController(app) {
        this.app = app;
        // ADD BINDINGS BELOW
        this.fetch = this.fetch.bind(this);
        this.deleteRawConfiguration = this.deleteRawConfiguration.bind(this);
        this.updateRawConfiguration = this.updateRawConfiguration.bind(this);
        this.createRawConfiguration = this.createRawConfiguration.bind(this);
    }
    // ADD MUTATION METHODS BELOW
    //QUESTION is it correct to use JSON type here
    RemoteConfigurationController.prototype.fetch = function (name, version) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                query ($name: String!, $version: String!) {\n                    merged_configuration(name: $name, version: $version) {\n                        name\n                        data\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                //QUESTION this is a mutate call but the mutation string above is a query, should be a query call
                // I can not change it right now because I do not know what using it, so I have added a note in the
                // MutateResult interface
                .mutate(mutationString, {
                name: name,
                version: version
            })
                .then(function (result) {
                resolve(JSON.parse(result.merged_configuration.data));
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    RemoteConfigurationController.prototype.deleteRawConfiguration = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!) {\n                    deleteRawConfiguration(id: $id)\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id
            })
                .then(function (result) {
                resolve(result.deleteRawConfiguration);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    RemoteConfigurationController.prototype.updateRawConfiguration = function (id, rawConfiguration) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($id: String!, $rawConfiguration: UpdateRawConfigurationInput!) {\n                    updateRawConfiguration(id: $id, raw_configuration: $rawConfiguration) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                id: id,
                rawConfiguration: rawConfiguration
            })
                .then(function (result) {
                resolve(result.updateRawConfiguration);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    RemoteConfigurationController.prototype.createRawConfiguration = function (rawConfiguration) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var mutationString = "\n                mutation ($rawConfiguration: CreateRawConfigurationInput!) {\n                    createRawConfiguration(raw_configuration: $rawConfiguration) {\n                        _id\n                    }\n                }\n            ";
            _this.app
                .getAdaptor()
                .mutate(mutationString, {
                rawConfiguration: rawConfiguration
            })
                .then(function (result) {
                resolve(result.createRawConfiguration);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    return RemoteConfigurationController;
}());

var endpoints = {
    graphQLEndpoint: {
        production: "https://graphql-v1.cheapreats.com/graphql"
    },
    verificationEndpoint: {
        production: "https://ms-verification-v1.cheapreats.com"
    },
    validationEndpoint: {
        production: "https://ms-validation-v1.cheapreats.com"
    },
    imageEndpoint: {
        production: "https://ms-image-v1.cheapreats.com",
        distribution: "https://static.cheapreats.com"
    }
};

var config = {
    endpoints: endpoints
};
/**
 * Main entry point of the SDK
 */
var App = /** @class */ (function () {
    /**
     * Construct the App instance.
     * @hideconstructor
     */
    function App() {
        this._token = null;
        this._adaptor = new CheaprEatsGraphQLAdaptor({
            graphQLEndpoint: this.getConfiguration().endpoints.graphQLEndpoint
                .production
        });
        // ADD CONTROLLERS BELOW
        this._authorizationController = new AuthorizationController(this);
        this._cartController = new CartController(this);
        this._categoryController = new CategoryController(this);
        this._customerController = new CustomerController(this);
        this._customerTokenController = new CustomerTokenController(this);
        this._couponController = new CouponController(this);
        this._employeeController = new EmployeeController(this);
        this._employeeTokenController = new EmployeeTokenController(this);
        this._graphController = new GraphController(this);
        this._headOfficeController = new HeadOfficeController(this);
        this._menuItemController = new MenuItemController(this);
        this._modifierController = new ModifierController(this);
        this._vendorController = new VendorController(this);
        this._verificationController = new VerificationController(this);
        this._validationController = new ValidationController(this);
        this._surveyController = new SurveyController(this);
        this._orderController = new OrderController(this);
        this._imageController = new ImageController(this);
        this._payoutController = new PayoutController(this);
        this._explorePageController = new ExplorePageController(this);
        this._flashSaleController = new FlashSaleController(this);
        this._tipController = new TipController(this);
        this._loyaltyProgramController = new LoyaltyProgramController(this);
        this._loyaltyCardController = new LoyaltyCardController(this);
        this._redeemableItemController = new RedeemableItemController(this);
        this._remoteConfigurationController = new RemoteConfigurationController(this);
    }
    Object.defineProperty(App.prototype, "Authorization", {
        // ADD GETTERS BELOW
        get: function () {
            return {
                getTokenScope: this._authorizationController.getTokenScope
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Cart", {
        get: function () {
            return {
                updateNote: this._cartController.updateNote,
                removeCoupon: this._cartController.removeCoupon,
                applyCoupon: this._cartController.applyCoupon,
                delete: this._cartController.delete,
                removeItem: this._cartController.removeItem,
                addItem: this._cartController.addItem,
                create: this._cartController.create
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Category", {
        /**
         * Get category related methods.
         * @returns {{create: CategoryController.create, delete: CategoryController.delete, update: CategoryController.update, batchUpdate: CategoryController.batchUpdate}}
         */
        get: function () {
            return {
                create: this._categoryController.create,
                delete: this._categoryController.delete,
                update: this._categoryController.update,
                batchUpdate: this._categoryController.batchUpdate
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Customer", {
        /**
         * Get customer related methods.
         * @returns {{create: CustomerController.create, enrollApnsToken: CustomerController.enrollApnsToken, revokeApnsToken: CustomerController.revokeApnsToken, enrollFcmToken: CustomerController.enrollFcmToken, revokeFcmToken: CustomerController.revokeFcmToken, update: CustomerController.update, updateCreditCard: CustomerController.updateCreditCard, createWallet: CustomerController.createWallet, reloadWallet: CustomerController.reloadWallet, resetPassword: CustomerController.resetPassword, sendPasswordResetCode: CustomerController.sendPasswordResetCode, refundWallet: CustomerController.refundWallet, createWalletTransaction:CustomerController.createWalletTransaction, addFavouriteVendor:CustomerController.addFavouriteVendor, removeFavouriteVendor:CustomerController.removeFavouriteVendor, addFavouriteItem:CustomerController.addFavouriteItem, removeFavouriteItem:CustomerController.removeFavouriteItem}}
         */
        get: function () {
            return {
                create: this._customerController.create,
                enrollApnsToken: this._customerController.enrollApnsToken,
                revokeApnsToken: this._customerController.revokeApnsToken,
                enrollFcmToken: this._customerController.enrollFcmToken,
                revokeFcmToken: this._customerController.revokeFcmToken,
                update: this._customerController.update,
                updateCreditCard: this._customerController.updateCreditCard,
                createWallet: this._customerController.createWallet,
                reloadWallet: this._customerController.reloadWallet,
                resetPassword: this._customerController.resetPassword,
                sendPasswordResetCode: this._customerController.sendPasswordResetCode,
                refundWallet: this._customerController.refundWallet,
                createWalletTransaction: this._customerController.createWalletTransaction,
                addFavouriteVendor: this._customerController.addFavouriteVendor,
                removeFavouriteVendor: this._customerController.removeFavouriteVendor,
                addFavouriteItem: this._customerController.addFavouriteItem,
                removeFavouriteItem: this._customerController.removeFavouriteItem
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "CustomerToken", {
        /**
         * Get customer token related methods.
         * @returns {{create: CustomerTokenController.create}}
         */
        get: function () {
            return {
                create: this._customerTokenController.create
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Coupon", {
        /**
         * Get coupon related methods.
         * @returns {{create: CouponController.create}}
         */
        get: function () {
            return {
                create: this._couponController.create
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Employee", {
        /**
         * Get employee related methods.
         * @returns {{create: EmployeeController.create, update: EmployeeController.update, delete: EmployeeController.delete, enrollTerminalFcm: EmployeeController.enrollTerminalFcm, revokeTerminalFcm: EmployeeController.revokeTerminalFcm, sendPasswordResetCode: EmployeeController.sendPasswordResetCode}}
         */
        get: function () {
            return {
                create: this._employeeController.create,
                update: this._employeeController.update,
                delete: this._employeeController.delete,
                enrollTerminalFcm: this._employeeController.enrollTerminalFcm,
                revokeTerminalFcm: this._employeeController.revokeTerminalFcm,
                resetEmployeePassword: this._employeeController.resetEmployeePassword,
                sendPasswordResetCode: this._employeeController.sendPasswordResetCode
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "EmployeeToken", {
        /**
         * Get employee token related methods.
         * @returns {{create: EmployeeTokenController.create}}
         */
        get: function () {
            return {
                create: this._employeeTokenController.create
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Graph", {
        /**
         * Get graph related methods.
         * @returns {{query: GraphController.query}}
         */
        get: function () {
            return {
                query: this._graphController.query
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "MenuItem", {
        /**
         * Get menu item related methods.
         * @returns {{create: MenuItemController.create, update: MenuItemController.update, delete: MenuItemController.delete}}
         */
        get: function () {
            return {
                create: this._menuItemController.create,
                update: this._menuItemController.update,
                batchUpdate: this._menuItemController.batchUpdate,
                delete: this._menuItemController.delete
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Modifier", {
        /**
         * Get modifier related methods.
         * @returns {{create: ModifierController.create, update: ModifierController.update, delete: ModifierController.delete}}
         */
        get: function () {
            return {
                create: this._modifierController.create,
                update: this._modifierController.update,
                delete: this._modifierController.delete
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Order", {
        /**
         * Get order related methods.
         * @returns {{create: OrderController.create, cancel: OrderController.cancel, beginPreparing: OrderController.beginPreparing, prepared: OrderController.prepared, complete: OrderController.complete}}
         */
        get: function () {
            return {
                create: this._orderController.create,
                cancel: this._orderController.cancel,
                beginPreparing: this._orderController.beginPreparing,
                prepared: this._orderController.prepared,
                complete: this._orderController.complete
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "HeadOffice", {
        /**
         * Get head office related methods.
         * @returns {{create: HeadOfficeController.create, update: HeadOfficeController.update, delete: HeadOfficeController.delete}}
         */
        get: function () {
            return {
                create: this._headOfficeController.create,
                update: this._headOfficeController.update,
                delete: this._headOfficeController.delete
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Verification", {
        /**
         * Get verification services methods.
         * @returns {{startVerificationSession: VerificationController.startVerificationSession, checkVerificationSession: VerificationController.checkVerificationSession}}
         */
        get: function () {
            return {
                startVerificationSession: this._verificationController
                    .startVerificationSession,
                checkVerificationSession: this._verificationController
                    .checkVerificationSession
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Vendor", {
        /**
         * Get vendor related methods.
         * @returns {{create: VendorController.create, createWithEmployee: VendorController.createWithEmployee, update: VendorController.update, updateAllMenuItemsStatus: VendorController.updateAllMenuItemsStatus, deleteVendorTester: VendorController.deleteVendorTester, addVendorTesterByEmailAddress: VendorController.addVendorTesterByEmailAddress, updateVendorApprovalStatus: VendorController.updateVendorApprovalStatus, requestVendorApproval: VendorController.requestVendorApproval}}
         */
        get: function () {
            return {
                create: this._vendorController.create,
                createWithEmployee: this._vendorController.createWithEmployee,
                update: this._vendorController.update,
                updateAllMenuItemsStatus: this._vendorController.updateAllMenuItemsStatus,
                deleteVendorTester: this._vendorController.deleteVendorTester,
                addVendorTesterByEmailAddress: this._vendorController
                    .addVendorTesterByEmailAddress,
                updateVendorApprovalStatus: this._vendorController
                    .updateVendorApprovalStatus,
                requestVendorApproval: this._vendorController.requestVendorApproval
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Validation", {
        /**
         * Get validation services methods.
         * @returns {{Customer: {signupEmail: ValidationController.customerSignupEmail, signupPhone: ValidationController.customerSignupPhone}}}
         */
        get: function () {
            return {
                Customer: {
                    signupEmail: this._validationController.customerSignupEmail,
                    signupPhone: this._validationController.customerSignupPhone
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Survey", {
        /**
         * Get survey related methods
         * @returns {{create: SurveyController.create, update: SurveyController.update, archive: SurveyController.archive, delete: SurveyController.delete, release: SurveyController.release, createSurveyResponse: SurveyController.createSurveyResponse}}
         */
        get: function () {
            return {
                create: this._surveyController.create,
                update: this._surveyController.update,
                archive: this._surveyController.archive,
                delete: this._surveyController.delete,
                release: this._surveyController.release,
                createSurveyResponse: this._surveyController.createSurveyResponse
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Image", {
        /**
         * Get image services methods.
         * @returns {{upload: ImageController.upload, getLink: ImageController.getLink}}
         */
        get: function () {
            return {
                upload: this._imageController.upload,
                getLink: this._imageController.getLink
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Payout", {
        /**
         * Get payout methods.
         * @returns {{request: PayoutController.request, update: PayoutController.update, cancel: PayoutController.cancel, }}
         * @constructor
         */
        get: function () {
            return {
                request: this._payoutController.request,
                update: this._payoutController.update,
                cancel: this._payoutController.cancel
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "ExplorePage", {
        /**
         * Get explore page methods.
         * @returns {{replace: ExplorePageController.replace}}
         * @constructor
         */
        get: function () {
            return {
                replace: this._explorePageController.replace
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "FlashSale", {
        /**
         * Get flash sale methods.
         * @returns {{create: FlashSaleController.create, update: FlashSaleController.update}}
         * @constructor
         */
        get: function () {
            return {
                create: this._flashSaleController.create,
                update: this._flashSaleController.update
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Tip", {
        /**
         * Get tip methods.
         * @returns {{create: TipController.create}}
         * @constructor
         */
        get: function () {
            return {
                create: this._tipController.create
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "LoyaltyProgram", {
        /**
         * Get loyalty program methods.
         * @returns {{create: LoyaltyProgramController.create, update: LoyaltyProgramController.update, delete: LoyaltyProgramController.delete}}
         * @constructor
         */
        get: function () {
            return {
                create: this._loyaltyProgramController.create,
                update: this._loyaltyProgramController.update,
                delete: this._loyaltyProgramController.delete
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "LoyaltyCard", {
        /**
         * Get loyalty card methods.
         * @returns {{createLoyaltyCardAndEnroll: LoyaltyCardController.createLoyaltyCardAndEnroll, awardPointsToLoyaltyCard: LoyaltyCardController.awardPointsToLoyaltyCard, awardShareablePointsToLoyaltyCard: LoyaltyCardController.awardShareablePointsToLoyaltyCard, shareLoyaltyPoints: LoyaltyCardController.shareLoyaltyPoints, redeemLoyaltyPointsForCoupon: LoyaltyCardController.redeemLoyaltyPointsForCoupon}}
         * @constructor
         */
        get: function () {
            return {
                createLoyaltyCardAndEnroll: this._loyaltyCardController
                    .createLoyaltyCardAndEnroll,
                awardPointsToLoyaltyCard: this._loyaltyCardController
                    .awardPointsToLoyaltyCard,
                awardShareablePointsToLoyaltyCard: this._loyaltyCardController
                    .awardShareablePointsToLoyaltyCard,
                shareLoyaltyPoints: this._loyaltyCardController.shareLoyaltyPoints,
                redeemLoyaltyPointsForCoupon: this._loyaltyCardController
                    .redeemLoyaltyPointsForCoupon
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "RedeemableItem", {
        /**
         * Get redeemable item methods.
         * @returns {{create: RedeemableItemController.create, update: RedeemableItemController.update, delete: RedeemableItemController.delete}}
         * @constructor
         */
        get: function () {
            return {
                create: this._redeemableItemController.create,
                update: this._redeemableItemController.update,
                delete: this._redeemableItemController.delete
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "RemoteConfiguration", {
        get: function () {
            return {
                fetch: this._remoteConfigurationController.fetch,
                deleteRawConfiguration: this._remoteConfigurationController
                    .deleteRawConfiguration,
                updateRawConfiguration: this._remoteConfigurationController
                    .updateRawConfiguration,
                createRawConfiguration: this._remoteConfigurationController
                    .createRawConfiguration
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App.prototype, "Util", {
        /**
         * Get utility methods.
         * @returns {{strToIdentifier: (*|(function(): result))}}
         */
        get: function () {
            return {
                strToIdentifier: strToIdentifier
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get current network adaptor instance
     * @returns {CheaprEatsGraphQLAdaptor}
     */
    App.prototype.getAdaptor = function () {
        return this._adaptor;
    };
    /**
     * Get Configuration
     * @returns {{endpoints: ({graphQLEndpoint: {production: string}, verificationEndpoint: {production: string}, validationEndpoint: {production: string}, imageEndpoint: {production: string, distribution: string}}|{graphQLEndpoint, verificationEndpoint, validationEndpoint, imageEndpoint})}}
     */
    App.prototype.getConfiguration = function () {
        return config;
    };
    /**
     * Set current authentication token
     * @param token
     */
    App.prototype.setAuthenticationToken = function (token) {
        this._token = token;
        this._adaptor.setAuthenticationToken(token);
    };
    /**
     * Get current authentication token
     * @returns {null|string}
     */
    App.prototype.getAuthenticationToken = function () {
        return this._token;
    };
    /**
     * Determine if current SDK Version in compatible
     * @returns {null|boolean}
     */
    App.prototype.isCompatible = function () {
        var _this = this;
        var sdkVersion = packageDotJson.version;
        var queryString = "\n            query {\n                is_sdk_version_supported(version:\"" + sdkVersion + "\")\n            }\n        ";
        return new Promise(function (resolve, reject) {
            _this.Graph.query(queryString)
                .then(function (data) {
                resolve(data.is_sdk_version_supported);
            })
                .catch(function (e) {
                reject(e);
            });
        });
    };
    /**
     * Set Apollo endpoint.
     * WARNING: END OF LIFE
     * Please use setGraphQLEndpointInstead
     * @deprecated
     * @param endpoint
     */
    App.prototype.setApolloEndpoint = function (endpoint) {
        this.setGraphQLEndpoint(endpoint);
    };
    /**
     * Set GraphQL endpoint.
     * @param endpoint
     */
    App.prototype.setGraphQLEndpoint = function (endpoint) {
        config.endpoints.graphQLEndpoint.production = endpoint;
        this._adaptor = new CheaprEatsGraphQLAdaptor({
            graphQLEndpoint: this.getConfiguration().endpoints.graphQLEndpoint
                .production
        });
    };
    /**
     * Set verificationEndpoint.production
     * @param endpoint
     */
    App.prototype.setVerificationEndpoint = function (endpoint) {
        config.endpoints.verificationEndpoint.production = endpoint;
    };
    /**
     * Set validationEndpoint.production
     * @param endpoint
     */
    App.prototype.setValidationEndpoint = function (endpoint) {
        config.endpoints.validationEndpoint.production = endpoint;
    };
    /**
     * Set imageEndpoint.production
     * @param endpoint
     */
    App.prototype.setImageEndpoint = function (endpoint) {
        config.endpoints.imageEndpoint.production = endpoint;
    };
    /**
     * Set imageEndpoint.distribution
     * @param endpoint
     */
    App.prototype.setImageDistributionEndpoint = function (endpoint) {
        config.endpoints.imageEndpoint.distribution = endpoint;
    };
    return App;
}());

/**
 * Entry file for CheaprEats Node.js SDK
 * Author: Jun Zheng
 * License: UNLICENSED
 */
// declare global {
//   interface Window {
//     CE: App;
//   }
// }
var app = new App();
if (typeof window !== "undefined") {
    window.CE = app;
}

export default app;
