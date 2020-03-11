import * as React from 'react';
import { Header, About} from './components';
// import {}

// 指定和约束App的类型
export const App: React.StatelessComponent<{}> = () => {
  return (
    <div>
      <Header />
      <About />
    </div>
  )
}