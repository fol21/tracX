import React from 'react';
import {View,Text,Button,Alert,ListView,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Task from '../../Model/Task';

import {observer} from 'mobx-react';
import {observable,computed} from 'mobx';

let store = observable([]);

class Row extends React.Component {
	constructor(props) {
		super(props);
		this.state = {content:props.content}
		console.log(this.props);
	}

	tempoContato(){
		let c = this.state.content;
		var moment = require('moment');
		console.log(c.desempenho);
		console.log(">>>>",moment(c.desempenho.fim).diff(c.desempenho.inicio,"hour", true).toFixed(1));
		return moment(c.desempenho.fim).diff(c.desempenho.inicio,"hour", true).toFixed(1);
	}

	render() {
		return (
			<View style={{flex: 1, flexDirection: "row", height: 48}}>
				<Text style={{padding: 6, width: 70, fontSize: 30, backgroundColor: "#FFFFFF"}}>{this.state.content.estimativa}</Text>
				<View style={{backgroundColor: "#FAFAFA", flex: 1, padding: 6}}>
					<Text style={{fontWeight: "bold"}}>{this.state.content.titulo}</Text>
					<Text>{this.state.content.tarefaRedmine}</Text>
				</View>
				<View style={{justifyContent: "center", alignItems: "center", backgroundColor:"white"}}>
					{this.state.content.rodando ?
						<TouchableOpacity onPress={() => {
								let c = this.state.content;
								c.rodando = !c.rodando;
								c.desempenho.fim = new Date;
								this.setState(c);
							}}>
							<Icon name="stop-circle" style={{padding: 6}} size={30} color="#000000" backgroundColor="#00000000" />
						</TouchableOpacity>
						:
						<Text style={{padding: 6, width: 70, fontSize: 26, backgroundColor: "#FFFFFF"}}>{this.tempoContato()}</Text>
					}
				</View>
			</View>
		)
	}
};

const Home = class extends React.Component{
	static navigationOptions = ({navigation}) => ({
		title: 'Tarefas',
		headerRight: <Button onPress={() => navigation.navigate('AddTask',store)} title="Novo" />
	});

	ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

	constructor(props){
		super(props);
	}

	@computed get dataSource() {
		return this.ds.cloneWithRows(store.slice())
	}

	render(){
		return (
			<View>
				<ListView
				  dataSource={this.dataSource}
				  renderRow={(item) => <Row content={item} />}
				  enableEmptySections={true}
				/>
			</View>
		);
	}
};

export default observer(Home);
