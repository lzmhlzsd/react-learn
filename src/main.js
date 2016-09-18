import React from 'react';
import ReactDom from 'react-dom';
import Charts from './components/charts';

import Panel from './components/panel/panel';

import './main.css';

ReactDom.render( < Panel / > , document.getElementById('container-body'));

// ReactDom.render( < App cat={5}  / > , 
// 	document.getElementById('app'));

/*props向组件内部传递*/
// var dataSet = [1, 20, 30, 0, 0, 0];
// ReactDom.render( <Charts name = "World" data = { dataSet }/>,  document.getElementById('app1'));

// var dataSet = [2, 20, 30, 0, 0, 0];
// ReactDom.render( <Charts name = "World" data = { dataSet }/>,  document.getElementById('app2'));

// var dataSet = [3, 20, 30, 0, 0, 0];
// ReactDom.render( <Charts name = "World" data = { dataSet }/>,  document.getElementById('app3'));
