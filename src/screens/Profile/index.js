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
  Checkbox,
} from 'native-base';
import {authenticationUI} from '../../queries/auth';
import {logoutUser} from '../../redux/auth';
import {useDispatch, useSelector} from 'react-redux';
import database from '@react-native-firebase/database';

export function Profile() {
  const dispatch = useDispatch();
  const [educations, setEducations] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [education, setEducation] = useState('');
  const [subject, setSubject] = useState('');
  const authState = useSelector(state => state.authState);
  const [available, setAvailable] = useState(false);

  const onSave = async () => {
    if (authState.user.role === 'student') {
      const newReference = database().ref('/students').push();

      newReference
        .set({
          name: authState.user.username,
          id: newReference.key,
          educations: educations,
          subjects: subjects,
        })
        .then(() => {
          console.log('Data updated.');
          setEducation('');
          setEducations([]);
          setSubjects([]);
          setSubject('');
        });
    } else {
      const newReference = database().ref('/teachers').push();

      newReference
        .set({
          name: authState.user.username,
          id: newReference.key,
          educations: educations,
          subjects: subjects,
          isAvailable: available,
        })
        .then(() => {
          console.log('Data updated.');
          setEducation('');
          setEducations([]);
          setSubjects([]);
          setSubject('');
        });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.mainView}>
          <Box>
            <VStack
              flex={1}
              p={5}
              backgroundColor="white"
              height="full"
              overflow="hidden"
              borderTopLeftRadius="16"
              borderTopRightRadius="16">
              <Heading>Education</Heading>
              <Input
                _focus={{
                  borderColor: 'violet.800',
                }}
                fontSize="sm"
                mt="8"
                mb="2"
                type="text"
                placeholder="Education"
                value={education}
                onChangeText={val => setEducation(val)}
              />
              <Button
                style={styles.button}
                onPress={() => setEducations([...educations, education])}>
                Add
              </Button>

              {educations.map((subj, index) => (
                <Text key={index}> - {subj}</Text>
              ))}

              <Box />
              {authState.user.role !== 'student' ? (
                <Heading>Subjects to Teach</Heading>
              ) : (
                <Heading>Subjects to learn</Heading>
              )}

              <Input
                _focus={{
                  borderColor: 'violet.800',
                }}
                fontSize="sm"
                mt="8"
                mb="2"
                type="text"
                placeholder="Subject"
                value={subject}
                onChangeText={val => setSubject(val)}
              />
              <Button
                style={styles.button}
                onPress={() => setSubjects([...subjects, subject])}>
                Add
              </Button>

              {subjects.map((subj, index) => (
                <Text key={index}> - {subj}</Text>
              ))}

              {authState.user.role !== 'student' && (
                <Box style={styles.box}>
                  <Checkbox
                    isChecked={available}
                    onChange={() => setAvailable(!available)}
                  />
                  <Text style={{marginLeft: 10}}>I am availale to teach.</Text>
                </Box>
              )}

              <Button
                _pressed={{
                  opacity: 0.8,
                }}
                bgColor="violet.800"
                fontSize="sm"
                my="6"
                py="3"
                onPress={onSave}>
                Save
              </Button>
            </VStack>
          </Box>
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
    backgroundColor: '#fff',
  },
  button: {
    width: '30%',
    marginLeft: '70%',
    marginTop: '5%',
    marginBottom: '3%',
  },
  box: {
    flexDirection: 'row',
  },
});
