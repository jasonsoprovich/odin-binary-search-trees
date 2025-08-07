import { Tree } from './binarySearchTree.js';

function createRandomArray(size, max = 99) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max) +1);
}

function printTraversals(tree, label) {
  const level = [];
  const pre = [];
  const post = [];
  const inorder = [];
  
  tree.levelOrderForEach((n) => level.push(n.data));
  tree.preOrderForEach((n) => pre.push(n.data));
  tree.postOrderForEach((n) => post.push(n.data));
  tree.inOrderForEach((n) => inorder.push(n.data));
  
  console.log(`\n--- ${label} ---`);
  console.log('Level order:', level.join(' '));
  console.log('Pre order:', pre.join(' '));
  console.log('Post order:', post.join(' '));
  console.log('In order:', inorder.join(' '));
}

// Step 1 - create binary search tree from an array of random numbers <100
const randomArray = createRandomArray(13);
console.log('Random array:', randomArray);
const tree = new Tree(randomArray);
console.log('\n--- Initial Tree ---');
tree.prettyPrint();

// Step 2 - confirm tree is balanced
console.log('Is balanced:', tree.isBalanced());

// Step 3 - print out BST traversals
printTraversals(tree, 'Balanced Tree Traversals');

// Step 4 - add several numbers > 100 to unbalance tree
console.log('Add numbers > 100 to tree.');
[102, 103, 107, 112, 124].forEach(num => tree.insert(num));
console.log('\n--- Unbalanced Tree ---');
tree.prettyPrint();

// Step 5 - confirm updated tree is unbalanced
console.log('Is balanced:', tree.isBalanced());

// Step 6 - rebalance tree
tree.rebalance();
console.log('\n--- Rebalanced Tree ---');
tree.prettyPrint();

// Step 7 - confirm rebalanced tree is balanced
console.log('Is balanced:', tree.isBalanced());

// Step 8 - reprint BST traversals
printTraversals(tree, 'Rebalanced Tree Traversals');