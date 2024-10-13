import { ModalText, ModalTitle } from './TransitionsModal.tsx';

export default function AboutGameModal() {
  return (
    <ModalText>
      <ModalTitle>이 놀이는?</ModalTitle>
      이 놀이는 Belorin & Silas가 한국어로 만든
      <br />
      오픈 소스 프로젝트를 기반으로 <br />
      구현한 게임입니다.
      <br />
      원본 한국어 워들 게임은
      <a href="https://kordle.kr/" target="_blank" rel="noopener noreferrer">
        꼬들
      </a>
      에서 즐기실 수 있습니다.
    </ModalText>
  );
}
