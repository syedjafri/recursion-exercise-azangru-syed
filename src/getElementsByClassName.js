// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

// INSTRUCTIONS FROM BOOKSTRAP:
// should use:
// document.body, element.childNodes, and element.classList

var getElementsByClassName = function(className){
  // your code here
  result = [];
  getElements(document.body, className);
  return result;
};

function getElements(rootElement, className){
  if (rootElement.classList && rootElement.classList.contains(className)){
    result.push(rootElement);
  }
  if (rootElement.childNodes.length > 0){
    _.each(rootElement.childNodes, function(element){
      getElements(element, className);
    });
  }
}
