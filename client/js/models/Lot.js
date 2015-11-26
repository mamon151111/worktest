(
    function (window, angular) {'use strict';
        angular.module('Lot', ['ngRoute', 'ng-token-auth']).provider('LotsList', [function LotsListProvider() {

            var emptyFn = function () {
                    return null;
                },
                LotsList = this,
                defaultListConfig = {
                    readUrl: '/api/Auctions',
                    lotConfig: {}
                },
                defaultLotConfig = LotsList.config = {
                    baseApiUrl: '/api',
                    addModelUrl: '/Auctions',
                    updateModelUrl: '/Auctions/{id}',
                    readModelUrl: '/Auctions/{id}',
                    deleteModelUrl: '/Auctions/{id}',

                    addModelSuccessCallback: emptyFn,
                    addModelFailureCallback: emptyFn,
                    updateModelSuccessCallback: emptyFn,
                    updateModelFailureCallback: emptyFn,
                    deleteModelSuccessCallback: emptyFn,
                    deleteModelFailureCallback: emptyFn

                },
                listDefaultValues = {
                    owner: 0,
                    timeStart: new Date(),
                    timeEnd: new Date(),
                    title: '',
                    description: '',
                    startPrice: 0,
                    lastPrice: 0,
                    priceStep: 0,
                    img: '',
                    buyNowPrice: 0,
                    closed: false,
                    id: null
                };



            return {
                $get: ['$http', (function (LotsList) {
                    return function ($http) {


                        LotsList.lotsList = [];
                        LotsList.createLot = function (values, config) {
                            var item, ready = false;

                            function applyUrl(url, config) {
                                var val, i, reg;

                                for (i in config) {
                                    if (config.hasOwnProperty(i)) {
                                        val = config[i];
                                        if (typeof val === "number") {
                                            val += "";
                                        }
                                        if (typeof val === "string") {
                                            reg = new RegExp('\\{' + i + '\\}', 'g');

                                            url = url.replace(reg, val);
                                        }
                                    }
                                }
                                return url;
                            }

                            function MakeByValues(values) {
                                this.values = angular.extend({}, listDefaultValues, values);
                                ready = true;
                            }

                            function MakeById(id) {

                                this.getModel(id);
                            }

                            function Lot(values, config) {
                                values = values || {};
                                config = config || {};


                                this.config = angular.extend({}, defaultLotConfig, config);

                                if (typeof values === "object") {
                                    MakeByValues.call(this, values);
                                } else {
                                    MakeById.call(this, values);
                                }

                                return this;
                            }



                            Lot.prototype.addModel = function () {
                                var L = this;
                                return $http.post(applyUrl(this.config.baseApiUrl + this.config.addModelUrl, this.values), this.values).then(function (response) {
                                    L.values = response.data;
                                    L.config.addModelSuccessCallback.call(L, response);
                                    return this;
                                }, function (response) {
                                    L.config.addModelFailureCallback(response);
                                    return this;
                                });
                            };
                            Lot.prototype.updateModel = function () {
                                var L = this;
                                return $http.put(applyUrl(this.config.baseApiUrl + this.config.updateModelUrl, this.values), this.values).then(function (response) {
                                    L.values = response.data;
                                    L.config.updateModelSuccessCallback(response);
                                    return this;
                                }, function (response) {
                                    L.config.updateModelSuccessCallback.call(L, response);
                                    return this;
                                });
                            };

                            Lot.prototype.deleteModel = function () {
                                var L = this;
                                return $http.delete(applyUrl(this.config.baseApiUrl + this.config.deleteModelUrl, this.values), this.values).then(function (response) {
                                    L.values = L.defultValues;
                                    L.config.deleteModelFailureCallback(response);
                                    return this;
                                }, function (response) {
                                    L.config.deletelFailureCallback.call(L, response);
                                    return this;
                                });
                            };

                            Lot.prototype.getModel = function (id, callback) {
                                if (typeof id  !== "string" && isNaN(id)) {
                                    throw "Invalid id parameter given to Lot constructor.";
                                }

                                if (typeof callback  !== "function") {
                                    callback = emptyFn;
                                }
                                var L = this;
                                ready = false;


                                $http.get(applyUrl(this.config.baseApiUrl + this.config.readModelUrl, this.values)).then(function (response) {
                                    L.values = response.data;
                                    callback(response);
                                    ready = true;
                                });
                                return this;
                            };

                            Lot.prototype.set = function (field, value) {
                                var i;
                                if (value === undefined && typeof field === "object") {
                                    for (i in field) {
                                        if (field.hasOwnProperty(i)) {
                                            this.values[i] = field[i];
                                        }
                                    }
                                } else if (typeof field === "string" || !isNaN(field)) {
                                    this.values[field] = value;
                                } else {
                                    throw "Invalid parameters passed to Lot's set method.";
                                }
                            };

                            return new Lot(values, config);
                        };


                        LotsList.loadData = function (filter, callback) {
                            var $_this = this,
                                i;
                            filter = filter || {};
                            callback = callback || emptyFn;

                            $http.get(defaultListConfig.readUrl + '?filter=' + JSON.stringify(filter)).success(function (data) {
                                $_this.lotsList = [];
                                if (Array.isArray(data)) {
                                    for (i = 0; i < data.length; i++) {
                                        $_this.lotsList.push($_this.createLot(data[i]));
                                    }
                                }

                                callback.call($_this);

                            });

                            return this;
                        };

                        LotsList.getData = function () {
                            return this.lotsList;
                        };

                        LotsList.setData = function (data) {
                            var i;
                            if (!Array.isArray(data)) {
                                throw "Invalid data is given to LotsList.";
                            }

                            for (i = 0; i < data.length; i++) {
                                this.lotsList.push(this.createLot(data[i]));
                            }
                            return this;
                        };

                        LotsList.configure = function (config) {
                            config = config || {};
                            this.config = angular.extend({}, defaultListConfig, config);
                            return this;
                        };
                        return LotsList;
                    };
                }(this))]
            };


        }]);
        }(window, window.angular)
);