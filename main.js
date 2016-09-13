import React from 'react';
import ReactDom from 'react-dom';
import App3 from './App3';
	


// ReactDom.render( < App cat={5}  / > , 
// 	document.getElementById('app'));

/*props向组件内部传递*/
var dataSet = [1, 20, 30, 0, 0, 0];
ReactDom.render( <App3 name = "World" data = { dataSet }/>,  document.getElementById('app1'));

var dataSet = [2, 20, 30, 0, 0, 0];
ReactDom.render( <App3 name = "World" data = { dataSet }/>,  document.getElementById('app2'));

var dataSet = [3, 20, 30, 0, 0, 0];
ReactDom.render( <App3 name = "World" data = { dataSet }/>,  document.getElementById('app3'));

