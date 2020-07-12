import { createStore } from 'redux';
import React, { Component } from 'react';
import { View } from 'react-native';
// Import the reducer and create a store
import { reducer } from './photoListRedux';
const store = createStore(reducer);

import Card from './Card';

export default class App extends Component {

	render() {

		return (
			<View style={{ display:'flex', flex: 1, backgroundColor: '#dddddd', paddingTop: 50 }}>
				<Card store={store} />
			</View>
		);
	}
}