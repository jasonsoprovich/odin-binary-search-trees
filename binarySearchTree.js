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

  insert(value) {
    this.root = this._insert(this.root, value);
  }

  _insert(node, value) {
    if (node === null) return new Node(value);
    if (value === node.data) return node; // ignore duplicates
    if (value < node.data) {
      node.left = this._insert(node.left, value);
    } else {
      node.right = this._insert(node.right, value);
    }
    return node;
  }

  deleteItem(value) {
    this.root = this._deleteItem(this.root, value);
  }

  _deleteItem(value, node = this.root) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this._deleteItem(node.left, value);
    } else if (value > node.data) {
      node.right = this._deleteItem(node.right, value);
    } else {
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        let successor = this.#minValueNode(node.right);
        node.data = successor.data;
        node.right = this._deleteItem(successor.data, node.right);
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
    if (node === null) return null;
    if (value === node.data) return node;
    if (value < node.data) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
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

  inOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required for inOrderForEach.');
    }

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      callback(node);
      traverse(node.right);
    };

    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required for preOrderForEach.');
    }

    const traverse = (node) => {
      if (node === null) return;
      callback(node);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required for postOrderForEach.');
    }

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node);
    };

    traverse(this.root);
  }

  height(value) {
    const node = this.find(value);
    if (node === null) return null;

    const getHeight = (node) => {
      if (node === null) return -1;
      return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
    };
    return getHeight(node);
  }

  depth(value) {
    const findDepth = (node, target, currentDepth = 0) => {
      if (node === null) return null;
      if (node.data === target) return currentDepth;
      
      if (target < node.data) {
        return findDepth(node.left, target, currentDepth + 1);
      } else {
        return findDepth(node.right, target, currentDepth + 1);
      }
    };
    
    return findDepth(this.root, value);
  }

  isBalanced() {
    const checkBalance = (node) => {
      if (node === null) return { balanced: true, height: -1};

      const left = checkBalance(node.left);
      const right = checkBalance(node.right);

      if (!left.balanced || !right.balanced) {
        return { balanced: false, height: 0 };
      }

      const heightDiff = Math.abs(left.height - right.height);
      const balanced = heightDiff <= 1;
      const height = Math.max(left.height, right.height) + 1;

      return { balanced, height };
    };
    return checkBalance(this.root).balanced;
  }

  rebalance() {
    const arr = [];
    this.inOrderForEach((node) => arr.push(node.data));
    this.root = this.buildTree(arr, 0, arr.length -1);
  }

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