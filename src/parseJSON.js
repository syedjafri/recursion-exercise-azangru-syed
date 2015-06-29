// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var index;
  var currentCharacter;
  var escapeCharacters = {
    '"': '"',
    '\\': '\\',
    '/': '/',
    b: 'b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t'
  };
  var text;
  var error = function(message){
    throw {
      name:  "SyntaxError",
      message: message,
      at: index,
      text: text
    };
  };
  var next = function(character){
    if(character && character !== currentCharacter){
      error("Expected '" + character + "' instead of '" + currentCharacter + "'");
    }
    character = text.charAt(index);
    index += 1;
    return character;
  };
  var number = function(){
    var string = "";
    if(currentCharacter === "-"){
      sring = "-";
      next("-");
    }
    while (currentCharacter.match(/\d/)){
      string += currentCharacter;
      next();
    }
    if(currentCharacter === "."){
      string += currentCharacter;
      while(next() && currentCharacter.match(/\d/))){
        string += currentCharacter;
      }
    }
    var number = +string;
    if (isNaN(number)){
      error("Bad number");
    } else {
      return number;
    }
  };
  var string = function(){
    var string = "";
    if (currentCharacter === '"'){
      while(next()){
        if (currentCharacter === '"'){
          next();
          return string;
        }
      }
    } else if (currentCharacter === "\\") {
      next();
      if (typeof escapeCharacters[currentCharacter] === "string"){
        string += escapeCharacters[currentCharacter];
      } else {
        break;
      }
    } else {
      string += currentCharacter;
    } error("Bad string");
  };
  var whiteSpace = function(){
    while(currentCharacter && currentCharacter <= " "){
      next();
    }
  };
  var booleanOrNull = function(){
    switch (currentCharacter){
      case "t":
        next("t");
        next("r");
        next("u");
        next("e");
        return true;
      case "f":
        next("f");
        next("a");
        next("l");
        next("s");
        next("e");
        return false;
      case "n":
        next("n");
        next("u");
        next("l");
        next("l");
        return null;
    }
    error("Unexpected '" + currentCharacter + "'");
  };
  var value; // placeholder for the value function which is coming below
  var array = function(){
    var result = [];
    if (currentCharacter === "["){
      next("[");
      whiteSpace();
      if(currentCharacter === "]"){
        next("]");
        return result; // empty array;
      }
      while (currentCharacter){
        result.push(value());
        whiteSpace();
        if(currentCharacter === "]"){
          next("]");
          return result;
        }
        next(",");
        whiteSpace();
      }
    }
    error("Bad array");
  };
  var object = function(){
    var key;
    var object = {};
    if (currentCharacter === "{"){
      next("{");
      whiteSpace();
      if (currentCharacter === "}"){
        next("}");
        return object; // empty object
      }
      while(currentCharacter){
        key = string();
        whiteSpace();
        next(":");
        object[key] = value();
        whiteSpace();
        if (currentCharacter === "}"){
          next("}");
          return object;
        }
        next(",");
        whiteSpace();
      }
    }
    error("Bad object");
  };
  var value = function(){
    whiteSpace();
    switch (currentCharacter) {
      case "{":
        return object();
      case "[":
        return array();
      case '"':
        return string();
      case "-":
        return number();
      default:
        return currentCharacter.match(/\d/) ? number() : booleanOrNull();
    }
  };
  

};
