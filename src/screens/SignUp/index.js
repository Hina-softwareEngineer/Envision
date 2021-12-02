import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  HStack,
  Toast,
  Radio,
} from 'native-base';
import {authenticationUI} from '../../queries/auth';

export function Signup({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const onSubmit = async () => {
    Keyboard.dismiss();
    if (username && email && password && phone && role) {
      let response = await authenticationUI.onRegisterWithEmailAndPassword(
        username,
        email,
        phone,
        password,
        role,
      );
      if (response !== 'success') {
        Toast.show({
          title: response,
          placement: 'bottom',
          status: 'error',
          style: {minWidth: 'full'},
        });
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.mainView}>
          <Box
            backgroundColor="violet.800"
            minHeight="40"
            paddingX="5"
            paddingY="12">
            <Heading pt="5" style={styles.heading} color="white" mb="2">
              Become our member
            </Heading>
            <Text style={styles.signinText}>Sign up to continue</Text>
          </Box>

          <VStack
            flex={1}
            p={5}
            backgroundColor="white"
            height="full"
            overflow="hidden"
            borderTopLeftRadius="16"
            borderTopRightRadius="16">
            <Text>Register as :</Text>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={role}
              onChange={nextValue => {
                setRole(nextValue);
              }}>
              <Radio value="student" my={1}>
                Student
              </Radio>
              <Radio value="tutor" my={1}>
                Tutor
              </Radio>
            </Radio.Group>
            <Input
              _focus={{
                borderColor: 'violet.800',
              }}
              fontSize="sm"
              mt="8"
              mb="2"
              type="text"
              placeholder="Username"
              value={username}
              onChangeText={val => setUsername(val)}
            />
            <Input
              _focus={{
                borderColor: 'violet.800',
              }}
              fontSize="sm"
              mt="2"
              mb="2"
              type="email"
              placeholder="Email"
              value={email}
              onChangeText={val => setEmail(val)}
            />
            <Input
              _focus={{
                borderColor: 'violet.800',
              }}
              fontSize="sm"
              mt="2"
              mb="2"
              type="text"
              placeholder="Phone"
              value={phone}
              onChangeText={val => setPhone(val)}
            />
            <Input
              _focus={{
                borderColor: 'violet.800',
              }}
              mt="2"
              mb="2"
              fontSize="sm"
              type="password"
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={val => setPassword(val)}
            />

            <Button
              _pressed={{
                opacity: 0.8,
              }}
              bgColor="violet.800"
              fontSize="sm"
              my="6"
              py="3"
              onPress={onSubmit}>
              Register
            </Button>

            <HStack justifyContent="center" alignItems="flex-end" flex="1">
              <Text>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signupText}>Login Now</Text>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    minHeight: '100%',
  },
  mainView: {
    flex: 1,
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#4c1d95',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  signinText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
  },
  signupText: {
    fontWeight: '600',
    color: '#4c1d95',
  },
});
