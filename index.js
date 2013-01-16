"use strict";

var each = require('each'),
    identity = function(x) {
        return x;
    };


module.exports = Attr;

function extend(obj) {
    each(Array.prototype.slice.call(arguments, 1), function(source) {
        for(var prop in source) {
            obj[prop] = source[prop];
        }
    });
    return obj;
}

function Attr(obj) {
    if(obj) return mixin(obj);
}

function mixin(obj) {
    for(var key in Attr.prototype) {
        obj[key] = Attr.prototype[key];
    }
    return obj;
}

Attr.prototype.describe = function(name, spec) {
    var t = this;
    var defaults = {
        value: null,
        valueFn: null,
        validate: function(value) {
            return true;
        },
        setter: identity,
        getter: identity,
        lazy: false,
        readOnly: false,

        // "private"
        _value: null,
        _init: false
    };
    if(typeof name !== 'string') {
        each(name, function(v, k) {
            t.describe(k, v);
        });
    }

    if(spec == null) {
        spec = {};
    }
    this._attrs = this._attrs || {};


    var attr = this._attrs[name] = extend({}, defaults, spec);

    attr.startup = function() {
        if(!attr._init) {
            attr._value = attr.valueFn ? attr.valueFn.apply(t) : attr.value;
            attr._init = true;
        }
        return attr;
    };
    if(!attr.lazy) {
        attr.startup();
    }
    return this;
};

Attr.prototype.get = function(key) {
    this._attrs = this._attrs || {};
    if(!this._attrs[key]) {
        this.describe(key);
    }
    var attr = this._attrs[key].startup();
    var value = attr.getter.call(this, attr._value);
    return value;
};

Attr.prototype.set = function(key, value) {
    this._attrs = this._attrs || {};
    if(!this._attrs[key]) {
        this.describe(key);
    }
    var attr = this._attrs[key].startup();
    if(attr.readOnly) {
        throw "attr:" + key + " is read only";
    }
    if(attr.validate.call(this, value)) {
        attr._value = attr.setter.call(this, value);
    } else {
        throw "attr:" + key + " did not validate for value:" + value;
    }
    return this;
};