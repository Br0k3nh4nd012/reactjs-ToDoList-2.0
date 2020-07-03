import React from 'react';
import'./ListItems.css';
import App from './App'
import NestListItems from "./NestListItems"
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FlipMove from 'react-flip-move';




class ListItems extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isActive :true,
            nestitems:[],
            nestcurrentitem: {
                nestedtext:"",
                nestedkey:""
            }
        }
        this.handleNestedItem = this.handleNestedItem.bind(this,);
        this.addnest = this.addnest.bind(this,);
    }
    handleNestedItem(e){
        this.setState({
            nestcurrentitem:{
                nestedtext: e.target.value,
                nestedkey: Date.now()
            }
        })
    }
    addnest(e){
        e.preventDefault();
        const newnested= this.state.nestcurrentitem;
        console.log(newnested);
        if(newnested.nestedtext!==""){
            const nestitems =[...this.state.nestitems, newnested];
            this.setState({
              nestitems: nestitems,
              nestcurrentitem:{
                nestedtext:"",
                nestedkey:""
              },
              
            })
          }
          
    }
    nestUpdate(nestedtext,nestedkey){
        const nestitems = this.state.nestitems;
        nestitems.map(nest =>{
        if(nest.nestedkey ===nestedkey){
            nest.nestedtext=nestedtext;
            }
        })
        this.setState({
        nestitems: nestitems
            })
        
        }
    nestdelete(nestedkey){
        const nestfilteredItems = this.state.nestitems.filter(nest =>
            nest.nestedkey!==nestedkey);
            this.setState({
              nestitems: nestfilteredItems,
            })
            
        }
    
    render(){
        const items = this.props.items;
        const listitems = items.map(item => {
            return <div className = "list" key = "item.key">
            <p>
                <input type = "text" value = {item.text}
                id = {item.key}
                onChange = {
                    (e) => {this.props.update(e.target.value,item.key)}
                }
                />
                <span>
                <FontAwesomeIcon className = "faicons" icon = "trash"
                onClick = {
                    () => this.props.delete(item.key)
                }
                />
            </span>
            

            </p>
            
            <div>
            <form id = "subtask" onSubmit = {this.addnest}>
            <input type = "text" placeholder ="subtasks to do.."
                value = {this.state.nestcurrentitem.nestedtext}
                onChange = {this.handleNestedItem}
                      
                
             />
             <button>add</button>
        </form>
        <NestListItems
            nestitems = {this.state.nestitems}
            nestUpdate = {this.nestUpdate.bind(this, )}
            nestdelete = {this.nestdelete.bind(this,)}
            >
                
            </NestListItems>  
            </div>
            

            
                
                
            
            
            
            
        </div>
        })
        return(
            <div>
            <FlipMove duration = {300} easing = "ease-in-out">
            {listitems}
            </FlipMove>
                
            </div>
        )
        
    }
}
export default ListItems;