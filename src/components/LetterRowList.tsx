import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import { keyToJamoMap } from '../utils/keyToJamoMap.ts';
import LetterRow from './LetterRow.tsx';
import SubmitLetterRow from './SubmitLetterRow.tsx';
import Snackbar from './SnackBar.tsx';
import useClipboardCopy from '../hooks/useClipboardCopy.ts';

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
  isPictureMod: boolean;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  isThemeMod: boolean;
  isDone: boolean;
  setIsDone: React.Dispatch<React.SetStateAction<boolean>>;
};

const MAX_LENGTH = 6;
const MAX_GUESSES = 6;

const generateUniqueKey = () => crypto.randomUUID();

export default function LetterRowList({
  answer,
  keyArray,
  setKeyArray,
  guesses,
  isDone,
  setIsDone,
  setGuesses,
  currentAttempt,
  setCurrentAttempt,
  wordError,
  setWordError,
  isPictureMod,
  isModalOpen,
  isThemeMod,
  setIsModalOpen,
  setModalType,
}: AnswerProps) {
  const {
    isSnackBarOpen,
    snackBarMessage,
    setSnackBarMessage,
    snackBarType,
    setIsSnackBarOpen,
    showSnackbar,
  } = useClipboardCopy();

  const [isAnswer, setIsAnswer] = useState(false);

  const handleGameEnd = useCallback(() => {
    if (isAnswer || currentAttempt === MAX_GUESSES) {
      // 정답을 맞춘 경우: 시도 횟수와 정답을 저장
      const gameResult = isAnswer
        ? { attempt: currentAttempt, answer } // 정답을 맞춘 경우
        : { attempt: '오답', answer }; // 정답을 맞추지 못한 경우

      // 기존 결과를 로컬 스토리지에서 가져옴
      const existingResultsString = localStorage.getItem('gameResults');

      const existingResults = existingResultsString
        ? JSON.parse(existingResultsString)
        : [];

      // 마지막 결과와 비교
      const lastResult = existingResults[existingResults.length - 1];

      if (
        !lastResult ||
        JSON.stringify(lastResult) !== JSON.stringify(gameResult)
      ) {
        // 새로운 결과 추가
        existingResults.push(gameResult);
        // 업데이트된 결과를 로컬 스토리지에 저장
        localStorage.setItem('gameResults', JSON.stringify(existingResults));
      }

      // 차트 모달 열기
      setModalType('Chart'); // 차트 모달 타입 설정
      setIsModalOpen(true); // 모달 열림 상태 업데이트
    }
  }, [isAnswer, currentAttempt, answer, setIsModalOpen, setModalType]);

  useEffect(() => {
    if (isAnswer) {
      handleGameEnd();
    }
  }, [isAnswer, handleGameEnd]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAnswer || isModalOpen) return;
      const key = event.key.toLowerCase();
      if (key === 'backspace') {
        // 백스페이스를 누르면 배열에서 마지막 글자 삭제
        setKeyArray((prevKeys) => prevKeys.slice(0, -1));
        setWordError(null); // 에러 메시지 초기화
      } else if (key === 'enter') {
        if (keyArray.length < MAX_LENGTH) {
          // 6글자 이하일 때 엔터를 누르면 에러 메시지 출력
          setWordError('글자 수가 모자랍니다!');
        } else if (currentAttempt <= MAX_LENGTH) {
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
            setIsDone(true); // 게임 끝
            showSnackbar(
              `축하합니다. 오늘의 정답은 ${answer}입니다!`,
              'success'
            );
          } else {
            setCurrentAttempt((prevAttempt) => prevAttempt + 1);
            setKeyArray([]);
            setWordError(null);
          }
        }
        if (currentAttempt === MAX_GUESSES) {
          // 6번째 시도일 때 에러 메시지 출력
          setWordError(`오늘의 정답은 ${answer}입니다!`);
          handleGameEnd();
        }
      } else if (keyToJamoMap[key]) {
        const jamo = keyToJamoMap[key];
        if (keyArray.length < MAX_LENGTH) {
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
    setSnackBarMessage,
    showSnackbar,
    currentAttempt,
    answer,
    setKeyArray,
    setGuesses,
    setCurrentAttempt,
    setWordError,
    guesses,
    isAnswer,
    isModalOpen,
    handleGameEnd,
    setIsDone,
  ]);

  useEffect(() => {
    toast(wordError);
  }, [wordError]);
  return (
    <div>
      <Snackbar
        message={snackBarMessage}
        type={snackBarType}
        isVisible={isSnackBarOpen}
        onClose={() => setIsSnackBarOpen(false)}
      />
      {guesses.map((guess) => (
        <SubmitLetterRow
          key={generateUniqueKey()}
          inputValue={guess}
          isPictureMod={isPictureMod}
          isThemeMod={isThemeMod}
        />
      ))}
      {/* 현재 입력 중인 행을 빈 행으로 표시 */}
      {!isDone && currentAttempt <= 6 && (
        <LetterRow inputValue={keyArray} isError={!!wordError} />
      )}
      {/* 빈 행 렌더링 */}
      {Array.from({
        length: MAX_GUESSES - guesses.length - (isDone ? 0 : 1),
      }).map(() => (
        <LetterRow key={generateUniqueKey()} inputValue={[]} />
      ))}
    </div>
  );
}
