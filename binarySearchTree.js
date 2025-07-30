export class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b); // convert Array to Set to remove duplicates and then sort Set
    this.root = this.buildTree(sortedArray, 0, sortedArray.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  } 

  insert(value, node = this.root) {
    if (node === null) return new Node(value);
    if (value === node.data) return node; // ignore duplicates
    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  deleteItem(value, node = this.root) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        let successor = this.#minValueNode(node.right);
        node.data = successor.data;
        node.right = this.deleteItem(successor.data, node.right);
      }
    }
    return node;
  }

  #minValueNode(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  find(value, node = this.root) {
    if (node === null) return new Node(value);
    if (value === node.data) return node;
    if (value < node.data) {
      return node.left = this.find(value, node.left);
    } else {
      return node.right = this.find(value, node.right);
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required for levelOrderForEach.');
    }

    if (this.root === null) return;

    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current);

      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
   
  }
  // inOrderForEach(callback)
  // preOrderForEach(callback)
  // postOrderForEach(callback)


  prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
}