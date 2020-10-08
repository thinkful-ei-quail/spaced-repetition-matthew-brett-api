const LinkedList = require("./LinkedList");

const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from("language")
      .select(
        "language.id",
        "language.name",
        "language.user_id",
        "language.head",
        "language.total_score"
      )
      .where("language.user_id", user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from("word")
      .select(
        "id",
        "language_id",
        "original",
        "translation",
        "next",
        "memory_value",
        "correct_count",
        "incorrect_count"
      )
      .where({ language_id });
  },

  getNextWord(db, id) {
    return db
      .from("word")
      .select(
        "id",
        "next",
        "original",
        "translation",
        "correct_count",
        "incorrect_count"
      )
      .where({ id })
      .first();
  },

  // generateWordList(db, language_id) {
  //   const wordList = new LinkedList();
  //   let words = [];
  //   words = this.getLanguageWords(db, language_id);

  //   this.sortList(words);

  //   for (let i = 0; i < words.length; i++) {
  //     wordList[i] = words[i];
  //   }

  //   return wordList;
  // },

  updateWords(db, currNode, nextNode) {
    return db('word')
      .where({ id: currNode.id, language_id: currNode.language_id })
      .update({
        memory_value: currNode.memory_value,
        correct_count: currNode.correct_count,
        incorrect_count: currNode.incorrect_count,
        next: nextNode != null ? nextNode.id : null
      });
  },

  updateHead(db, id, user_id, head) {
    return db('language')
      .where({ id, user_id })
      .update({ head });
  },
  
  updateTotalScore(db, id, user_id, total_score) {
    return db('language')
      .where({ id, user_id })
      .update({ total_score });
  },


  // wordList(db, language, words) {
  //   let wordList = new LinkedList();
  //   wordList.id = language.id;
  //   wordList.name = language.name;
  //   wordList.total_score = language.total_score
  //   let word = words.find((word) => word.id === language.id);
  //   wordList.insertFirst({
  //     id: word.id,
  //     original: word.original,
  //     translation: word.translation,
  //     memory_value: word.memory_value,
  //     wordCorrectCount: word.correct_count,
  //     wordIncorrectCount: word.incorrect_count,
  //   });
  //   while (word.next) {
  //     word = words.find((w) => w.id === word.next);
  //     wordList.insertLast({
  //       id: word.id,
  //       original: word.original,
  //       translation: word.translation,
  //       memory_value: word.memory_value,
  //       wordCorrectCount: word.correct_count,
  //       wordIncorrectCount: word.incorrect_count,
  //     });
  //   }
  //   return wordList;
  // },
};

module.exports = LanguageService;
