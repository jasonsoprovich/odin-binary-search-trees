import { Tree } from './binarySearchTree.js';

function createRandomArray(size, max = 99) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) +1);
}

const randomArray = createRandomArray(7);
console.log('Random array:', randomArray);
const tree = new Tree(randomArray);
console.log(tree.prettyPrint());

