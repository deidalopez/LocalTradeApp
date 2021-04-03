import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createPost } from './redux/actions/index'
import { bindActionCreators } from 'redux';
import APIservice from '../services/APIService';
import { onUserLogin } from './redux/actions/index';

function Main({ navigation }) {

  const [post, setPost] = useState({
    desc: '',
    img: '',
    _id: ''
  })
  const dispatch = useDispatch();
  const submitPost = (post) => dispatch(createPost(post));

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {/* <Text>{this.state.email}</Text> */}
      {/* <Text>  is logged in. This is the feed</Text> */}
      <TextInput
        value={post}
        placeholder="Enterpost"
        onChangeText={(post) => setPost(post)}
      />
      <TouchableOpacity
        style={{ marginBottom: 16 }}
        onPress={() => {
          submitPost(post)
          setPost('')
        }}>
        <Text style={{ fontSize: 22, color: '#5fc9f8' }}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginBottom: 16 }}
        onPress={() =>
          navigation.navigate('Feed')}>
        <Text style={{ fontSize: 22, color: 'white' }}>Go to Post Feed</Text>
      </TouchableOpacity>
    </View>
  )
}


const mapStateToProps = (state) => {
  return {
    posts: state.userReducer.postList
  }
}

// const mapDispatchProps = (dispatch) => {
// return {
//   delete: (user) => dispatch(deleteFood(user))
// }
// }




export default connect(mapStateToProps)(Main);




// export class Dashboard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userInput: { email: this.props.email, password: this.props.password },
//       email: this.props.email,
//       password: this.props.password,
//       posts: []
//     }
//   }
//   componentDidMount() {
//     console.log(this.props.user)
//     // this.props.onUserLogin(this.state.userInput);
//   }



  // onRender = async () => {

  //   const {_id} = user;
  //   const res = await APIservice.fetchUser(_id);
  //   console.log(res.name)
  // }



//   render() {
//     // const { currentUser } = this.props;
//     // console.log(currentUser)
//     return (

//     )
//   }
// }

// const mapStateToProps = (store) => ({
//   currentUser: store
// })

// const mapDispatchProps = (dispatch) => bindActionCreators({onUserLogin}, dispatch)

// export default connect(null, mapDispatchProps)(Dashboard)
// // export default connect(mapStateToProps, mapDispatchProps)(Dashboard)