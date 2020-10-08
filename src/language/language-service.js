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
        "incorrect_count",
        "language_id",
        "memory_value"
      )
      .where({ id })
      .first();
  },

  updateWords(db, currNode, nextNode) {
    console.log("updateWords ->  nextNode", nextNode);
    console.log("updateWords -> currNode", currNode);

    return db("word")
      .where({ id: currNode.id, language_id: currNode.language_id })
      .update({
        memory_value: currNode.memory_value,
        correct_count: currNode.correct_count,
        incorrect_count: currNode.incorrect_count,
        next: nextNode != null ? nextNode.id : null,
      });
  },

  updateHead(db, id, user_id, head) {
    return db("language").where({ id, user_id }).update({ head });
  },

  updateTotalScore(db, id, user_id, total_score) {
    return db("language").where({ id, user_id }).update({ total_score });
  },
};

module.exports = LanguageService;
