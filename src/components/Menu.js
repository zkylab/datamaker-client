import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import "./css/menu.css";
class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
        classList:[],
    };

     this.getClassList=this.getClassList.bind(this);
     this.renderClassList=this.renderClassList.bind(this);
     this.getClass=this.getClass.bind(this);
  }

   componentDidMount(){
      this.getClassList();
    }

async getClassList(){
 try{

         const response = await axios.post("http://localhost:8080/classList");
            this.setState({ classList: response.data });
            console.log(response.data);
    }catch{
    }

}
async getClass(dt){
 try{

         const response = await axios.get("http://localhost:8080/class?className="+dt);
            console.log(response.data);
    }catch{
    }

}



renderClassList(){
 return this.state.classList.map((dt, i) => {
      return (
        <li>
         <Button className={"button"} color="primary" onClick={this.getClass(dt)}>
                                                        {dt}
                                                      </Button>     </li>
      );
    });
}



  render() {
    return (

         <ul>
             {this.renderClassList()}
         </ul>


    );
  }
}
export default Menu;

