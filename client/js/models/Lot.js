;(function(window, angular, undefined) {'use strict';
    angular.module('Lot', ['ngRoute', 'ng-token-auth']).provider('LotsList', [function LotsListProvider() {

        var emptyFn = function() {};
        var LotsList = this;
        var defaultListConfig = {
            readUrl: '/api/Auctions'
        };
        var defaultLotConfig = {
            baseApiUrl: '/api',
            addModelUrl: '/Auctions',
            updateModelUrl: '/Auctions',
            readModelUrl: '/Auctions/{id}',
            deleteModelUrl: '/Auctions/{id}',

            addModelSuccessCallback: emptyFn,
            addModelFailureCallback: emptyFn,
            updateModelSuccessCallback: emptyFn,
            updateModelFailureCallback: emptyFn,
            deleteModelSuccessCallback: emptyFn,
            deleteModelFailureCallback: emptyFn

        };
        var listDefaultValues = {
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
            $get: ['$http', (function(LotsList) {
                return function($http) {

                    LotsList.lotsList = [];
                    LotsList.createLot = function(values, config) {

                        var ready = false;

                        function applyUrl(url, config) {
                            var val;
                            for (var i in config) {
                                var val = config[i];
                                if (typeof(val) == "number") {
                                    val += "";
                                }
                                if (typeof(val) != "string") {
                                    continue;
                                }
                                var reg = new RegExp('\{' + i + '\}', 'g');
                                url = url.replace(reg, val);
                            }
                            return url;
                        }

                        function makeByValues(values) {
                            this.values = angular.extend({}, listDefaultValues, values);
                            ready = true;
                        }

                        function makeById(id) {

                            this.getModel(id);
                        }

                        function Lot(values, config) {
                            values = values || {};
                            config = config || {};


                            this.config = angular.extend({}, defaultLotConfig, config);

                            if (typeof(values) == "object") {
                                makeByValues.call(this, values)
                            } else {
                                makeById.call(this, values);
                            }

                            return this;
                        }



                        Lot.prototype.addModel = function() {
                            var L = this;
                            return $http.post(applyUrl(this.config.baseApiUrl + this.addModelUrl, this.values), this.values).then(function(resp) {
                                L.values = response;
                                L.config.addModelSuccessCallback.call(L, response);
                                return this;
                            }, function(resp) {
                                L.addModelFailureCallback(response);
                                return this;
                            });
                        };
                        Lot.prototype.updateModel = function() {
                            var L = this;
                            return $http.put(applyUrl(this.config.baseApiUrl + this.updateModelUrl, this.values), this.values).then(function(resp) {
                                L.values = response;
                                L.config.updateModelSuccessCallback(response);
                                return this;
                            }, function(resp) {
                                L.updateModelSuccessCallback.call(L, response);
                                return this;
                            });
                        };

                        Lot.prototype.deleteModel = function() {
                            var L = this;
                            return $http.delete(applyUrl(this.config.baseApiUrl + this.deleteModelUrl, this.values), this.values).then(function(resp) {
                                L.values = L.defultValues;
                                L.config.deleteModelFailureCallback(response);
                                return this;
                            }, function(resp) {
                                L.deletelFailureCallback.call(L, response);
                                return this;
                            });
                        };

                        Lot.prototype.getModel = function(id, callback) {
                            if (typeof(id) != "string" && isNan(id)) {
                                throw "Invalid id parameter given to Lot constructor."
                            }

                            if (typeof(callback) != "function") {
                                callback = emptyFn;
                            }
                            var L = this;
                            ready = false;


                            $http.get(applyUrl(this.config.baseApiUrl + this.readModelUrl, this.values)).then(function(response) {
                                L.values = response;
                                callback(response);
                                ready = true;
                            });
                            return this;
                        };

                        return new Lot(values, config);
                    };


                    LotsList.loadData = function(filter, callback) {
                        var _this = this;
                        filter = filter || {};
                        callback = callback || emptyFn;
                        $http.get(defaultListConfig.readUrl + '?filter=' + JSON.stringify(filter)).success(function(data) {
                            _this.lotsList = [];
                            if (Array.isArray(data)) {
                                for (var i = 0; i < data.length; i++) {
                                    _this.lotsList.push(_this.createLot(data[i]));
                                }
                            }

                            callback.call(_this);

                        });

                        return this;
                    };

                    LotsList.getData = function() {
                        return this.lotsList;
                    };

                    LotsList.setData = function(data) {
                        if (!Array.isArray(data)) {
                            throw "Invalid data is given to LotsList."
                        }

                        for (var i = 0; i < data.length; i++) {
                            this.lotsList.push(this.createLot(data[i]));
                        }
                        return this;
                    };
                    return LotsList;
                }
            })(this)]
        }


    }])
})(window, window.angular);