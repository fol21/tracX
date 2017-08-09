import React from 'react';
import {StackNavigator} from 'react-navigation';

export default StackNavigator({
  Home: {
    screen: require('./Components/Home').default,
  },
  AddTask: {
    screen: require('./Components/AddTask').default,
  }
},{
	mode: 'modal'
});
