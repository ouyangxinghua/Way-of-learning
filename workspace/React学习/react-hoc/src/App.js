import React from 'react';
import ExampleMobx from './exampleMobx/index'
import LoginStatus from './LoginStatus';
import ShopCart from './ShopCart';
import WithLogin from './WithLogin';
import './App.css';
import exampleBase from "./examplebase/index"
import ExampleDebounce from './ExampleDebounce/index'
// const WithLoginStatus = WithLogin(LoginStatus);
// const WithShopCart = WithLogin(ShopCart);
function App() {
  return (
    <>
      <LoginStatus />
      <ShopCart />
      <ExampleMobx></ExampleMobx>
      <ExampleDebounce></ExampleDebounce>
      {/* <WithLoginStatus />
      <WithShopCart a="1" b="2"/> */}
    </>
  )
}

export default App;
