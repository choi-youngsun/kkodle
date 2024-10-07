import { useEffect, useState } from 'react';
import { keyToJamoMap } from './keyToJamoMap.ts';
import LetterRow from './LetterRow.tsx';
import SubmitLetterRow from './SubmitLetterRow.tsx';

export type LetterStatus = 'default' | 'ball' | 'strike' | 'error';

export type Letter = {
  letter: string;
  status: LetterStatus;
};

type AnswerProps = {
  answer: string[];
  keyArray: string[];
  setKeyArray: React.Dispatch<React.SetStateAction<string[]>>;
  guesses: Letter[][];
  setGuesses: React.Dispatch<React.SetStateAction<Letter[][]>>;
  currentAttempt: number;
  setCurrentAttempt: React.Dispatch<React.SetStateAction<number>>;
  wordError: string | null;
  setWordError: React.Dispatch<React.SetStateAction<string | null>>;
};

const maxLength = 6;
const maxGuesses = 6;

const generateUniqueKey = () => crypto.randomUUID();

export default function LetterRowList({
  answer,
  keyArray,
  setKeyArray,
  guesses,
  setGuesses,
  currentAttempt,
  setCurrentAttempt,
  wordError,
  setWordError,
}: AnswerProps) {
  const [isAnswer, setIsAnswer] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAnswer) return;
      const key = event.key.toLowerCase();

      if (key === 'backspace') {
        // 백스페이스를 누르면 배열에서 마지막 글자 삭제
        setKeyArray((prevKeys) => prevKeys.slice(0, -1));
        setWordError(null); // 에러 메시지 초기화
      } else if (key === 'enter') {
        if (keyArray.length < 6) {
          // 6글자 이하일 때 엔터를 누르면 에러 메시지 출력
          setWordError('글자 수가 모자랍니다!');
        } else if (currentAttempt <= maxGuesses) {
          // 6글자일 때 엔터를 누르면 제출

          // guesses에 넣을 배열 추가
          const newGuess: Letter[] = keyArray.map((letter, index) => {
            let status: LetterStatus = 'default'; // 기본 상태

            if (letter === answer[index]) {
              status = 'strike'; // 정답과 위치가 같은 경우
            } else if (answer.includes(letter)) {
              status = 'ball'; // 정답에는 있지만 위치가 다른 경우
            }

            return { letter, status };
          });

          const updatedGuesses = [...guesses, newGuess];
          setGuesses(updatedGuesses);
          if (
            newGuess.every((letter, index) => letter.letter === answer[index])
          ) {
            setIsAnswer(true); // 정답을 맞춘 경우
            setWordError(`축하합니다! 정답은 ${answer}입니다.`);
          } else {
            setCurrentAttempt((prevAttempt) => prevAttempt + 1);
            setKeyArray([]);
            setWordError(null);
          }
        }
        if (currentAttempt === maxGuesses) {
          // 6번째 시도일 때 에러 메시지 출력
          setWordError(`오늘의 정답은 ${answer}입니다!`);
        }
      } else if (keyToJamoMap[key]) {
        const jamo = keyToJamoMap[key];
        if (keyArray.length < maxLength) {
          setKeyArray((prevKeys) => [...prevKeys, jamo]);
          setWordError(null); // 에러 메시지 초기화
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    keyArray,
    currentAttempt,
    answer,
    setKeyArray,
    setGuesses,
    setCurrentAttempt,
    setWordError,
    guesses,
    isAnswer,
  ]);
  return (
    <div>
      {wordError && <p style={{ color: 'red' }}>{wordError}</p>}
      {!isAnswer &&
        guesses.map((guess) => (
          <SubmitLetterRow key={generateUniqueKey()} inputValue={guess} />
        ))}
      {/* 현재 입력 중인 행을 빈 행으로 표시 */}
      {!isAnswer && currentAttempt <= 6 && (
        <LetterRow inputValue={keyArray} isError={!!wordError} />
      )}
      {/* 빈 행 렌더링 */}
      {Array.from({ length: maxGuesses - guesses.length - 1 }).map(() => (
        <LetterRow key={generateUniqueKey()} inputValue={[]} />
      ))}
    </div>
  );
}
