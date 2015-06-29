// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  // will use underscore. Because it's already in the test suite and will make life easier
  if (isPrimitive(obj)){
    return stringifyPrimitive(obj);
  }else if(isObject(obj)){ 
    return stringifyObject(obj);
  }else if (_.isArray(obj)){
    return (function(){
      var result = [];
      _.each(obj, function(item, index, list){
        result.push(stringifyJSON(item));
      });
      return "[" + result.join(",") + "]";
    })();
  }

};

function isPrimitive(obj){
  if (
    _.isNumber(obj) ||
      _.isBoolean(obj) ||
      _.isString(obj) ||
      _.isNull(obj)
  ){
    return true;
  } else {
    return false;
  }
}

function isObject(obj){
  if (_.isObject(obj) && !_.isArray(obj) && !_.isFunction(obj)){
    return true;
  } else {
    return false;
  }
}

function stringifyPrimitive(obj){
  if (
      _.isString(obj)
  ){
    return '"' + obj + '"';
    // return obj;
  } else{
    return String(obj);
  }
}

function stringifyObject(obj){
  var keys = _.keys(obj);
  var result = _.reduce(keys, function(aggregator, key){
    if(typeof obj[key] !== 'function' && typeof obj[key] !== 'undefined'){
      var string = stringifyJSON(key) + ":";
      string += stringifyJSON(obj[key]);
      aggregator.push(string);
    }
    return aggregator;
  }, []);
  return "{" + result.join(",") + "}";
}
