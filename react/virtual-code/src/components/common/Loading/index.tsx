
import * as React from 'react';
import './loading.css';
import styles from './index.module.scss';

const Loading: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}: {
  style?: React.CSSProperties;
}) => (
  <div className={styles.container} style={style}>
    <div>
      <div className="k-line k-line11-1" />
      <div className="k-line k-line11-2" />
      <div className="k-line k-line11-3" />
      <div className="k-line k-line11-4" />
    </div>
  </div>
);

export default Loading;
