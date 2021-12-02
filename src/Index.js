/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login} from './screens/Login';
import {Signup} from './screens/SignUp';
import {authenticationUI} from './queries/auth';
import {useDispatch, useSelector} from 'react-redux';
import {userDetails, loadedUser} from './redux/auth';
import {Home} from './screens/Home';
import {LoadingScreen} from './components/LoadingScreen';

import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  HStack,
  Toast,
  Spacer,
  FlatList,
} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import {Profile} from './screens/Profile';

// import {authenticationUI} from './queries/auth';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

let authSubscriber;

function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          // if (route.name === 'Home') {
          //   iconName = 'home';
          // } else if (route.name === 'Settings') {
          //   iconName = 'clipboard-list';
          // }

          // You can return any component that you like here!
          return <Text></Text>;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'grey',
        tabBarActiveBackgroundColor: 'grey',
        tabBarLabelStyle: {
          fontSize: 20,
          marginBottom: 10,
        },
      })}>
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: '#4c1d95',
          },
          headerTintColor: '#fff',
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: '#4c1d95',
          },
          headerTintColor: '#fff',
        }}
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        options={{
          headerStyle: {
            backgroundColor: '#4c1d95',
          },
          headerTintColor: '#fff',
        }}
        name="Logout"
        component={Logout}
      />
    </Tab.Navigator>
  );
}

const Logout = () => {
  const dispatch = useDispatch();
  return (
    <Button
      style={{marginTop: 200, width: '50%', marginLeft: 100}}
      onPress={() => {
        authenticationUI.onUserLogout().then(() => dispatch(logoutUser()));
      }}>
      Logout
    </Button>
  );
};

function Root() {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authState);
  console.log(authState);
  // <Box>
  //   {subjects.map(edu => (
  //     <Text>{edu}</Text>
  //   ))}
  // </Box>;
  const authStatusChecker = async user => {
    if (user?.uid) {
      let usersDet = Object.create(user);
      dispatch(userDetails(usersDet));
    } else {
      dispatch(loadedUser());
    }
  };

  useEffect(() => {
    // checking whether user has been authenticated or not?
    async function userStatusChecker() {
      authSubscriber = await authenticationUI.checkUserAuthenticationStatus(
        authStatusChecker,
      );
    }
    userStatusChecker();
    return authSubscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4c1d95',
          },
          headerTintColor: '#fff',
        }}>
        {authState.isAuthenticated && authState.loading === 'resolved' ? (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="Home"
              component={TabLayout}
            />
          </>
        ) : authState.loading === 'pending' || authState.loading === 'idle' ? (
          <Stack.Screen
            options={{headerShown: false}}
            name="LoadingScreen"
            component={LoadingScreen}
          />
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Signup"
              component={Signup}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Root;
