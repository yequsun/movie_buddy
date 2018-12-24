import React, { Component } from 'react';
import {Menu} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Navbar extends Component {
    state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          as={Link} to='/'
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>

        <Menu.Item as={Link} to='/newpost' name='newPost' active={activeItem === 'newPost'} onClick={this.handleItemClick}>
          New Post
        </Menu.Item>

        <Menu.Item
          as={Link} to='/browse'
          name='browse'
          active={activeItem === 'browse'}
          onClick={this.handleItemClick}
        >
          Browse
        </Menu.Item>

        <Menu.Item
          as={Link} to='/messages'
          name='messages'
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        >
          Messages
        </Menu.Item>

        <Menu.Item
          as={Link} to='/profile'
          name='profile'
          active={activeItem === 'profile'}
          onClick={this.handleItemClick}
        >
          Profile
        </Menu.Item>
      </Menu>
    )
  }
}
export default Navbar;