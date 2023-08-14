import './App.css';
import * as data from './data.js';
import React from 'react';
import * as $3Dmol from '3dmol/build/3Dmol.js';

export class Model extends React.Component{
  constructor (props){
      super(props);
      this.state = {
        pdb_data: data.pdb_data,
      }
      this.model = React.createRef();
      console.log(this.state.pdb_data);
//      this.display_structure(this.model, this.state.pdb_data)
    }

  componentDidMount(prevProps) {
    this.display_structure(this.model.current, this.state.pdb_data);
  }

  display_structure = (mol_container, pdb_data) =>
  {
    let hotspot_color = function(atom){
      if(atom.b === 1.0){atom.color = 'red'; return 'red';}
      if(atom.b === 0.5){atom.color = 'black'; return 'black';}
      if(atom.b === 50){atom.color = 'white'; return 'white';}
      if(atom.b === 100){atom.color = 'red'; return 'red';}
      atom.color = 'blue';
      return("blue");
    };
    let element = mol_container;
    let config = { backgroundColor: '#ffffff' };
    let viewer = $3Dmol.createViewer( element, config );
    viewer.addModel( pdb_data, "pdb" );                       /* load data */
    viewer.setStyle({}, {cartoon: {colorfunc: hotspot_color}});  /* style all atoms */
    viewer.addSurface($3Dmol.SurfaceType.VDW, {'opacity':0.8, colorscheme: 'whiteCarbon'});
    viewer.zoomTo();                                      /* set camera */
    viewer.render();                                      /* render scene */
    viewer.zoom(1.7, 3000);  
  }

  render(){
    return(
        <div>
            <div className="row">
              <div className="col-sm-7 col-sm-offset-5">
                <div id="container-01" ref={this.model} className="mol-container" style={{width: "600px",height: "600px", position: "relative"}}></div>
              </div>
            </div>
        </div>
    )}
}

export default Model;
