class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }
  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }
  insertAt(n, wordToInsert) {
    if (n < 0) {
      throw new Error("Position error");
    }
    if (n === 0) {
      this.insertFirst(wordToInsert);
    }
    if (n > this.size()) {
      this.insertLast(wordToInsert);
    } else {
      const node = this.findNthElement(n - 1);
      const newNode = new _Node(wordToInsert, null);
      newNode.next = node.next;
      node.next = newNode;
    }
  }

  size() {
    let counter = 0;
    let currNode = this.head;
    if (!currNode) {
      return counter;
    } else counter++;
    while (!(currNode.next == null)) {
      counter++;
      currNode = currNode.next;
    }
    return counter;
  }

  findNthElement(n) {
    let node = this.head;
    for (let i = 0; i < n; i++) {
      node = node.next;
    }
    return node;
  }


  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }
  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    let currNode = this.head;
    let previousNode = this.head;

    while (currNode !== null && currNode.value !== item) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log("Item not found");
      return;
    }
    previousNode.next = currNode.next;
  }
}

module.exports = LinkedList;