import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SortableGrid from 'react-native-sortable-grid';
import { actionCreators } from './photoListRedux';
import { memberService } from './MemberService';
import Input from './Input';

export default class Todo extends Component {
  constructor(props) {
    super(props);
  }

  state = {}

  componentWillMount() {
		const { store } = this.props;
		const { photos } = store.getState();
		this.setState({ photos });
		this.unsubscribe = store.subscribe(() => {
			const { photos } = store.getState();
			this.setState({ photos });
		})
  }

  componentWillUnmount() {
		this.unsubscribe();
  }

  async componentDidMount() {
    const { store } = this.props;
    const members = await memberService.fetchMemberPhotos();
    const photos = members.reduce((empty: any, member: any) => ([...empty, ...member.photos]), []).map(photo => photo.url);
		store.dispatch(actionCreators.get(photos));
  }

	onAddTodo = async (text: string) => {
		const { store } = this.props;
    store.dispatch(actionCreators.add(text));
    await memberService.addMemberPhotos(text);
	}

	onRemoveTodo = async (index: any) => {
    const { store } = this.props;
		store.dispatch(actionCreators.remove(index));
    await memberService.deleteMemberPhoto();
	}

  render() {
    const { photos } = this.state;
    return (
      <View style={styles.container}>
        <Input
          placeholder={'Type a todo, then hit enter!'}
          onSubmitEditing={this.onAddTodo}
        />
        <SortableGrid
          blockTransitionDuration={400}
          activeBlockCenteringDuration={200}
          itemsPerRow={3}
          itemHeight={150}
          dragActivationTreshold={200}
          onDragRelease={(itemOrder) =>
            console.log(
              'Drag was released, the blocks are in the following order: ',
              itemOrder
            )
          }
          onDragStart={() => console.log('Some block is being dragged now!')}
          style={styles.grid}
        >
          {photos.map((photo, index) => (
            <View
              key={index}
              style={styles.block}
            >
              <Image
                style={[StyleSheet.absoluteFill, styles.image]}
                resizeMode="cover"
                source={{ uri: photo }}
              />
              <TouchableOpacity onPress={() => this.onRemoveTodo(index)} style={styles.floatingButtonStyle}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </SortableGrid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  block: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 150,
  },
  image: {
    margin: 10,
    borderRadius: 10,
  },
  floatingButtonStyle: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 3,
    textAlign: 'center',
    width: 20,
    height: 20,
    right: 0,
    bottom: 0,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'red',
  }
});
