/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import {socketUrl} from '../../../Ip';
import useKeyboard from '../../hooks/useKeyboard';
import {io} from 'socket.io-client';
import {useAuth} from '../../context/authContext';

const Chat = ({route}) => {
  const teamId = route.params;
  const [socket, setSocket] = useState(null);
  const {user} = useAuth();
  const userId = user._id;
  const senderName = user.name;

  const flatListRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const {isKeyboardOpen} = useKeyboard();
  const userImages = {
    user1: require('../../../images/user1.png'),
    user2: require('../../../images/user2.png'),
    user3: require('../../../images/user3.png'),
  };
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // Connect to the server
    const newSocket = io(socketUrl);
    setSocket(newSocket);

    return () => {
      // Clean up on component unmount
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages
      socket.on('message', data => {
        setMessages(prevMessages => [...prevMessages, data]);
        flatListRef.current.scrollToEnd();
      });

      // Join group based on passed parameter
      if (teamId) {
        socket.emit('joinGroup', teamId);
      }

      socket.on('oldMessages', oldMessages => {
        setMessages(oldMessages);
      });
    }
  }, [socket, teamId]);

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      socket.emit('message', {
        group: teamId,
        sender: userId,
        message: inputText,
        senderName,
      });
      setInputText('');
    }
  };

  // const handleSendMessage = async () => {
  //   if (inputText.trim() === '') return;

  //   const newMessage = {
  //     id: messages.length + 1, // Incrementing the id
  //     text: inputText,
  //     sender: userId, // or 'other' for received messages
  //     timestamp: new Date(),
  //   };
  //   setMessages([...messages, newMessage]);
  //   setInputText('');

  //   try {
  //     const response = await fetch(`${localhostUrl}messages/send`, {
  //       method: 'POST', // Specify the request method
  //       headers: {
  //         'Content-Type': 'application/json', // Specify the content type
  //       },
  //       body: JSON.stringify({
  //         sender: '507f1f77bcf86cd799439011',
  //         recipient: '507f1f77bcf86cd799439011',
  //         content: inputText,
  //         messageType: 'text',
  //         voiceData: '',
  //       }),
  //     });
  //     console.log(response.status);

  //     if (response.status >= 200 && response.status < 300) {
  //       console.log('Message successfully sent!');
  //     } else {
  //       // Internal server error, handle as needed
  //       const errorResponse = await response.text();
  //       alert(`An error occurred: ${errorResponse}`);
  //     }
  //   } catch (error) {
  //     console.log('ERROR: handleSendMessage', error);
  //     alert('Failed to send message!');
  //   }
  // };

  return (
    <SafeAreaView
      style={{
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <StatusBar
        backgroundColor="#0B1E47" // Set the background color to purple
        barStyle="light-content" // Set the text color to white
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View
          style={{
            backgroundColor: '#0B1E47',
            width: responsiveWidth(100),
            height: responsiveHeight(30),
          }}>
          <View
            style={{
              marginLeft: responsiveWidth(5),
              marginTop: responsiveHeight(5),
              // marginLeft:responsiveWidth(21),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                fontWeight: '700',
                fontSize: responsiveFontSize(3.5),
                color: '#FFFFFF',
              }}>
              Chat
            </Text>
          </View>
          <View
            style={{
              marginLeft: responsiveWidth(20),
              marginTop: responsiveHeight(2),
              alignItems: 'center',
              justifyContent: 'center',
              width: responsiveWidth(65),
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontWeight: '400',
                fontSize: responsiveFontSize(2),
                color: '#FFFFFF',
                textAlign: 'center',
              }}>
              Stay connected and informed!
            </Text>
          </View>
        </View>
        <View
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(75),
            borderTopLeftRadius: responsiveWidth(5),
            borderTopRightRadius: responsiveWidth(5),
            marginTop: responsiveHeight(-12),
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              marginTop: responsiveHeight(4),
              flexDirection: 'row',
            }}>
            <View
              style={{
                width: responsiveWidth(11),
                height: responsiveHeight(6),
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: responsiveWidth(28),
              }}>
              <Image
                source={require('../../../images/teamicon.jpg')}
                style={{
                  resizeMode: 'contain',
                  width: responsiveWidth(15),
                  height: responsiveHeight(7),
                  borderRadius: responsiveWidth(7),
                }}
              />
            </View>
            <View
              style={{
                marginTop: responsiveHeight(1.5),
                marginLeft: responsiveWidth(4),
              }}>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontWeight: '700',
                  color: '#000000',
                  fontSize: responsiveFontSize(3),
                }}>
                Team Name
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: responsiveHeight(5),
              height: responsiveHeight(67),
            }}>
            <FlatList
              data={messages}
              ref={flatListRef}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf:
                      item.sender === userId ? 'flex-end' : 'flex-start',
                    marginBottom: 10,
                  }}>
                  {item.sender !== userId && (
                    <View style={{marginLeft: responsiveWidth(3)}}>
                      <Image
                        source={userImages['user1']}
                        style={{
                          width: responsiveWidth(10),
                          height: responsiveHeight(5),
                          marginRight: 5,
                        }}
                      />
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'column',
                      backgroundColor:
                        item.sender === userId ? '#EBF1FF' : '#EBF1FF',
                      padding: 10,
                      borderRadius: responsiveWidth(2),
                      maxWidth: '75%', // Limiting message width for better readability
                      alignSelf: 'flex-start',

                      height:
                        item.message.length > 50
                          ? responsiveHeight(15)
                          : responsiveHeight(8),
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                      }}>
                      {item.senderName}
                    </Text>
                    <Text style={{maxWidth: '100%', color: '#343434'}}>
                      {item.message}
                    </Text>
                  </View>
                  {item.sender === userId && (
                    <View
                      style={{
                        marginRight: responsiveWidth(3),
                      }}>
                      <Image
                        source={require('../../../images/user3.png')}
                        style={{
                          width: responsiveWidth(10),
                          height: responsiveHeight(5),
                          marginLeft: 5,
                        }}
                      />
                    </View>
                  )}
                </View>
              )}
              keyExtractor={item => item.message}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginBottom: isKeyboardOpen ? 350 : 0,
              }}>
              <View
                style={{
                  flex: 1,
                  borderWidth: responsiveWidth(0.1),
                  borderColor: '#00000040',
                  borderRadius: responsiveWidth(5),
                  height: responsiveHeight(6),
                  paddingHorizontal: responsiveWidth(2),
                  paddingVertical: responsiveHeight(1),
                  marginRight: responsiveWidth(1),
                  elevation: 1,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                }}>
                <TextInput
                  style={{
                    height: responsiveHeight(5),
                    backgroundColor: '#fff',
                    marginTop: responsiveHeight(-0.5),
                    borderRadius: responsiveWidth(3),
                    width: responsiveWidth(66),
                  }}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Type your message..."
                  placeholderTextColor="#0B1E47"
                  color={'#0B1E47'}
                />

                <TouchableOpacity
                  onPress={sendMessage}
                  style={{
                    paddingHorizontal: 10,
                    backgroundColor: 'transparent',
                    //width:responsiveWidth(20),
                    // backgroundColor: '#fff',
                    marginTop: responsiveHeight(0.5),
                  }}>
                  <Image
                    source={require('../../../images/attachment.png')}
                    style={{
                      width: responsiveWidth(5),
                      height: responsiveHeight(2.5),
                      backgroundColor: '#fff',
                      marginLeft: responsiveWidth(-2),
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={sendMessage}
                  style={{
                    paddingHorizontal: 10,
                    backgroundColor: 'transparent',
                    width: responsiveWidth(10),
                  }}>
                  <Image
                    source={require('../../../images/send.png')}
                    style={{
                      width: responsiveWidth(5.5),
                      height: responsiveHeight(4),
                      marginLeft: responsiveWidth(-3),
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: responsiveWidth(1),
                    backgroundColor: '#0B1E47',
                    width: responsiveWidth(10),
                    height: responsiveHeight(5),
                    borderRadius: responsiveWidth(5),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={require('../../../images/microphone.png')}
                    style={{
                      width: responsiveWidth(6),
                      height: responsiveHeight(3),
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
