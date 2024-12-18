export type LetterStatus = 'default' | 'ball' | 'strike' | 'error';

export type Letter = {
  letter: string;
  status: LetterStatus;
};

const convertGuessToEmoji = (guess: Letter[]): string => {
  return guess
    .map((item) => {
      switch (item.status) {
        case 'strike':
          return '🟩';
        case 'ball':
          return '🟨';
        default:
          return '⬛';
      }
    })
    .join(''); // 각 글자를 하나의 문자열로 결합
};

// 여러 개의 guess를 처리하는 함수
export default function ResultToEmoji(guesses: Letter[][]) {
  return guesses.map(convertGuessToEmoji).join('\n'); // 각 줄을 줄바꿈으로 구분
}
