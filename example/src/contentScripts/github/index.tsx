import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.less';

console.log(`Current page's url must be prefixed with https://github.com`);

const App = () => {
  console.log('app');
  return <div className={styles.umi}>123</div>;
};

const container = document.createElement('div');
container.id = 'umi';
document.body.append(container);

ReactDOM.render(<App />, container);
