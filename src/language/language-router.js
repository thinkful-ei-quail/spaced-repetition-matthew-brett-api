const express = require("express");
const LanguageService = require("./language-service");
const { requireAuth } = require("../middleware/jwt-auth");
const bodyParser = express.json();
const LinkedList = require("./linkedList");

const languageRouter = express.Router();

languageRouter
.use(requireAuth)
.use(async (req, res, next) => {
  try {
    const language = await LanguageService.getUsersLanguage(
      req.app.get("db"),
      req.user.id
    );

    if (!language)
      return res.status(404).json({
        error: `You don't have any languages`,
      });

    req.language = language;
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.get("/", async (req, res, next) => {
  try {
    const words = await LanguageService.getLanguageWords(
      req.app.get("db"),
      req.language.id
    );

    res.json({
      language: req.language,
      words: words.map(word => {
        word.original = word.original.replace('Ã©','é');
        return word;
      })
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter.use(requireAuth).get("/head", async (req, res, next) => {
  try {
    const headWord = await LanguageService.getNextWord(
      req.app.get("db"),
      req.language.head
    );
    res.json({
      nextWord: headWord.original.replace('Ã©','é'),
      totalScore: req.language.total_score,
      wordCorrectCount: headWord.correct_count,
      wordIncorrectCount: headWord.incorrect_count,
    });
    next();
  } catch (error) {
    next(error);
  }
});

languageRouter
  .use(requireAuth)
  .post("/guess", bodyParser, async (req, res, next) => {
    console.log(res.body);
    const db = req.app.get("db");
    const { guess } = req.body;

    if (!guess) {
      return res.status(400).json({
        error: `Missing 'guess' in request body`,
      });
    }

    try {
      const wordList = new LinkedList();

      let headWord = await LanguageService.getNextWord(db, req.language.head);
      wordList.insertFirst(headWord);

      while (headWord.next !== null) {
        const nextNode = await LanguageService.getNextWord(db, headWord.next);
        wordList.insertLast(nextNode);
        headWord = nextNode;
      }

      let isCorrect = false;

      if (guess.toLowerCase() === wordList.head.value.translation.toLowerCase()) {
        isCorrect = true;
        wordList.head.value.correct_count += 1;
        wordList.head.value.memory_value *= 2;
        req.language.total_score += 1;
      } else {
        wordList.head.value.incorrect_count += 1;
        wordList.head.value.memory_value = 1;
      }

      let previousHead = wordList.head;
      wordList.remove(wordList.head.value);
      wordList.insertAt(previousHead.value.memory_value, previousHead.value);

      let tempNode = wordList.head;
      let langHead = tempNode.value.id;

      while (tempNode !== null) {
        await LanguageService.updateWords(
          db,
          tempNode.value,
          tempNode.next !== null ? tempNode.next.value : null
        );
        tempNode = tempNode.next;
      }

      await LanguageService.updateHead(
        db,
        req.language.id,
        req.language.user_id,
        langHead
      );

      await LanguageService.updateTotalScore(
        db,
        req.language.id,
        req.language.user_id,
        req.language.total_score
      );

      const response = {
        nextWord: wordList.head.value.original.replace('Ã©','é'),
        wordCorrectCount: wordList.head.value.correct_count,
        wordIncorrectCount: wordList.head.value.incorrect_count,
        totalScore: req.language.total_score,
        answer: previousHead.value.translation,
        isCorrect: isCorrect,
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  });

module.exports = languageRouter;
