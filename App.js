import { Text, View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function App() {
  const gradePoints = {'F': 0,'D': 1.5,'C': 2,'C+': 2.75, 'B': 3, 'B+': 3.5,  'A': 4 };

  const [math, setmath] = useState('D');
  const [ob, setOb] = useState('D');
  const [mobApps, setmobApps] = useState('D');
  const [fimgt, setfimgt] = useState('D');
  const [obad, setObad] = useState('D');
  const [dm, setdm] = useState('D');

  var gpa = 0;
  var credits = 5;
  var totalPossibleCredits = 10;
  var totalGradeScores = 0;

  function clickMe() {
    alert("this is the click me button"); // Web alert
    Alert.alert("this is the click me button"); // Phone alert

    mathgpa = gradePoints[math];
    mathscore = mathgpa + credits;

    totalGradeScores = totalGradeScores + (gradePoints[math]*credits);
    totalGradeScores = totalGradeScores + (gradePoints[ob]*credits);

    gpa = totalGradeScores/10;

    mathgpa = gradePoints[{math}];
    alert('gpa is ='+gpa)
  }
  const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,

  },
  label: {
    flex: 4,
    textAlign: 'right',
    marginRight: 4,


  },
  textInput: {
      flex: 1,
      borderWidth: 1,
      borderRadius: 3,
      padding: 5


    

  }
});
  return (
    <View  >
      <View><Text style={{ flexDirection: "row", fontWeight: "bold", fontSize: 24, textAlign: "center", marginTop: "%10" }}>GPA Calculator</Text></View>
      <View>
        <Text>Maths</Text>
        <TextInput style={styles.textInput}   placeholder="Grade" onChangeText={setmath} />
      </View>
      <View >
        <Text>Organisational Behaviour</Text>
        <TextInput style={styles.textInput}   placeholder="Grade" onChangeText={setOb} />
      </View>
      <View>
        <Text>Mobile Applications</Text>
        <TextInput style={styles.textInput}   placeholder="Grade" onChangeText={setmobApps} />
      </View>
      <View>
      <Text>Financial Management</Text>
        <TextInput style={styles.textInput}   placeholder="Grade" onChangeText={setfimgt} />
      </View>

    <View >
      <Text>Object Orienetated Design</Text>
        <TextInput style={styles.textInput}   placeholder="Grade" onChangeText={setObad} />
      </View>
      <Text>Digital Marketing</Text>
        <TextInput style={styles.textInput}   placeholder="Grade" onChangeText={setdm} />
      <View >
        <Button  title="submit" onPress={clickMe} />
      </View>
    </View>
  );
}



