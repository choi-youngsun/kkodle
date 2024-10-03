import { useEffect, useState } from 'react';
import { keyToJamoMap } from './keyToJamoMap.ts';
import LetterRow from './LetterRow.tsx';
import SubmitLetterRow from './SubmitLetterRow.tsx';

export type LetterStatus = 'default' | 'ball' | 'strike' | 'error';

export type Letter = {
  letter: string;
  status: LetterStatus;
};

const word1 = ['ㄱ', 'ㅗ', 'ㅏ', 'ㅈ', 'ㅓ', 'ㅣ'];
const word2 = ['ㄱ', 'ㅗ', 'ㅈ', 'ㅏ', 'ㅇ'];
const word3 = ['ㄱ', 'ㅗ', 'ㅇ'];
const submitWord1: Letter[] = [
  { letter: 'ㄱ', status: 'default' },
  { letter: 'ㅗ', status: 'ball' },
  { letter: 'ㅏ', status: 'ball' },
  { letter: 'ㅈ', status: 'default' },
  { letter: 'ㅓ', status: 'default' },
  { letter: 'ㅣ', status: 'strike' },
];
const submitWord2: Letter[] = [
  { letter: 'ㄱ', status: 'error' },
  { letter: 'ㅗ', status: 'error' },
  { letter: 'ㅏ', status: 'error' },
  { letter: 'ㅈ', status: 'error' },
  { letter: 'ㅛ', status: 'error' },
  { letter: 'ㅣ', status: 'error' },
];

export default function LetterRowList() {
  const [keyArray, setKeyArray] = useState<string[]>([]);
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
        } else {
          // 6글자일 때 엔터를 누르면 제출 후 배열 리셋
          console.log('제출된 단어:', keyArray.join('')); // 제출 로직
          setKeyArray([]); // 배열 초기화
          setWordError(null); // 에러 메시지 초기화
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
  }, [keyArray]);

  return (
    <div>
      {wordError && <p style={{ color: 'red' }}>{wordError}</p>}
      <LetterRow inputValue={word1} />
      <SubmitLetterRow inputValue={submitWord1} />
      <SubmitLetterRow inputValue={submitWord2} />
      <LetterRow inputValue={word2} />
      <LetterRow inputValue={word3} />
      <LetterRow inputValue={keyArray} />
    </div>
  );
}
