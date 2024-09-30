// "use strict";
// let age = 20;
// age = 'a';

// function add (a, b) {
//     return a + b;
//   }
//   console.log(add('2','4'))
//   console.log(add(2,4))

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  const clonedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
}

// Usage example
const original = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    country: "USA"
  },
  hobbies: ["reading", "gaming"]
};

const cloned = deepClone(original);
console.table(cloned.address || cloned.city || cloned.cityName );
