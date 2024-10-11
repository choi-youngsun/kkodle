import Modal from 'react-modal';
import styled from 'styled-components';
import CloseIcon from '../assets/close.svg';
import { IconImg } from './ToolBar.tsx';
import SubmitLetterRow from './SubmitLetterRow.tsx';
import { Letter, ToggleSwitchProps } from '../App.tsx';
import ChartModal from './ChartModal.tsx';
import ColorSwitches from './ColorSwitches.tsx';
import BeakerModal from './BeakerModal.tsx';

interface Props {
  isModalOpen: boolean;
  handleClose: () => void;
  modalType: string;
  isPictureMod: boolean;
  handleSwitch: ToggleSwitchProps['handleSwitch'];
  isThemeMod: boolean;
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 0,
  },
};

const Wrapper = styled.div`
  background-color: white;
  width: 350px;
  height: auto;
  padding: 1.2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  overflow: visible;
  cursor: pointer;
  padding: 0;
  margin: 0.5rem;
`;
const ModalText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin: 0;
`;
const ModalTitle = styled.span`
  margin: 0.5rem 0 1rem 0;
  font-size: 1.3rem;
`;
const ModalMiniText = styled.span`
  font-size: 0.9rem;
  color: gray;
`;

const CogBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid gray;
`;

const CogOptionInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CogOptionTitle = styled.span`
  font-size: 1rem;
  padding: 0.2rem 0;
`;

const CogOptionText = styled.span`
  font-size: 0.7rem;
  color: gray;
  padding: 0.2rem 0;
`;
export default function TransitionsModal({
  isModalOpen,
  handleClose,
  modalType,
  handleSwitch,
  isPictureMod,
  isThemeMod,
}: Props) {
  const renderModalContent = () => {
    const submitWord1: Letter[] = [
      { letter: 'ㄱ', status: 'default' },
      { letter: 'ㅗ', status: 'ball' },
      { letter: 'ㅏ', status: 'ball' },
      { letter: 'ㅈ', status: 'strike' },
      { letter: 'ㅓ', status: 'default' },
      { letter: 'ㅣ', status: 'ball' },
    ];

    switch (modalType) {
      case 'Beaker':
        return (
          <Wrapper>
            <ModalText>
              <ModalTitle>개발자에게 단어 추천하기</ModalTitle>
            </ModalText>
            <BeakerModal />
          </Wrapper>
        );
      case 'Cog':
        return (
          <Wrapper>
            <ModalText>
              <ModalTitle>설정</ModalTitle>
            </ModalText>
            <CogBox>
              <CogOptionInfo>
                <CogOptionTitle>사진 찍기</CogOptionTitle>
                <CogOptionText>글자를 투명하게 만듭니다.</CogOptionText>
              </CogOptionInfo>
              <ColorSwitches
                checked={isPictureMod}
                handleSwitch={handleSwitch}
                mode="PictureMod"
              />
            </CogBox>
            <CogBox>
              <CogOptionInfo>
                <CogOptionTitle>고대비 형태</CogOptionTitle>
                <CogOptionText>
                  칸의 색깔들을 더 구별하기 쉽게 바꿉니다.
                </CogOptionText>
              </CogOptionInfo>
              <ColorSwitches
                checked={isThemeMod}
                handleSwitch={handleSwitch}
                mode="ThemeMod"
              />
            </CogBox>
          </Wrapper>
        );
      case 'Question':
        return (
          <Wrapper>
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
                모음 &apos;ㅗ&apos;,&apos;ㅏ&apos;는 잘못된 자리에 있습니다.{' '}
                <br />
                자음 &apos;ㄱ&apos;, 모음&apos;ㅓ&apos;,&apos;ㅣ&apos;는 어느
                곳에도 맞지 않습니다.
                <br />
                복합모음과 쌍자음, 겹받침은 더 작은 자모들로 풀어집니다.
              </ModalMiniText>
            </ModalText>
          </Wrapper>
        );
      case 'Chart':
        return (
          <Wrapper>
            <ChartModal />
          </Wrapper>
        );
      case 'AboutGame':
        return (
          <Wrapper>
            <ModalText>
              <ModalTitle>이 놀이는?</ModalTitle>
              이 놀이는 Belorin & Silas가 한국어로 만든
              <br />
              오픈 소스 프로젝트를 기반으로 <br />
              구현한 게임입니다.
              <br />
              원본 한국어 워들 게임은
              <a
                href="https://kordle.kr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                꼬들
              </a>
              에서 즐기실 수 있습니다.
            </ModalText>
          </Wrapper>
        );
      default:
        return <Wrapper>NULL</Wrapper>;
    }
  };

  return (
    <Modal
      style={customStyles}
      isOpen={isModalOpen}
      onRequestClose={() => handleClose()}
    >
      <CloseButton onClick={() => handleClose()}>
        <IconImg src={CloseIcon} alt="close-icon" />
      </CloseButton>
      {renderModalContent()}
    </Modal>
  );
}
