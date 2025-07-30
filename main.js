import { Node, Tree } from './binarySearchTree.js';

// testing

// const testArray = [1, 2, 3];
const testArray = [1, 2, 3, 5, 4];
// const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(testArray);
tree.prettyPrint();

// test insert / delete
tree.insert(6);
tree.prettyPrint();
tree.deleteItem(4);
tree.prettyPrint();

// test find
console.log('Find 3', tree.find(3)); // found
console.log('Find 99', tree.find(99)); // not found