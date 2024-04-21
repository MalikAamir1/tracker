import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  iconSource,
  password,
  keyboardType,
  maxLength,
  toggleIconSource,
}) => {
  const [hidePassword, setHidePassword] = useState(true); // Initially hide password
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={myStyles.container}>
      <View style={myStyles.input}>
        {iconSource && (
          <View style={myStyles.iconContainer}>
            <Image source={iconSource} style={myStyles.icon} />
          </View>
        )}
        <View style={myStyles.textInputContainer}>
          {/* {!isFocused && !value && (
                        <Text style={[myStyles.placeholder,{marginTop:isFocused?responsiveHeight(1):responsiveHeight(-2)}]}>{placeholder}</Text>
                    )} */}
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            secureTextEntry={password ? hidePassword : secureTextEntry}
            keyboardType={keyboardType}
            maxLength={maxLength}
            color={'#fff'}
            placeholderTextColor={'#CACACA'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={[
              myStyles.textInput,
              {
                backgroundColor: 'transparent',
                // marginTop:isFocused ? responsiveHeight(-.4):responsiveHeight(-2)
              },
            ]}
          />
        </View>
        {password && toggleIconSource && (
          <TouchableOpacity
            style={myStyles.toggleIconContainer}
            onPress={() => setHidePassword(!hidePassword)}>
            <Image source={toggleIconSource} style={myStyles.icon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const myStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: 5,
    height: responsiveHeight(7),
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B1E47',
    elevation: 3,
    borderRadius: responsiveWidth(4),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#fff',
    width: responsiveWidth(90),
    height: responsiveHeight(7),
  },
  iconContainer: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
    backgroundColor: '#0B1E47',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainer: {
    flex: 1,
    marginLeft: responsiveWidth(3),
    //backgroundColor:'#4e3'
  },
  toggleIconContainer: {
    alignItems: 'flex-end',
    marginRight: responsiveWidth(2),
  },
  icon: {
    width: responsiveWidth(6),
    height: responsiveHeight(3.5),
    resizeMode: 'contain',
  },
  placeholder: {
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    fontSize: responsiveFontSize(1.9),
    color: '#CACACA',
    marginTop: responsiveHeight(5),
    //backgroundColor:'#e34',
    height: responsiveHeight(2.7),
    width: responsiveWidth(21),
  },
  textInput: {
    color: '#fff',
  },
  Inputcontainer: {
    marginBottom: responsiveHeight(2),
  },
  TextinputContainer: {
    position: 'relative',
    borderRadius: responsiveWidth(2),
    borderBottomColor: '#CCCCCC',
    backgroundColor: '#F1F6FF',
    width: responsiveWidth(90),
  },
  TextinputContainerFocused: {
    borderBottomColor: '#0B1E47',
  },
  Textplaceholder: {
    position: 'absolute',
    left: responsiveWidth(2),
    top: responsiveHeight(1.5),
    color: '#000000',
    fontSize: responsiveFontSize(1.6),
    zIndex: -1,
  },
  TextplaceholderActive: {
    top: responsiveHeight(-1),
    fontSize: responsiveFontSize(1.4),
    zIndex: 1,
    color: 'grey',
  },
  TexttextInput: {
    paddingLeft: responsiveWidth(3),
    paddingTop: responsiveHeight(1.5),
    paddingBottom: responsiveHeight(1),
    color: '#0B1E47',
    fontSize: responsiveFontSize(1.8),
  },
  Inputcontainer: {
    marginBottom: responsiveHeight(2),
  },
  TextinputContainer: {
    position: 'relative',
    borderRadius: responsiveWidth(2),
    borderBottomColor: '#CCCCCC',
    backgroundColor: '#F1F6FF',
    width: responsiveWidth(90),
  },
  TextinputContainerFocused: {
    borderBottomColor: '#0B1E47',
  },
  Textplaceholder: {
    position: 'absolute',
    left: responsiveWidth(2),
    top: responsiveHeight(1.5),
    color: '#000000',
    fontSize: responsiveFontSize(1.6),
    zIndex: -1,
  },
  TextplaceholderActive: {
    top: responsiveHeight(-1),
    fontSize: responsiveFontSize(1.4),
    zIndex: 1,
    color: 'grey',
  },
  TexttextInput: {
    paddingLeft: responsiveWidth(3),
    paddingTop: responsiveHeight(1.5),
    paddingBottom: responsiveHeight(1),
    color: '#0B1E47',
    fontSize: responsiveFontSize(1.8),
  },
  PopInputcontainer: {
    marginBottom: responsiveHeight(2),
  },
  PopTextinputContainer: {
    position: 'relative',
    borderRadius: responsiveWidth(2),
    borderBottomColor: '#CCCCCC',
    backgroundColor: '#F1F6FF',
    width: responsiveWidth(73),
  },
  PopTextinputContainerFocused: {
    borderBottomColor: '#0B1E47',
  },
  PopTextplaceholder: {
    position: 'absolute',
    left: responsiveWidth(2),
    top: responsiveHeight(1.5),
    color: '#000000',
    fontSize: responsiveFontSize(1.6),
    zIndex: -1,
  },
  PopTextplaceholderActive: {
    top: responsiveHeight(-1),
    fontSize: responsiveFontSize(1.4),
    zIndex: 1,
    color: 'grey',
  },
  PopTexttextInput: {
    paddingLeft: responsiveWidth(3),
    paddingTop: responsiveHeight(1.5),
    paddingBottom: responsiveHeight(1),
    color: '#0B1E47',
    fontSize: responsiveFontSize(1.8),
  },
});
export default CustomInput;
export const Input = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  keyboardType,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={{marginBottom: 20}}>
      <View
        style={[
          myStyles.TextinputContainer,
          isFocused && myStyles.TextinputContainerFocused,
        ]}>
        <Text
          style={[
            myStyles.Textplaceholder,
            (isFocused || value) && myStyles.TextplaceholderActive,
          ]}>
          {placeholder}
        </Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder=""
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline
          style={[
            myStyles.TexttextInput,
            {
              height:
                placeholder == 'Enter description'
                  ? responsiveHeight(15)
                  : responsiveHeight(8),
            },
          ]}
        />
      </View>
    </View>
  );
};

export const PopInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  keyboardType,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={{marginBottom: 20}}>
      <View
        style={[
          myStyles.PopTextinputContainer,
          isFocused && myStyles.PopTextinputContainerFocused,
        ]}>
        <Text
          style={[
            myStyles.PopTextplaceholder,
            (isFocused || value) && myStyles.PopTextplaceholderActive,
          ]}>
          {placeholder}
        </Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder=""
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={myStyles.PopTexttextInput}
        />
      </View>
    </View>
  );
};

export const SearchInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  iconSource,
  password,
  keyboardType,
  maxLength,
  toggleIconSource,
}) => {
  const [hidePassword, setHidePassword] = useState(password);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={myStyles.container}>
      <View
        style={[
          myStyles.input,
          {
            backgroundColor: '#fff',
            borderRadius: responsiveWidth(6),
            height: responsiveHeight(6),
            marginTop: responsiveHeight(2),
            marginLeft: responsiveWidth(3),
            elevation: 1,
          },
        ]}>
        <View
          style={{
            height: responsiveHeight(8),
            marginRight: 2,
            backgroundColor: 'transparent',
            width: iconSource ? responsiveWidth(70) : responsiveWidth(80),
            marginTop: responsiveHeight(0.2),
            flexDirection: 'row', // Ensure items are aligned horizontally
            alignItems: 'center', // Align items vertically in the center
          }}>
          {/* View for the Text */}
          <View
            style={{
              marginLeft: iconSource
                ? responsiveWidth(0.5)
                : responsiveWidth(7),
              marginTop: iconSource ? responsiveWidth(-2) : responsiveWidth(-2),
            }}>
            {/* Only show the placeholder text when not focused and value is empty */}
            {!isFocused && !value && (
              <Text
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontWeight: '400',
                  fontSize: responsiveFontSize(1.7), // Adjust font size as needed
                  marginLeft: responsiveWidth(7),
                  marginTop: responsiveHeight(1),
                  //height: responsiveHeight(3),
                  justifyContent: 'center',
                  width: responsiveWidth(50),
                  backgroundColor: '#FfF',
                  color: '#000000',
                }}>
                {placeholder}
              </Text>
            )}
          </View>

          {/* View for the TextInput */}
          <View
            style={{
              width: responsiveWidth(80),
              backgroundColor: 'transparent',
              marginLeft: isFocused
                ? responsiveWidth(10)
                : responsiveWidth(-50),
            }}>
            <TextInput
              value={value}
              onChangeText={setValue}
              placeholder=""
              secureTextEntry={hidePassword}
              keyboardType={keyboardType}
              maxLength={maxLength}
              color={'black'}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </View>
        </View>

        {iconSource ? (
          <View
            style={{
              width: responsiveWidth(12),
              height: responsiveHeight(6),
              backgroundColor: '#fff',
              marginLeft: responsiveWidth(3),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={iconSource}
              style={{
                width: responsiveWidth(15),
                height: responsiveHeight(3.5),
                marginRight: responsiveWidth(7),
                resizeMode: 'contain',
              }}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};
