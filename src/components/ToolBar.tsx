import { useState } from 'react';
import styled from 'styled-components';
import beakerIcon from '../assets/beaker.svg';
import chartIcon from '../assets/chart.svg';
import cogIcon from '../assets/cog.svg';
import questionIcon from '../assets/question.svg';
import TransitionsModal from './TransitionsModal.tsx';

const ToolBarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ToolBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px; // 임의로 지정한 값
  color: black;
`;
const ToolBarTitle = styled.h1`
  font-size: 1.25rem;
`;
const ToolBarIconBox = styled.div`
  display: flex;
  gap: 0.1rem;
  align-items: center;
`;

export const IconImg = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const AboutGame = styled.button`
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 0.375rem 0.625rem;
  border-radius: 0.625rem;
  background-color: rgb(224 231 255);
  color: rgb(67 56 202);
  margin-bottom: 1rem;
  &:hover {
    background-color: rgb(199 210 254);
  }
`;
function ToolBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const handleOpen = (type: string) => {
    setIsModalOpen(true);
    setModalType(type);
  };
  const handleClose = () => setIsModalOpen(false);

  return (
    <ToolBarContainer>
      <ToolBarWrapper>
        <ToolBarTitle>꼬들꼬들 - 한국어</ToolBarTitle>
        <ToolBarIconBox>
          <IconImg
            src={beakerIcon}
            alt="beaker-icon"
            onClick={() => handleOpen('Beaker')}
          />
          <IconImg
            src={cogIcon}
            alt="cog-icon"
            onClick={() => handleOpen('Cog')}
          />
          <IconImg
            src={questionIcon}
            alt="question-icon"
            onClick={() => handleOpen('Question')}
          />
          <IconImg
            src={chartIcon}
            alt="chart-icon"
            onClick={() => handleOpen('Chart')}
          />
        </ToolBarIconBox>
      </ToolBarWrapper>
      <AboutGame onClick={() => handleOpen('AboutGame')}>이 놀이는?</AboutGame>
      <TransitionsModal
        isModalOpen={isModalOpen}
        handleClose={handleClose}
        modalType={modalType}
      />
    </ToolBarContainer>
  );
}

export default ToolBar;
