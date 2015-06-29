// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

// INSTRUCTIONS FROM BOOKSTRAP:
// should use:
// document.body, element.childNodes, and element.classList

// var getElementsByClassName = function(className){
//   // your code here
//   result = [];
//   getElements(document.body, className);
//   return result;
// };

// function getElements(rootElement, className){
//   if (rootElement.classList && rootElement.classList.contains(className)){
//     result.push(rootElement);
//   }
//   if (rootElement.childNodes.length > 0){
//     _.each(rootElement.childNodes, function(element){
//       getElements(element, className);
//     });
//   }
// }

var getElementsByClassName = function (className, node){

  var results = []; 

  // check if the node is passed in the arguments list
  // if not, assign the defauld value (document.body)
  node = node || document.body;

  var classes = node.className ? node.className.split(" ") : undefined;
  // For each node, get all the class names. 
  // check if className is among the node's class names
  if (classes && classes.indexOf(className) != -1){
    results.push(node);
    // if it is a match, then add node to the results
  }

  var childNodes = node.childNodes;
  // repeat for node's children
  for (var i = 0; i < childNodes.length; i++){
    results= results.concat(getElementsByClassName(className, childNodes[i]));
  }

  return results;
};




