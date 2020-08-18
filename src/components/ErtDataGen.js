import React from 'react'
import { Button, Select, MenuItem, InputLabel, TextField, TextareaAutosize, Slider } from '@material-ui/core';
import axios from 'axios';
import "./css/ertDataGen.css";
class ErtJsonGen extends React.Component {
    

    constructor(){
        super();
        this.state = {
          length : "50",
          value1 : "0",
          value2: "100",
          value: "",
          primitiveType : "",
          selectedOption : null, 
          condition : "",
          genType : "",
          fieldName : "",
          ratio : "50",
          innerRatio : "",
          gap1 : "0",
          gap2 : "100",
          operator : "",
          addedConditions : "",
          addedInfos :"",
          addedInnerRatios : "",
          addedFields : "",
        };
        this.handleLength = this.handleLength.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleValue1 = this.handleValue1.bind(this);
        this.handleValue2 = this.handleValue2.bind(this);
        this.handleCondition = this.handleCondition.bind(this);
        this.handleGenType = this.handleGenType.bind(this);
        this.handleFieldName = this.handleFieldName.bind(this);
        this.handleRatio = this.handleRatio.bind(this);
        this.handleInnerRatio = this.handleInnerRatio.bind(this);
        this.handleGap1 = this.handleGap1.bind(this);
        this.handleGap2 = this.handleGap2.bind(this);
        this.handleOperator = this.handleOperator.bind(this);
        this.handleValue3 = this.handleValue3.bind(this);
    }

    async postAll(){
        var maleRatio=document.getElementById("maleRatio").value;
        var femaleRatio=document.getElementById("femaleRatio").value;
        axios.post('http://localhost:8080/allRatio', {
            maleRatio: maleRatio,
            femaleRatio: femaleRatio
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    getDataType = () =>{
        var selectedOption = document.getElementById("GeneratorType").value;
        if(selectedOption == "specified"){
            document.getElementById("specifiedGen").hidden = false;
            document.getElementById("primitiveGen").hidden = true;
            this.state.addedConditions = "";
            this.state.addedInfos = "";
            this.state.addedFields = "All Added Fields And Gaps :\n --------------------------- \n";

            this.forceUpdate();
        }
        else{
            document.getElementById("specifiedGen").hidden = true;
            document.getElementById("primitiveGen").hidden = false;
            this.state.addedInnerRatios = "";
            this.state.addedFields = "";
            this.state.addedInfos = "All Added Data Types And Conditions :\n --------------------------- \n";
            this.forceUpdate();
        }
    }

    
    addPrimitiveCondition = () =>{
        var condition = document.getElementById("condition").value;
        var value1 = this.state.value1;
        var value2 = this.state.value2;
        var value3 = this.state.value3;
        var value = ""
        if(this.state.condition == "between"){
            value = value1 + " - " + value2;
        }
        else if(this.state.condition == "lessthan" || this.state.condition == "morethan"){
            value = value1;
        }
        else if(this.state.condition == "UpperCase" || this.state.condition == "LowerCase" || this.state.condition == "null"){
            value = value3;
        }
        console.log(value);
        axios.post('http://localhost:8080/addPrimitiveCondition', {
            condition: condition,
            value: value
          })
          .catch(function (error) {
            console.log(error);
          });
          
          this.state.addedConditions += "Condition : " + condition + " - Value : " + value + "\n";
          this.forceUpdate();
          document.getElementById("notification").textContent = "Condition added";
    }
    addPrimitiveType = () =>{
        var type = document.getElementById("type").value;
        var length = this.state.length;
        console.log(length);
        axios.post('http://localhost:8080/addPrimitiveType', {
            type: type,
            length: length
          })
          .catch(function (error) {
            console.log(error);
          });
          document.getElementById("notification").textContent = "Type added";
          this.state.addedInfos += "Type : " + type + " - Length : " + length + "\n" + this.state.addedConditions + "\n" + "---------------------------" +"\n"; 
          this.state.addedConditions = "";
          this.forceUpdate();
        }

    async generateData(){
        axios.post('http://localhost:8080/generateData', {
          })
          .catch(function (error) {
            console.log(error);
          });
          document.getElementById("notification").textContent = "Data generated";
    }

    async showField(){
        document.getElementById("field").hidden = false;
    }
    async showInnerRatio(){
        document.getElementById("innerRatioDiv").hidden = false;
    }
    addInnerRatio = () =>{
        var innerRatio = this.state.innerRatio;
        var operator =  this.state.operator;
        var gap = "";
        if(this.state.operator == "between"){
            gap = this.state.gap1 + " - " + this.state.gap2;
        }
        else if(this.state.operator == "morethan" || this.state.operator == "lessthan"){
            gap = this.state.gap1;
        }
        axios.post('http://localhost:8080/innerRatio', {
            innerRatio : innerRatio,
            operator : operator,
            gap : gap
          })
          .catch(function (error) {
            console.log(error);
          });
          this.state.addedInnerRatios += "Inner Ratio : "  + innerRatio + "\n" +  "Condition : " + operator + " - Gap : " + gap + "\n";
          this.forceUpdate();
    }
    addField = () =>{
        var fieldName = this.state.fieldName;
        var ratio =  this.state.ratio;
        axios.post('http://localhost:8080/fields', {
            fieldName : fieldName,
            ratio : ratio
          })
          .catch(function (error) {
            console.log(error);
          });
          this.state.addedFields += "Field Name : " + fieldName + "- Ratio : " + ratio + "\n" + this.state.addedInnerRatios + "\n"
          this.state.addedFields += "----------------------------\n";
          this.state.addedInnerRatios = "";
          this.forceUpdate();
    }
    generateSpecifiedData = () =>{
        var genType = this.state.genType;
        axios.post('http://localhost:8080/generateSpecifiedData', {
            genType : genType
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    handleLength(event) {
        this.setState({length: event.target.value});
    }
    handleType(event) {
        this.setState({primitiveType: event.target.value});
        
    }
    handleValue1(event) {
        this.setState({value1: event.target.value});
    }
    handleValue2(event) {
        this.setState({value2: event.target.value});
    }
    handleCondition(event) {
        this.setState({condition: event.target.value});
    }
    handleGenType(event) {
        this.setState({genType: event.target.value});
    }
    handleRatio(event) {
        this.setState({ratio: event.target.value});
    }
    handleFieldName(event) {
        this.setState({fieldName: event.target.value});
    }
    handleInnerRatio(event) {
        this.setState({innerRatio: event.target.value});
    }
    handleGap1(event) {
        this.setState({gap1: event.target.value});
    }
    handleGap2(event) {
        this.setState({gap2: event.target.value});
    }
    handleOperator(event) {
        this.setState({operator: event.target.value});
    }
    handleValue3(event) {
        this.setState({value3: event.target.value});
    }

    render() {

        if(this.state.primitiveType == "Byte" ||
        this.state.primitiveType == "Short" ||
        this.state.primitiveType == "Integer" ||
        this.state.primitiveType == "Long" ||
        this.state.primitiveType == "Float" ||
        this.state.primitiveType == "Double"){
               document.getElementById("lessThanOption").hidden = false;
               document.getElementById("betweenOption").hidden = false;
               document.getElementById("moreThanOption").hidden = false;
               document.getElementById("uperCaseOption").hidden = true;
                document.getElementById("lowerCaseOption").hidden = true;
                document.getElementById("nullOption").hidden = true;
                document.getElementById("stringCondition").hidden = true;
        }
        else if(this.state.primitiveType == "Character" ||
        this.state.primitiveType == "String"){
            document.getElementById("lessThanOption").hidden = true;
            document.getElementById("betweenOption").hidden = true;
            document.getElementById("moreThanOption").hidden = true;
            document.getElementById("uperCaseOption").hidden = false;
            document.getElementById("lowerCaseOption").hidden = false;
            document.getElementById("nullOption").hidden = false;
            document.getElementById("stringCondition").hidden = false;
            document.getElementById("value1").hidden = true;
            document.getElementById("value2").hidden = true;
            this.state.condition = "UpperCase";
        }
        else if(this.state.primitiveType == "Boolean"){
            document.getElementById("lessThanOption").hidden = true;
           document.getElementById("betweenOption").hidden = true;
           document.getElementById("moreThanOption").hidden = true;
           document.getElementById("uperCaseOption").hidden = true;
            document.getElementById("lowerCaseOption").hidden = true;
            document.getElementById("nullOption").hidden = true;
            document.getElementById("stringCondition").hidden = true;
            document.getElementById("value1").hidden = true;
            document.getElementById("value2").hidden = true;
        }
        if(this.state.condition == "between"){
            document.getElementById("value1").hidden = false;
            document.getElementById("value2").hidden = false;
        }
        else if(this.state.condition == "morethan" || this.state.condition == "lessthan"){
            document.getElementById("value1").hidden = false;
            document.getElementById("value2").hidden = true;
        }

        if(this.state.operator == "between"){
            document.getElementById("gap1").hidden = false;
            document.getElementById("gap2").hidden = false;
        }
        else if(this.state.operator == "morethan" || this.state.operator == "lessthan"){
            document.getElementById("gap1").hidden = false;
            document.getElementById("gap2").hidden = true;
        }
        
        return (
                <div className="ErtJsonGen" id="mainDiv">
                    <h1>EasyRestTest Data Generator</h1>
                    <div id="addedInfos"> 
                        <h5>{this.state.addedInfos}{this.state.addedConditions}</h5>
                        <h5>{this.state.addedFields}{this.state.addedInnerRatios}</h5>
                    </div>
                    <div id="generator">
                    <div class="select">
                        <br></br>
                        <select id="GeneratorType">
                            <option value="select">Select Data Type</option>
                            <option value="specified">Specified</option>
                            <option value="primitive">Primitive</option>
                        </select>
                    </div><br></br>
                    <Button className="selectDataType" variant="contained" onClick={this.getDataType}>Select</Button>
                    <br></br><br></br><br></br>
                    <div  id="specifiedGen" hidden>
                        <div id="genTypeAndField">
                            <br></br>
                        <TextField id="genType" label="GenType" variant="outlined" value={this.state.genType} onChange={this.handleGenType}/>
                        <Button className="addField" variant="contained" onClick={this.showField}>+</Button>
                        <div id="field" hidden>
                            <br></br>
                            <TextField id="fieldName" label="Field Name" variant="outlined" value={this.state.fieldName} onChange={this.handleFieldName}/>
                            <input 
                            id="ratio" 
                            type="range" 
                            min="0" max="100" 
                            value={this.state.ratio} 
                            onChange={this.handleRatio}
                            step="1"/>Ratio :<input id="numberInput" type="number"  value={this.state.ratio} 
                            onChange={this.handleRatio}></input>
                            <Button className="addInnerRatio" variant="contained" onClick={this.showInnerRatio}>Add Inner Ratio</Button><br></br>
                            <br></br></div>

                            <div id="innerRatioDiv" hidden>
                                <div id="innerRatioStyle">
                                    <div id="innerRatioDiv_2"><input 
                                    id="innerRatio" 
                                    type="range" 
                                    min="0" max="100" 
                                    value={this.state.innerRatio} 
                                    onChange={this.handleInnerRatio}
                                    step="1"/>Inner Ratio :<input id="numberInput" type="number"  value={this.state.innerRatio}
                                    onChange={this.handleInnerRatio}></input></div>
                                    <br></br><div class="select" id="operator"><select id="operator" value={this.state.operator} onChange={this.handleOperator}>
                                        <option>lessthan</option>
                                        <option>between</option>
                                        <option>morethan</option>
                                    </select></div>
                                    <div id="gaps"><div id = "gap1" hidden><input 
                                    id="gap1_1" 
                                    type="range" 
                                    min="0" max="100" 
                                    value={this.state.gap1} 
                                    onChange={this.handleGap1}
                                    step="1"/>Gap1 : <input id="numberInput" type="number"  value={this.state.gap1} 
                                    onChange={this.handleGap1}></input></div>
                                    <div id = "gap2" hidden><input 
                                    id="gap2_1" 
                                    type="range" 
                                    min="0" max="100" 
                                    value={this.state.gap2} 
                                    onChange={this.handleGap2}
                                    step="1"/>Gap2 :<input id="numberInput" type="number"  value={this.state.gap2}  
                                    onChange={this.handleGap2}></input>
                                    </div></div>
                                    <div id="addInnerRatioDiv"><Button className="addInnerRatio" variant="contained" onClick={this.addInnerRatio}>Add</Button></div>
                                </div>
                                <br></br>
                                <Button className="addField" variant="contained" onClick={this.addField}>Add Field</Button><br></br>
                                <Button className="addAll" variant="contained" onClick={this.generateSpecifiedData}>Generate Data</Button>
                            </div>
                        </div>
                    </div>
                    <div id="primitiveGen" hidden>
                    <div id="typeAndLength">
                    <div class="select" id="typeDiv"><select id="type" value={this.state.primitiveType} onChange={this.handleType}>
                            <option>Byte</option>
                            <option>Short</option>
                            <option>Integer</option>
                            <option>Long</option>
                            <option>Float</option>
                            <option>Double</option>
                            <option>Boolean</option>
                            <option>Character</option>
                            <option>String</option>
                        </select></div>
                        <div id="lengthSlider"><input 
                            id="length" 
                            type="range" 
                            min="0" max="100" 
                            value={this.state.length} 
                            onChange={this.handleLength}
                            step="1"/>Length : 
                            <input id="numberInput" type="number"  value={this.state.length}  
                                    onChange={this.handleLength}></input>
                        </div></div><br></br>
                        
                        <div id="condition_div">
                        <div class="select" id="select"><select id="condition" value={this.state.condition} onChange={this.handleCondition}>
                            <option id="selectOption">Select condition</option>
                            <option id="lessThanOption" hidden>lessthan</option>
                            <option id="betweenOption" hidden>between</option>
                            <option id="moreThanOption" hidden>morethan</option>
                            <option id="uperCaseOption" hidden>UpperCase</option>
                            <option id="lowerCaseOption" hidden>LowerCase</option>
                            <option id="nullOption" hidden>null</option>
                        </select></div>
                        <div id="stringConditionDiv"><div class="select" id="stringCondition" hidden><select id="value3" value={this.state.value3} onChange={this.handleValue3}>
                            <option id="specialOption">special</option>
                            <option id="plainOption">plain</option>
                            <option id="allOption">all</option>
                        </select></div></div>
                
                        <div id="valueSlider">
                        <div id="value1" hidden>
                            <input 
                            id="value1_1" 
                            type="range" 
                            min="0" max="100" 
                            value={this.state.value1} 
                            onChange={this.handleValue1}
                            step="1" />Gap1 :<input id="numberInput" type="number"  value={this.state.value1} 
                            onChange={this.handleValue1}></input></div>

                        <div id="value2" hidden>
                        <input 
                            id="value2_1" 
                            type="range" 
                            min="0" max="100" 
                            value={this.state.value2} 
                            onChange={this.handleValue2}
                            step="1"/>Gap2 : <input id="numberInput" type="number"  value={this.state.value2}
                            onChange={this.handleValue2}></input></div></div><br></br><br></br><div id="addCondition"><Button id="addCondition" className="addPrimitiveCondition" variant="contained" onClick={this.addPrimitiveCondition}>Add Condition</Button></div></div>
                        
                         <br></br>
                        <Button className="addPrimitiveType" variant="contained" onClick={this.addPrimitiveType}>Add addPrimitiveType</Button><br></br><br></br>
                        <Button className="generateData" variant="contained" onClick={this.generateData}>Generate Data</Button><br></br><br></br>
                        <div id="notification"></div>
                    </div>
                    </div>
                </div>
            )
    }
}

export default ErtJsonGen;