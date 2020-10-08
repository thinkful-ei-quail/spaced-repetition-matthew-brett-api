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

const words = [
  {
    id: 1,
    language_id: 1,
    original: "équilibre",
    translation: "balance",
    next: 2,
    m: 1,
    wordIncorrectCount: 0,
    wordCorrectCount: 0,
  },
  {
    id: 2,
    language_id: 1,
    original: "automatique",
    translation: "Automate",
    next: 3,
    m: 1,
    wordIncorrectCount: 0,
    wordCorrectCount: 0,
  },
  {
    id: 3,
    language_id: 1,
    original: "extrapolé",
    translation: "extrapolate",
    next: 4,
    m: 1,
    wordIncorrectCount: 0,
    wordCorrectCount: 0,
  },
  {
    id: 4,
    language_id: 1,
    original: "maintenir",
    translation: "maintain",
    next: 5,
    m: 1,
    wordIncorrectCount: 0,
    wordCorrectCount: 0,
  },
  {
    id: 5,
    language_id: 1,
    original: "résoudre",
    translation: "solve",
    next: 6,
    m: 1,
    wordIncorrectCount: 0,
    wordCorrectCount: 0,
  },
  {
    id: 6,
    language_id: 1,
    original: "programme",
    translation: "program",
    next: 7,
    m: 1,
    wordIncorrectCount: 0,
    wordCorrectCount: 0,
  },
  {
    id: 7,
    language_id: 1,
    original: "qualité",
    translation: "quality",
    next: 8,
    m: 1,
    wordIncorrectCount: 0,
    wordCorrectCount: 0,
  },
  {
    id: 7,
    language_id: 1,
    original: "prioriser",
    translation: "prioritize",
    next: 9,
    m: 1,
    wordIncorrectCount: 0,
    wordCorrectCount: 0,
  },
  {
    id: 7,
    language_id: 1,
    original: "livrer",
    translation: "deliver",
    next: 10,
    m: 1,
    wordIncorrectCount: 0,
    wordCorrectCount: 0,
  },
  {
    id: 8,
    language_id: 1,
    original: "processus",
    translation: "process",
    next: 0,
    m: 1,
    wordIncorrectCount: 0,
    wordCorrectCount: 0,
  },
];
