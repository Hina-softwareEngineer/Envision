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

export function Login({navigation}) {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    Keyboard.dismiss();
    if (email && password && role) {
      let response = await authenticationUI.onLogInWithEmailAndPassword(
        email,
        password,
      );
      console.log('response', response);
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
              Welcome Back!
            </Heading>
            <Text style={styles.signinText}>Sign in to continue</Text>
          </Box>

          <VStack
            flex={1}
            p={5}
            backgroundColor="white"
            height="full"
            overflow="hidden"
            borderTopLeftRadius="16"
            borderTopRightRadius="16">
            <Text>Login as :</Text>
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
              type="email"
              placeholder="Email"
              value={email}
              onChangeText={val => setEmail(val)}
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
              Log In
            </Button>

            <HStack justifyContent="center" alignItems="flex-end" flex="1">
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupText}>Signup Now</Text>
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
