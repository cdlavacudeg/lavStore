import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
function App() {
  return (
      <BrowserRouter>
    
        <div className="grid-container">
            <header className="row">
                <div>
                    <a href="/" className="brand">LavStore</a>
                </div>
                <div>
                    <a href="/cart">Cart</a>
                    <a href="/signin">Sign In</a>
                </div>
            </header>
            <main>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/product/:id" component={ProductScreen}></Route>
            </main>
            <footer className="row center">
                All rigth reserved
            </footer>
        </div> 
    </BrowserRouter>  
  );
}

export default App;
