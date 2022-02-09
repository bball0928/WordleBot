import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Button, Container } from "reactstrap";
import { count } from "console";
import rooster from "./icon";
import Rooster from "./icon";
import { wordList } from "./words";

function App() {
  const [randomWord, setRandomWord] = useState<string>("");
  const [correctWord, setCorrectWord] = useState<string>("");
  let guesses: any = [];
  useEffect(() => {
    let randomElement = wordList[Math.floor(Math.random() * wordList.length)];
    setCorrectWord("frame");
  }, []);
  const startGuessing = () => {
    let solved = false;
    let filteredWords = wordList;
    let isUsed = false;
    guesses = [];
    while (!solved) {
      let randomElement: any = "";
      while (guesses.some((guess: any) => guess == randomElement)) {
        if (!isUsed) {
          randomElement = "roate";
          isUsed = true;
        } else {
          randomElement =
            filteredWords[Math.floor(Math.random() * filteredWords.length)];
        }
      }
      guesses.push(randomElement);
      setRandomWord(randomElement);
      console.log(randomElement);
      if (randomElement == correctWord) {
        solved = true;
      }
      let difference = getDifference(randomElement, correctWord);
      const included: any = [];
      const includedAndCorrectPosition: any = [];
      Object.keys(difference).forEach((letter) => {
        if (difference[letter].included) {
          if (difference[letter].position) {
            includedAndCorrectPosition.push({
              letter: letter,
              index: difference[letter].index,
            });
          } else {
            included.push(letter);
          }
        }
      });
      const words = wordList.filter((word) => {
        if (included.every((letter: any) => word.indexOf(letter) >= 0)) {
          if (
            includedAndCorrectPosition.every(
              (obj: any) => word.indexOf(obj.letter) == obj.index
            )
          ) {
            return word;
          }
        }
      });
      filteredWords = words;
    }
  };
  function getDifference(guess: string, correct: string) {
    let diff: any = {};
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      if (diff[letter] != null) {
        diff[letter + i.toString()] = {
          position: false,
          included: false,
          index: 0,
        };
      }
      diff[letter] = {
        position: false,
        included: false,
        index: 0,
      };
    }
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      if (correct.includes(letter)) {
        diff[letter].included = true;
        const regex = new RegExp(`${letter}`, "g");
        if (
          diff[letter + i.toString()] &&
          (correct.match(regex) || []).length > 1
        ) {
          diff[letter + i.toString()].included = true;
        }
        if (correct.indexOf(letter) == i) {
          diff[letter].position = true;
          diff[letter].index = i;
        }
      }
    }
    return diff;
  }
  return (
    <Container fluid>
      <Button onClick={() => startGuessing()}>Start</Button>
      <h1>{randomWord}</h1>
      <h1>{correctWord}</h1>
    </Container>
  );
}

export default App;
