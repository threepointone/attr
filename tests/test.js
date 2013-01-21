var Attr = require('./build'),
    __should = require('should'),
    _ = require('underscore');

describe('Attr', function(){
    it('should be mixed in to a regular object', function(){
        var o = {};
        Attr(o);
        (_.isFunction(o.get) && _.isFunction(o.set) && _.isFunction(o.describe)).should.be.true;

    });
});