import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Button,
  FlatList,
  SafeAreaView,
  Modal,
  Dimensions,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import {FloatingAction} from 'react-native-floating-action';
import {getTodos, addTodo} from '../../redux/actions';
import {connect} from 'react-redux';
import {store} from '../../redux/store';
import {showLoading} from '../../common';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      content: '',
    };
  }
  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  showToast = (msg) => {
    ToastAndroid.show(`${msg}`, ToastAndroid.SHORT);
  };

  moveToLogin = () => {
    this.props.navigation.navigate('Login');
  };

  changeTextConent = (text) => {
    this.setState({content: text});
  };

  addItem = async () => {
    const data = {content: this.state.content};
    this.setModalVisible(!this.state.modalVisible);
    await this.props.addTodo(data);

    if (this.props.status === 200) {
      await this.props.getTodos();
    }
    this.showToast(this.props.msg_add);
  };

  async componentDidMount() {
    await this.props.getTodos();
  }

  renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.content}</Text>
      <Button title="delete" style={styles.buttonDel}></Button>
    </View>
  );
  keyExtractor = (item) => {
    return item._id;
  };
  render() {
    return (
      <View>
        <SafeAreaView>
          <FlatList
            style={styles.flatlist}
            data={this.props.todos}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}></FlatList>
          <FloatingAction
            onPressMain={() => {
              this.setModalVisible(true);
            }}
            showBackground={false}></FloatingAction>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Add Todo</Text>
                  <TextInput
                    onChangeText={this.changeTextConent}
                    style={styles.inputContent}></TextInput>
                  <View style={styles.containerButton}>
                    <TouchableHighlight
                      style={styles.openButton}
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                      <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      style={styles.openButton}
                      onPress={this.addItem}>
                      <Text style={styles.textStyle}>Add</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </SafeAreaView>
        {showLoading(this.props.loading)}
      </View>
    );
  }
}

const mapDispatchToProps = {
  getTodos,
  addTodo,
};

const mapStateToProps = (state) => {
  console.log(state.addTodo.data.status);
  return {
    todos: state.getTodos.todos,
    msg: state.getTodos.msg,
    status: state.addTodo.data.status,
    msg_add: state.addTodo.data.msg,
    loading: state.addTodo.loading,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Todo);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003f5c',
    flex: 1,
  },
  item: {
    height: (windowHeight - 10) / 8,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#DF2455',
    shadowOpacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonDel: {
    width: 70,
    height: 200,
    backgroundColor: '#2196F3',
    borderRadius: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 250,
    width: 250,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  openButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  inputContent: {
    borderColor: 'black',
    borderWidth: 2,
    width: 200,
    height: 50,
    padding: 5,
    marginBottom: 10,
    fontSize: 20,
  },
  containerButton: {
    display: 'flex',
    flexDirection: 'row',
    bottom: 0,
  },
  flatlist: {
    height: windowHeight - 35,
  },
});
