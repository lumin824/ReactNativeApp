import React, { Component } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import action from '../action';

class V extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...this.props.loginForm
    };
  }

  onPressLogin(){
    this.props.action.deviceRealtimeData('000ec602fad0');
    let { username, password } = this.state;
    this.props.action.login({username, password})
      .then(action=>{
        if(!action.error)
          this.props.action.deviceList();
      });
  }
  render() {
    return (
      <View style={{marginTop:100}}>
        <View style={{
            height:40,
            marginHorizontal:10, marginVertical:5,
            borderWidth:1,
            borderRadius:3
          }}>
          <TextInput style={{
              flex:1,
              marginHorizontal:5,
            }} onChangeText={(username)=>this.setState({username})} value={this.state.username} />
        </View>

        <View style={{
            height:40,
            marginHorizontal:10, marginVertical:5,
            borderWidth:1,
            borderRadius:3
          }}>
          <TextInput style={{
              flex:1,
              marginHorizontal:5,
            }} onChangeText={(password)=>this.setState({password})} value={this.state.password} />
        </View>

        {this.props.loginStatus.msg ?
        <View style={{
            height:20,
            marginHorizontal:10, marginVertical:5,
            borderRadius:3,
            backgroundColor:this.props.loginStatus.isError?'#f00':'#0f0',
            justifyContent:'center'}}>
          <Text style={{ marginLeft:5, backgroundColor:'transparent', color:'#fff'}}>{this.props.loginStatus.msg}</Text>
        </View>
        :null}

        <TouchableOpacity style={{
            height:40,
            marginHorizontal:10, marginVertical:5,
            borderRadius:3,
            backgroundColor:'#00f',
            alignItems:'center', justifyContent:'center'
          }} onPress={this.onPressLogin.bind(this)} >
          <Text style={{ color:'#fff'}}>登陆</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(state=>state,dispatch=>({
  action: bindActionCreators({
    login: action.login,
    deviceList: action.deviceList,
    versionGet: action.versionGet,
    deviceRealtimeData: action.deviceRealtimeData
  }, dispatch)
}))(V);