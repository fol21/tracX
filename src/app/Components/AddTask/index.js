import React from 'react';
import {View,Button,Alert} from 'react-native';

import TextField from 'react-native-md-textinput';

import {observer} from 'mobx-react';

import Task from '../../Model/Task';


const AddTask = class extends React.Component{
	static navigationOptions = ({navigation}) => ({
		title: 'Nova Tarefa',
		headerLeft: null
	});
	constructor(props){
		super(props);

		this.state = {}
	}
	_onClick(){
		let store = this.props.navigation.state.params;

		if (this.state.name && this.state.tarefaRedmine && this.state.estimativa) {
			store.push(new Task(this.state.name, this.state.tarefaRedmine, this.state.estimativa));
			this.props.navigation.goBack();
		} else {
			Alert.alert("Eae rapazeaaaaada!", "Preencha os valores corretamente!");
		}
	}
	render(){
		return (
			<View style={{flex: 1, paddingLeft: 20, paddingRight: 20}}>
				<TextField onChangeText={(text) => {this.setState({name:text})}} value={this.state.name} label={'Nome da Tarefa'} highlightColor={'#00BCD4'} />
				<TextField keyboardType={'numeric'} onChangeText={(text) => {this.setState({tarefaRedmine:text})}} value={this.state.tarefaRedmine} label={'# Tarefa Redmine'} highlightColor={'#00BCD4'} />
				<TextField keyboardType={'numeric'} onChangeText={(text) => {this.setState({estimativa:text})}} value={this.state.estimativa} label={'Estimativa'} highlightColor={'#00BCD4'} />
				<View style={{justifyContent:'center',flexDirection:'row', marginTop:20}}>
					<View style={{marginRight:20}}><Button onPress={()=>this.props.navigation.goBack()} title="Cancelar" /></View>
					<View><Button onPress={this._onClick.bind(this)} title="Começar" /></View>
				</View>
			</View>
		);
	}
}

export default observer(AddTask);
