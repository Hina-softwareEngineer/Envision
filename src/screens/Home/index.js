import React, {useEffect, useState} from 'react';
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
  Spacer,
  FlatList,
  Container,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {authenticationUI} from '../../queries/auth';
import {logoutUser} from '../../redux/auth';
import database from '@react-native-firebase/database';

export function Home({navigation}) {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.authState);
  const [dataFromDB, setDATaFromDB] = useState([]);

  useEffect(() => {
    async function getData() {
      if (authState.user.role !== 'student') {
        await database()
          .ref('/students')
          .once('value')
          .then(async snapshot => {
            let objectValues = await Object.values(snapshot.val());
            console.log('User data: ', objectValues);
            await setDATaFromDB(objectValues);
          });
      } else {
        await database()
          .ref('/teachers')
          .once('value')
          .then(async snapshot => {
            let objectValues = await Object.values(snapshot.val());
            console.log('User data: ', objectValues);
            await setDATaFromDB(objectValues);
          });
      }
    }
    getData();
  }, [navigation]);

  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        {authState.user.role !== 'student' ? (
          <Heading p="3">About Students </Heading>
        ) : (
          <Heading p="3">About Teachers</Heading>
        )}

        <Box
          maxW="400"
          margin="30"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="3"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}>
          <Box>
            <FlatList
              data={dataFromDB}
              renderItem={({item, id}) => (
                <StudentListItem key={id} item={item} />
              )}
              keyExtractor={item => item.id}
            />
          </Box>
        </Box>
      </View>
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
    backgroundColor: '#fff',
  },
});

const StudentListItem = ({item}) => {
  console.log('kist ite', item);
  return (
    <Box pl="4" pr="5" py="2">
      <VStack space={3} justifyContent="space-between">
        <VStack>
          <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
            {item.name}
          </Text>
          <Heading style={{textDecorationLine: 'underline'}}>
            Education:
          </Heading>
          <Box>
            {item.educations.map(edu => (
              <Text style={{color: 'blue', fontWeight: 'bold'}}> {edu}</Text>
            ))}
          </Box>
        </VStack>
        <Spacer />
        <Heading style={{textDecorationLine: 'underline'}}>
          Subjects Looking For:
        </Heading>
        <Box>
          {item.subjects.map(edu => (
            <Text style={{color: 'blue', fontWeight: 'bold'}}>{edu}</Text>
          ))}
        </Box>
      </VStack>
    </Box>
  );
};
