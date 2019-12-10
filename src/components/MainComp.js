
import React from 'react';
import Button from '@material-ui/core/Button';
import { spacing } from '@material-ui/system';
import Banner from './TopBanner.js';
import Menu from './Menu.js';
import IncorporationForm from './IncorporationForm.js';
import DeleteIcon from '@material-ui/icons/Delete';
import "./css/mainComp.css";
import Validator from 'jsonschema';


var schema =  {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "map.feature.plot",
  "type": "object",
  "properties": {
    "overlayId": {
      "type": "string"
    },
    "featureId": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "format": {
      "type": "string",
      "enum": ["kml","geojson"],
      "default": "kml"
    },
    "feature": {
      "type": ["object", "string"],
      "additionalProperties": true
    },
    "zoom": {
      "type": "boolean",
      "default": false
    },
    "readOnly": {
      "type": "boolean",
      "default": true
    },
    "properties": {
      "additionalProperties": true,
      "type": "object"
    }
  },
  "required": ["featureId", "feature"]
}
var p = {
    "overlayId":"2d882141-0d9e-59d4-20bb-58e6d0460699.1",
   
    "format":"geojson1",
    "feature":{
      "type":"FeatureCollection",
      "features":[
        {
          "type":"Feature",
          "timePrimitive":{
            "timeSpan":{
              "begin":"1937-01-01T12:00:27.87+00:20",
              "end":"1976-01-01T12:00:27.87+00:20"
            },
            "timeSpans":[
              {
                "begin":"1937-01-01T12:00:27.87+00:20",
                "end":"1976-01-01T12:00:27.87+00:20"
              },
              {
                "begin":"1976-01-01T12:00:27.87+00:20",
                "end":"1988-01-01T12:00:27.87+00:20"
              }            
            ]          
          },
          "geometry":{
            "type":"Polygon",
            "coordinates":[
              [
                100,
                0
              ],
              [
                101,
                0
              ],
              [
                101,
                1
              ],
              [
                100,
                1
              ],
              [
                100,
                0
              ]            
            ]          
          },
          "properties":{
            "style":{
              "lineStyle":{
                "color":{
                  "r":255,
                  "g":0,
                  "b":255,
                  "a":0.5
                }              
              },
              "polyStyle":{
                "color":{
                  "r":0,
                  "g":255,
                  "b":0,
                  "a":0.25
                }              
              },
              "name":"test polygon",
              "id":"tp13456",
              "description":"polygon pop-up text"
            }          
          }        
        },
        {
          "type":"Feature",
          "geometry":{
            "type":"Line",
            "coordinates":[
              [
                80,
                3
              ],
              [
                81,
                3
              ],
              [
                81,
                5
              ],
              [
                82,
                2
              ]            
            ]          
          },
          "properties":{
            "style":{
              "lineStyle":{
                "color":{
                  "r":0,
                  "g":255,
                  "b":255,
                  "a":0.5
                }              
              }            
            }          
          },
          "name":"crossingLine",
          "id":"0x45632",
          "description":"this is a line you don’t want to cross"
        }      
      ]    
    },
    "name":"Sample GeoJSON Feature Collection",
    "zoom":true,
    "readOnly":false
  }

class MainComp extends React.Component {
  constructor() {
    super();
    this.state = {
        classForm:[{data:<IncorporationForm/>}]

    };


  }

  componentDidMount(){
   this.validateJson(schema,p)
  }

  validateJson(shema,value){
    console.log(value);
    console.log(Validator.validate(value,shema));
  }
  


addClassForm = () => {
    this.setState({
      classForm: this.state.classForm.concat([{data:<IncorporationForm/>}])
    });
  };

removeClassForm = idx => () => {
    this.setState({
      classForm: this.state.classForm.filter((s, sidx) => idx != sidx)
    });
  };




  render() {
    return (
    <div>
        <Banner />
        <div>

        </div>
        <div className="mianContainer">

                <IncorporationForm/>

        </div>
    </div>
                         //<div className="createClassForm">
//                          {this.state.classForm.map((form, idx) => (
//                                form.data
//                          ))}

//                          </div>






    );
  }
}
export default MainComp;