const Node = require("./Node");

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new Node(item, this.head);
  }
  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new Node(item, null);
    }
  }
  insertAt(element, index) {
    if (index > 0 && index > this.size) return false;
    else {
      var node = new Node(element);
      var curr, prev;
      curr = this.head;
      if (index == 0) {
        node.next = this.head;
        this.head = node;
      } else {
        curr = this.head;
        var it = 0;

        while (it < index) {
          it++;
          prev = curr;
          curr = curr.next;
        }
        node.next = curr;
        prev.next = node;
      }
      this.size++;
    }
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
    incorrect: 0,
    correct: 0,
  },
  {
    id: 2,
    language_id: 1,
    original: "automatique",
    translation: "Automate",
    next: 3,
    m: 1,
    incorrect: 0,
    correct: 0,
  },
  {
    id: 3,
    language_id: 1,
    original: "extrapolé",
    translation: "extrapolate",
    next: 4,
    m: 1,
    incorrect: 0,
    correct: 0,
  },
  {
    id: 4,
    language_id: 1,
    original: "maintenir",
    translation: "maintain",
    next: 5,
    m: 1,
    incorrect: 0,
    correct: 0,
  },
  {
    id: 5,
    language_id: 1,
    original: "résoudre",
    translation: "solve",
    next: 6,
    m: 1,
    incorrect: 0,
    correct: 0,
  },
  {
    id: 6,
    language_id: 1,
    original: "programme",
    translation: "program",
    next: 7,
    m: 1,
    incorrect: 0,
    correct: 0,
  },
  {
    id: 7,
    language_id: 1,
    original: "qualité",
    translation: "quality",
    next: 8,
    m: 1,
    incorrect: 0,
    correct: 0,
  },
  {
    id: 7,
    language_id: 1,
    original: "prioriser",
    translation: "prioritize",
    next: 9,
    m: 1,
    incorrect: 0,
    correct: 0,
  },
  {
    id: 7,
    language_id: 1,
    original: "livrer",
    translation: "deliver",
    next: 10,
    m: 1,
    incorrect: 0,
    correct: 0,
  },
  {
    id: 8,
    language_id: 1,
    original: "processus",
    translation: "process",
    next: 0,
    m: 1,
    incorrect: 0,
    correct: 0,
  },

];

function swap(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function SortByNext(arr) {
  let beginningIndex = 0;
  let currentIndex = 1;
  while (currentIndex < arr.length) {
    while (currentIndex > 0) {
      currentVal = arr[currentIndex].next;
      previousVal = arr[currentIndex - 1].next;
      if (currentVal <= previousVal) {
        swap(arr, currentIndex, currentIndex - 1);
        currentIndex--;
      } else {
        break;
      }
    }
    beginningIndex++;
    currentIndex = beginningIndex + 1;
  }

  for (let i = 0; i < arr.length - 1; i++) {
    arr[i].next = i + 1;
  }
  arr[arr.length - 1].next = null;

  return arr;
}

function populateList(words) {
  const list = new LinkedList();

  SortByNext(words);

  for (let i = 0; i < words.length; i++) {
    list.insertLast(words[i]);
  }
  return list;
}

function main() {
  let correct = true;

  for (let n = 0; n < 5; n++) {
    list = populateList(words);
    console.log (list)

    for (let i = 0; i < words.length; i++) {

      if (!correct) {
        words[i].m = 1;
        words[i].incorrect += 1;
        words[i].next = words[i].next + words[i].m;
        correct = !correct;
      } else {
        words[i].m = words[i].m * 2;
        words[i].correct += 1;
        words[i].next += words[i].m;
        correct = !correct;
      }

      words[i].next += words[i].m - 1;
      list = populateList(words);
    }


    for (let i = 0; i < words.length; i++)
      console.log(
        "next",
        words[i].next,
        "m",
        words[i].m,
        "correct",
        words[i].correct,
        "incorrect",
        words[i].incorrect,
        " - ",
        words[i].translation
      );
  }
}

main();
