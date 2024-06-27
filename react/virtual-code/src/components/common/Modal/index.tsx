import { FC } from 'react';
import styles from './index.module.scss';

interface IModal {
  visible: boolean;
  title?: string;
  content?: string;
}

const Modal: FC<IModal> = ({ visible, title, content }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className={styles.mask}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
};

export default Modal;
