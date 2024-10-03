import { useEffect, useState } from 'react';
import { keyToJamoMap } from './keyToJamoMap.ts';
import LetterRow from './LetterRow.tsx';
import SubmitLetterRow from './SubmitLetterRow.tsx';

export type LetterStatus = 'default' | 'ball' | 'strike' | 'error';

export type Letter = {
  letter: string;
  status: LetterStatus;
};

const maxGuesses = 6;
const answer = ['ㄱ', 'ㅗ', 'ㅇ', 'ㅈ', 'ㅏ', 'ㅇ']; // 정답 단어

const generateUniqueKey = () => crypto.randomUUID();

export default function LetterRowList() {
  const [keyArray, setKeyArray] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<Letter[][]>([]);
  const [currentAttempt, setCurrentAttempt] = useState(1); // 현재 몇 번째 시도인지
  const [wordError, setWordError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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
          const newGuess: Letter[] = keyArray.map((letter, index) => {
            let status: LetterStatus = 'default'; // 기본 상태

            if (letter === answer[index]) {
              status = 'strike'; // 정답과 위치가 같은 경우
            } else if (answer.includes(letter)) {
              status = 'ball'; // 정답에는 있지만 위치가 다른 경우
            }

            return { letter, status };
          });

          setGuesses((prevGuesses) => [...prevGuesses, newGuess]); // 현재 단어 제출
          setCurrentAttempt((prevAttempt) => prevAttempt + 1); // 다음 시도로 넘어감
          setKeyArray([]); // 배열 초기화
          setWordError(null); // 에러 메시지 초기화
        } else {
          setWordError('더 이상 시도할 수 없습니다.');
        }
      } else if (keyToJamoMap[key]) {
        const jamo = keyToJamoMap[key];
        if (keyArray.length < 6) {
          // 유효한 자모 입력
          setKeyArray((prevKeys) => [...prevKeys, jamo]);
          setWordError(null); // 에러 메시지 초기화
        }
      }
    };

    // 키보드 이벤트 리스너 등록
    window.addEventListener('keydown', handleKeyDown);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 해제
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyArray, currentAttempt]);
  return (
    <div>
      {wordError && <p style={{ color: 'red' }}>{wordError}</p>}
      {guesses.map((guess) => (
        <SubmitLetterRow key={generateUniqueKey()} inputValue={guess} />
      ))}
      {/* 현재 입력 중인 행을 빈 행으로 표시 */}
      <LetterRow inputValue={keyArray} />
      {/* 빈 행 렌더링 */}
      {Array.from({ length: maxGuesses - guesses.length - 1 }).map(() => (
        <LetterRow key={generateUniqueKey()} inputValue={[]} />
      ))}
    </div>
  );
}
