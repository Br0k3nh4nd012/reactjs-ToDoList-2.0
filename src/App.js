import React from 'react';
import ListItems from "./ListItems"

import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';


library.add(faTrash);
library.add(faPlus);

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      currentItem:{
        text:"",
        key:""
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);

    
  }
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }
  
  
  addItem(e){
    e.preventDefault();
    const newitem = this.state.currentItem;
    console.log(newitem);
    if(newitem.text!==""){
      const items = [...this.state.items, newitem];
      this.setState({
        items: items,
        currentItem :{
          text:"",
          key:""
        }
      })
    }
    
  }

  update(text,key){
    const items = this.state.items;
    items.map(item =>{
      if(item.key ===key){
        item.text=text;
      }
    })
    this.setState({
      items: items
    })

    
  }
  delete(key){
    const filtered = this.state.items.filter(item => item.key!==key);
    this.setState({
      items: filtered
    })
  }

  render(){
    return (
      
      <div className="App">
        <p>TO DO LIST</p>
        <header>
          
          <form id = "to-do" onSubmit = {this.addItem}>
            <input type = "text" placeholder = "work to do..."
            value = {this.state.currentItem.text}
            onChange = {this.handleInput}

            />
            <button type ="submit">add</button>
          </form>
        </header>
        <ListItems
          items = {this.state.items}
          update = {this.update.bind(this, )}
          delete = {this.delete.bind(this,)}
        >

        </ListItems>

  
        
        
        
      </div>
    );
  }
  
}

export default App;
