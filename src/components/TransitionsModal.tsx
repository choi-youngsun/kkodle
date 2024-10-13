import Modal from 'react-modal';
import styled from 'styled-components';
import CloseIcon from '../assets/close.svg';
import { IconImg } from './ToolBar.tsx';
import SubmitLetterRow from './SubmitLetterRow.tsx';
import { Letter, ToggleSwitchProps } from '../App.tsx';
import ChartModal from './ChartModal.tsx';
import ColorSwitches from './ColorSwitches.tsx';
import BeakerModal from './BeakerModal.tsx';
import AboutGameModal from './AboutGameModal.tsx';
import QuestionModal from './QuestionModal.tsx';
import CogModal from './CogModal.tsx';

interface Props {
  isModalOpen: boolean;
  handleClose: () => void;
  modalType: string;
  isPictureMod: boolean;
  handleSwitch: ToggleSwitchProps['handleSwitch'];
  isThemeMod: boolean;
}

export const customStyles = {
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

export const Wrapper = styled.div`
  background-color: white;
  width: 350px;
  height: auto;
  padding: 1.2rem;
`;

export const CloseButton = styled.button`
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
export const ModalText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin: 0;
`;
export const ModalTitle = styled.span`
  margin: 0.5rem 0 1rem 0;
  font-size: 1.3rem;
`;
export const ModalMiniText = styled.span`
  font-size: 0.9rem;
  color: gray;
`;

export const CogBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid gray;
`;

export const CogOptionInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CogOptionTitle = styled.span`
  font-size: 1rem;
  padding: 0.2rem 0;
`;

export const CogOptionText = styled.span`
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
    switch (modalType) {
      case 'Beaker':
        return (
          <Wrapper>
            <BeakerModal />
          </Wrapper>
        );
      case 'Cog':
        return (
          <Wrapper>
            <CogModal
              handleSwitch={handleSwitch}
              isPictureMod={isPictureMod}
              isThemeMod={isThemeMod}
            />
          </Wrapper>
        );
      case 'Question':
        return (
          <Wrapper>
            <QuestionModal />
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
            <AboutGameModal />
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
