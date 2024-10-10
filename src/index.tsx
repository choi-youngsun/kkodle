import { createRoot } from 'react-dom/client';
import Modal from 'react-modal';
import './index.css';
import App from './App.tsx';

// Modal.setAppElement 화면에서 모달이 활성화되면, 모달 외부의 콘텐츠를 화면 리더가 읽지 않도록 설정
Modal.setAppElement('#root');

const container = document.getElementById('root');
const root = createRoot(container as Element);
root.render(<App />);
