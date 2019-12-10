import React from 'react'
import { Button, Select, MenuItem, InputLabel, TextField, TextareaAutosize } from '@material-ui/core';
import axios from 'axios';
import Form from "react-jsonschema-form";




class DefineRule extends React.Component {


    constructor() {
        super();
        this.state = {
            selectedRuleType: "JS Code",
            ruleTypeList: [],
            jsCodeValue: "f=function(){}",
            jsCodeResult: "",
            ruleName: "",
            ruleList:[],
            
        };
        this.renderMenuItem = this.renderMenuItem.bind(this);
        this.getRuleTypeList = this.getRuleTypeList.bind(this);
        this.handleRuleTypeChange = this.handleRuleTypeChange.bind(this);
        this.handleDenemeChange = this.handleDenemeChange.bind(this);
        this.renderCodeBlok = this.renderCodeBlok.bind(this);
        this.handleJsCodeChange = this.handleJsCodeChange.bind(this);
        this.handleRuleNameChange = this.handleRuleNameChange.bind(this);
        this.compileJsCode = this.compileJsCode.bind(this);
        this.saveJsCode=this.saveJsCode.bind(this);
        this.getRuleList=this.getRuleList.bind(this);
        this.handleRuleListChange=this.handleRuleListChange.bind(this);
    }
    componentDidMount() {
        this.getRuleList();
        this.getRuleTypeList();
        
    }

    async getRuleTypeList() {
        try {
            const response = await axios.post("http://localhost:8080/ruleTypes");
            this.setState({ ruleTypeList: response.data });
            
        } catch{ }
    }

    async getRuleList() {
        
        try {
            const response = await axios.post("http://localhost:8080/rulesList",{value:this.state.selectedRuleType});
            this.setState({ ruleList: response.data });
           
        } catch{ }
    }


    renderMenuItem(value) {
        
        return value.map((dt, i) => {
            return (
                <MenuItem
                    key={i}
                    value={dt}>
                    {dt}
                </MenuItem>
            );
        });
    }

    handleRuleTypeChange(evt) {
        console.log(evt.target.value);
        this.setState({ selectedRuleType: evt.target.value });
        this.getRuleList();
    };

    handleDenemeChange(evt) {
        this.setState({ deneme: evt.target.value });
    }

    handleJsCodeChange(evt) {
        this.setState({ jsCodeValue: evt.target.value });
    }

    handleRuleNameChange(evt) {
        this.setState({ ruleName: evt.target.value });
    }

    compileJsCode() {
        var f;
        try {
            eval(this.state.jsCodeValue);
            var result = f()
            console.log(result)
            this.setState({ jsCodeResult: JSON.stringify(result) });
        } catch{
            this.setState({ jsCodeResult: "Can not compile!" });
        }

    }

    async saveJsCode() {
        try {
            this.compileJsCode();
            var val={
                ruleName:this.state.ruleName,
                ruleType:this.state.selectedRuleType,
                jsCode:this.state.jsCodeValue,
                jsCodeResult:this.state.jsCodeResult
            }
            const response = await axios.post("http://localhost:8080/jsCodeSave",{
                value:val
            });
            
        } catch{ }
    }

    async handleRuleListChange(evt) {
        try {
            const response = await axios.post("http://localhost:8080/getRule",{
                value:evt.target.value
            });
            this.setState({jsCodeValue:response.data.jsCode,jsCodeResult:response.data.jsCodeResult,ruleName:evt.target.value})
            
        } catch{ }
    }

    renderCodeBlok() {
        if (this.state.selectedRuleType == "JS Code")
            return (
                <div>
                     <Select variant="outlined" className="textField" onChange={this.handleRuleListChange} >
                            {this.renderMenuItem(this.state.ruleList)}
                        </Select>

                    <TextareaAutosize
                        onChange={this.handleJsCodeChange}
                        className="textField"
                        aria-label="minimum height"
                        rows={15}
                        placeholder="JSON Data"
                        value={this.state.jsCodeValue} />

                    <TextareaAutosize

                        className="textField"
                        aria-label="minimum height"
                        rows={4}
                        rowsMax={4}
                        placeholder="Output of the function."
                        value={this.state.jsCodeResult} />
                    <button type="button" onClick={this.compileJsCode}>Compile</button>
                    <button type="button" onClick={this.saveJsCode}>Compile&Save</button>

                </div>
            );
    }
    render() {
        return (
            <div>
                <div>
                    <Button href="/" variant="contained" color="secondary" id="addClassBtn">Back</Button>
                </div>
                <div>
                    <form>

                       
                        <TextField
                            onChange={this.handleRuleNameChange}
                            placeholder={"Name Of the Rule"}
                            className="textField"
                            value={this.state.ruleName}
                            variant="outlined"
                        />
                        {this.renderCodeBlok()}
                    </form>
                </div>

            </div>
        );


    }
}
export default DefineRule;