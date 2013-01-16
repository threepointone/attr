
# attr

  attribute classes

## Installation

    $ component install threepointone/attr

## API
```js
var Attr = require('attr');

// Take any object, and wrap with Attribute functionality

var x = {};
Attr(x);

// or, just instantiate 
var x = new Attr;

// set and get values on this object
x.set('a', 1);
x.set('b', 'beta');

console.log(x.get('a'), x.get('b'));
// 1 'beta'

// describe getters, setter, validators on attributes
x.describe('c', {
    value: 123,                             // initial value
    valueFn: function(){ return 123; },     // initial valueFn, in case you need access to `this` when initializing
    getter: function(v){ return v; },
    setter: function(v){ return v + v; },
    validator: function(v){ return v%3===0; },
    lazy: true,                             // doesn't get initialized until .get/.set is called
    readOnly: false                         // doesn't allow to be set, throws error when tried
});

console.log(x.get('c'));
//123

x.set('c', '125');
// error: attr:c did not validate for value:125 
```

## Tests
install dependencies - 
```
npm install
```
then
```
npm test
```   

## License

  MIT
