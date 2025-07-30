import { Node, Tree } from './binarySearchTree.js';

// testing

const simpleArray = [1, 7, 4, 23, 8, 9];
const simpleTree = new Tree(simpleArray);
simpleTree.prettyPrint();

// test insert / delete
simpleTree.insert(6);
simpleTree.prettyPrint();
simpleTree.deleteItem(4);
simpleTree.prettyPrint();

// test find
console.log('Find 3', simpleTree.find(3)); // found
console.log('Find 99', simpleTree.find(99)); // not found


// test level order search
console.log("--- Testing levelOrderForEach with callback ---");
const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(testArray);
console.log("--- Initial Tree ---");
tree.prettyPrint();

console.log("Nodes traversed (data only):");
tree.levelOrderForEach((node) => process.stdout.write(`${node.data} `));

console.log("\n--- Testing levelOrderForEach without callback ---");
try {
  tree.levelOrderForEach(); // Calling without an argument
} catch (error) {
  console.error("Caught expected error:", error.message);
}

// test in/pre/post order search
// const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 67, 6345, 324]; 
// const tree = new Tree(testArray);
// console.log("--- Initial Tree ---");
// tree.prettyPrint();

console.log("--- Testing inOrderForEach ---");
console.log("Nodes traversed:");
tree.inOrderForEach((node) => process.stdout.write(`${node.data} `));
try { tree.inOrderForEach(); } catch (error) { console.error("Caught expected error:", error.message); }

console.log("--- Testing preOrderForEach ---");
console.log("Nodes traversed:");
tree.preOrderForEach((node) => process.stdout.write(`${node.data} `));
try { tree.preOrderForEach(); } catch (error) { console.error("Caught expected error:", error.message); }

console.log("--- Testing postOrderForEach ---");
console.log("Nodes traversed:");
tree.postOrderForEach((node) => process.stdout.write(`${node.data} `));
try { tree.postOrderForEach(); } catch (error) { console.error("Caught expected error:", error.message); }