import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
  render() {
    return (
      <header className='main-header'>
        <nav className='main-header__nav'>
          <div className='main-header__item-list'>
            <div className='main-header__item-left'>
              <div className='main-header__item'>
                <NavLink to='/' end>
                  Shop
                </NavLink>
              </div>
              <div className='main-header__item'>
                <NavLink to='/products'>Products</NavLink>
              </div>
              <div className='main-header__item'>
                <NavLink to='/cart'>Cart</NavLink>
              </div>
              <div className='main-header__item'>
                <NavLink to='/orders'>Orders</NavLink>
              </div>
              <div className='main-header__item'>
                <NavLink to='/admin/add-product'>Add Product</NavLink>
              </div>
              <div className='main-header__item'>
                <NavLink to='/admin/products'>Admin Products</NavLink>
              </div>
            </div>
            <div className='main-header__item-right'>
              <div className='main-header__item'>
                <NavLink to='/login'>Login</NavLink>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navigation;
