import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import "./css/style.css";
var regexValue = "";

class IncorporationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      nameOfClass: "",
      parameters: [{ name: "", type: { name: "String", primitive: "true" }, regex: "", sample: "See sample", arraySize: 1, regexType: "" }],
      regexSamples: [{ value: "" }],
      parameterTypeList: [],
      jsonCode: "",
      sqlCode: { display: false, value: "" },
      classList: [],
      regexTypeList: [],
    };
    this.getSampleRegex = this.getSampleRegex.bind(this);
    this.getParameterTypeList = this.getParameterTypeList.bind(this);
    this.getRegexTypeList = this.getRegexTypeList.bind(this);
    this.renderParameterTypeList = this.renderParameterTypeList.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.getClassList = this.getClassList.bind(this);
    this.getClass = this.getClass.bind(this);
    this.createNewClass = this.createNewClass.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
    this.renderSqlBox = this.renderSqlBox.bind(this);
    this.getSqlCode = this.getSqlCode.bind(this);
    this.saveClass = this.saveClass.bind(this);
  }

  componentDidMount() {
    this.getParameterTypeList();
    this.getRegexTypeList();
    this.getClassList();
  }




  async getParameterTypeList() {
    try {

      const response = await axios.post("http://localhost:8080/paramList");

      this.setState({ parameterTypeList: response.data });

      console.log(response.data);
    } catch{
    }

  }

  async getRegexTypeList() {
    try {

      const response = await axios.post("http://localhost:8080/regexTypeList");

      this.setState({ regexTypeList: response.data });

      console.log(response.data);
    } catch{
    }

  }

  renderParameterTypeList() {
    return this.state.parameterTypeList.map((dt, i) => {
      return (
        <MenuItem
          key={i}
          value={dt}>
          {dt.name}
        </MenuItem>
      );
    });
  }

  renderRegexTypeList() {
    return this.state.regexTypeList.map((dt, i) => {
      return (
        <MenuItem
          key={i}
          value={dt}>
          {dt.name}
        </MenuItem>
      );
    });
  }

  handleRegexTypeChange = idx => evt => {
    var newType = this.state.parameters.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      if (evt.target.value.type == "other") return { ...shareholder, regexType: evt.target.value, regex: "" };
      return { ...shareholder, regexType: evt.target.value, regex: " %" + evt.target.value.name + "% " };
    });

    console.log(newType)
    this.setState({ parameters: newType });
    if (evt.target.value.type !== "other")
      this.getSampleRegex(idx, " %" + evt.target.value.name + "% ",evt.target.value.type)
    else
      this.getSampleRegex(idx, "","other")
  };


  handleNameChange = evt => {
    this.setState({ nameOfClass: evt.target.value });
  };

  handleShareholderNameChange = idx => evt => {
    const newParameters = this.state.parameters.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ parameters: newParameters });
  };

  handleArraySize = idx => evt => {
    console.log(evt.target.checked)
    const newParameters = this.state.parameters.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, arraySize: evt.target.value };
    });

    this.setState({ parameters: newParameters });
    console.log(newParameters)
  };

  handleParameterTypeChange = idx => evt => {


    var newType = this.state.parameters.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, type: evt.target.value };
    });

    console.log(newType)
    this.setState({ parameters: newType });
  };


  handleParameterRegexChange = idx => evt => {
    var self = this;
    this.getSampleRegex(idx, evt.target.value,this.state.parameters[idx].regexType.type);

    const newParameters = this.state.parameters.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, regex: evt.target.value, sample: regexValue };
    });

    this.setState({ parameters: newParameters });
    self.forceUpdate()

  };


  async getSampleRegex(idx, regex, type) {
    try {
      
      const response = await axios.post("http://localhost:8080/regex", {
        value: regex,
        regexType:type
      });
      const newParameters = this.state.parameters.map((shareholder, sidx) => {
        if (idx !== sidx) return shareholder;
        return { ...shareholder, sample: JSON.stringify(response.data) };
      });
      this.setState({ parameters: newParameters });

      console.log(response);
    } catch{
    }

  }
  async saveClass() {
    this.setState({ jsonCode: "LOADING....." })
    try {
      var data = {
        "nameOfClass": this.state.nameOfClass,
        "parameters": this.state.parameters
      }
      const response = await axios.post("http://localhost:8080/saveClass", {
        value: data
      });


      this.setState({ jsonCode: response.data })
      this.getClassList();
      this.getParameterTypeList();
      console.log(JSON.stringify(response.data));
    } catch{
    }

  }

  async handleSend() {
    this.setState({ jsonCode: "LOADING....." })
    try {

      const response = await axios.post("http://localhost:8080/getJsonScript", {
        value: this.state.nameOfClass
      });


      this.setState({ jsonCode: JSON.stringify(response.data) })
      this.getClassList();
      this.getParameterTypeList();
      console.log(JSON.stringify(response.data));
    } catch{
    }

  }

  async getSqlCode() {
    this.setState({ sqlCode: { display: true, value: "LOADING..." } })
    try {

      const response = await axios.post("http://localhost:8080/getSqlScript", {
        value: this.state.nameOfClass
      });
      this.setState({ sqlCode: { display: true, value: response.data } })

    } catch{
    }

  }

  renderSqlBox() {
    if (this.state.sqlCode.display)
      return <div><TextareaAutosize className="textField" aria-label="minimum height" rows={4} rowsMax={4} placeholder="SQL Script" value={this.state.sqlCode.value} /></div>
  }



  //  handleSend = evt => {
  //  var data = {
  //     "nameOfClass": this.state.nameOfClass,
  //     "parameters": this.state.parameters
  //  }
  //
  //   fetch("http://localhost:8080/values", {
  //      method: "POST",
  //      body:  JSON.stringify(data)
  //   })
  //   .then(function(response){
  //    return response.json();
  //   })
  //   .then(function(data){
  //   console.log(data)
  //   });
  //    this.setState({dump:JSON.stringify(data)});
  //   console.log(JSON.stringify(data));
  //  };


  handleAddShareholder = () => {
    this.setState({
      parameters: this.state.parameters.concat([{ name: "", type: "String", regex: "", arraySize: 1 }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      parameters: this.state.parameters.filter((data, index) => index !== idx)
    });
  };
  renderClassList() {
    return this.state.classList.map((dt, i) => {
      return (
        <li>
          <Link className={"link"} color="primary" onClick={this.getClass} id={dt} >
            {dt}
          </Link>
          <div className="deleteClassButton"><Fab onClick={() => this.deleteClass(dt)} size="small" color="primary" aria-label="add" >
            <DeleteIcon /></Fab></div>

        </li>
      );
    });
  }
  async getClassList() {
    try {

      const response = await axios.post("http://localhost:8080/classList");
      this.setState({ classList: response.data });
      console.log(response.data);
    } catch{
    }

  }



  async getClass(e) {
    try {

      const response = await axios.get("http://localhost:8080/class?className=" + e.target.id);
      console.log(response.data.attributes)
      var attributes = [];
      response.data.attributes.map((attr, idx) => {
        var value = { name: attr.name, type: { name: attr.type, primitive: attr.primitive, className: attr.className }, regex: attr.regex, arraySize: attr.arraySize, regexType:{type:attr.regexType} }
        console.log(value);
        attributes = attributes.concat(value)

      })
      console.log(attributes);
      this.setState({ nameOfClass: response.data.className, parameters: attributes, jsonCode: "", sqlCode: { display: false, value: "" } });



      // parameters: [{ name: "" ,type:{name:"String",primitive:"true"},regex:"",sample:"See sample"}],
      this.state.parameters.map((attr, idx) => this.getSampleRegex(idx, attr.regex))
      console.log(response.data);
    } catch{
    }

  }

  async deleteClass(dt) {
    try {
      console.log(dt)
      const response = await axios.get("http://localhost:8080/deleteClass?className=" + dt);
      console.log(response)
      this.getClassList();

    } catch{
    }

  }


  createNewClass() {
    this.setState({
      nameOfClass: "",
      parameters: [{ name: "", type: "String", primitive: "true", regex: "", sample: "See sample", arraySize: 1, relation: null }],
      jsonCode: "",
      sqlCode: { display: false }
    })
    this.getParameterTypeList();
  }



  render() {



    return (
      <div>
        <Button className="top-button" variant="contained" color="secondary" onClick={this.createNewClass}>Add New Class</Button>
        <Button className="top-button" variant="contained" color="primary" href="/defineRule">Define Rule</Button>
        <div className="leftMenu">

          <ul>
            {this.renderClassList()}
          </ul>
        </div>
        <div className="createClassForm">
          <form >
            <TextField
              className="textField"
              variant="outlined"
              placeholder="Class Name"
              value={this.state.nameOfClass}
              onChange={this.handleNameChange}
            />

            <div><h4>Parameters</h4>
              <Fab onClick={this.handleAddShareholder} size="small" color="primary" aria-label="add" >
                <AddIcon /></Fab>
            </div>
            {this.state.parameters.map((shareholder, idx) => (

              <div className="shareholder">

                <TextField
                  className="textField"
                  variant="outlined"
                  placeholder={`#${idx + 1} name`}
                  value={shareholder.name}
                  onChange={this.handleShareholderNameChange(idx)}
                />
                <Select variant="outlined" className="textField"
                  value={shareholder.type}
                  onChange={this.handleParameterTypeChange(idx)}
                >
                  {this.renderParameterTypeList()}
                </Select>

                <Select variant="outlined" className="textField" value={shareholder.regexType} onChange={this.handleRegexTypeChange(idx)}>
                  {this.renderRegexTypeList()}
                </Select>

                <TextField
                  className="textField"
                  variant="outlined"
                  placeholder={`#${idx + 1} regex`}
                  value={shareholder.regex}
                  onChange={this.handleParameterRegexChange(idx)}

                />
                <TextField
                  disabled
                  value={shareholder.sample}
                  className="textField"
                  defaultValue="See Sample"
                  variant="outlined"
                />
                <TextField

                  placeholder={"Size"}
                  className="textField"
                  value={shareholder.arraySize}
                  onChange={this.handleArraySize(idx)}
                  variant="outlined"
                  type="number"
                />

                <Fab variant="contained" onClick={this.handleRemoveShareholder(idx)} size="small" color="secondary" aria-label="delete" >
                  <DeleteIcon /></Fab>

              </div>
            ))}

            <div><TextareaAutosize className="textField" aria-label="minimum height" rows={4} rowsMax={4} placeholder="JSON Data" value={this.state.jsonCode} /></div>
            {this.renderSqlBox()}
            <button type="button" onClick={this.saveClass}>Save Class</button>
            <button type="button" onClick={this.handleSend}>Generate JSON Script</button>
            <button type="button" onClick={this.getSqlCode}>Generate SQL Script</button>

          </form>
        </div>
      </div>
    );
  }
}
export default IncorporationForm;


