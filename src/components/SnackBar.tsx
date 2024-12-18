import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

type SnackbarProps = {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
};

// 스타일드 컴포넌트 정의
const SnackbarWrapper = styled.div<{
  isVisible: boolean;
  type: 'success' | 'error';
}>`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
  ${(props) =>
    props.type === 'success'
      ? css`
          background-color: #22c55e; /* Green */
          color: white;
        `
      : css`
          background-color: #ef4444; /* Red */
          color: white;
        `}
`;

export default function Snackbar({ message, type, isVisible }: SnackbarProps) {
  return ReactDOM.createPortal(
    <SnackbarWrapper isVisible={isVisible} type={type}>
      {message}
    </SnackbarWrapper>,
    document.body
  );
}
