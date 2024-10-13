import { Letter } from '../App.tsx';
import SubmitLetterRow from './SubmitLetterRow.tsx';
import { ModalMiniText, ModalText, ModalTitle } from './TransitionsModal.tsx';

export default function QuestionModal() {
  const submitWord1: Letter[] = [
    { letter: 'ㄱ', status: 'default' },
    { letter: 'ㅗ', status: 'ball' },
    { letter: 'ㅏ', status: 'ball' },
    { letter: 'ㅈ', status: 'strike' },
    { letter: 'ㅓ', status: 'default' },
    { letter: 'ㅣ', status: 'ball' },
  ];
  return (
    <ModalText>
      <ModalTitle>어떻게 할까?</ModalTitle>
      <ModalMiniText>
        여섯 개의 자모로 풀어쓴 한글 단어 꼬들 을 여섯 번의
        <br />
        도전 안에 맞혀봅시다. 한글 단어를 풀어쓴 후<br />
        <strong>입력</strong>을 누르면 칸 색깔이 변합니다!
      </ModalMiniText>
      <SubmitLetterRow inputValue={submitWord1} />
      <ModalMiniText>
        자음 &apos;ㅈ&apos;는 올바른 자리에 있습니다. <br />
        모음 &apos;ㅗ&apos;,&apos;ㅏ&apos;는 잘못된 자리에 있습니다. <br />
        자음 &apos;ㄱ&apos;, 모음&apos;ㅓ&apos;,&apos;ㅣ&apos;는 어느 곳에도
        맞지 않습니다.
        <br />
        복합모음과 쌍자음, 겹받침은 더 작은 자모들로 풀어집니다.
      </ModalMiniText>
    </ModalText>
  );
}
