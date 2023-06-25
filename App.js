import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-elements';

// ...

export default function App() {
  let [employeeId, setEmployeeId] = useState("");
  let [employeeName, setEmployeeName] = useState("");

  let notifyMessage = (msg) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };
  
  let getEmployees = () => {
    fetch("https://reqres.in/api/users")
      .then(res => {
        console.log(res.status);
        console.log(res.headers);
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          notifyMessage('Employees fetched successfully');
        },
        (error) => {
          console.log(error);
          notifyMessage('Failed to fetch employees');
        }
      );
  };

  let getEmployee = (id) => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then(res => {
        console.log(res.status);
        console.log(res.headers);
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          notifyMessage(`Employee with ID ${id} fetched successfully`);
        },
        (error) => {
          console.log(error);
          notifyMessage(`Failed to fetch employee with ID ${id}`);
        }
      );
  };
  
  let deleteEmployee = (id) => {
    fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        console.log(res.status);
        console.log(res.headers);
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          notifyMessage(`Employee with ID ${id} deleted successfully`);
        },
        (error) => {
          console.log(error);
          notifyMessage(`Failed to delete employee with ID ${id}`);
        }
      );
  };
  
  let updateEmployee = (id, name) => {
    fetch(`https://reqres.in/api/users/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name})
    })
      .then(res => {
        console.log(res.status);
        console.log(res.headers);
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          notifyMessage(`Employee with ID ${id} updated successfully`);
        },
        (error) => {
          console.log(error);
          notifyMessage(`Failed to update employee with ID ${id}`);
        }
      );
  };
  
  let createEmployee = (name) => {
    fetch(`http://127.0.0.1:5000/employees`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name})
    })
      .then(res => {
        console.log(res.status);
        console.log(res.headers);
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          notifyMessage(`Employee "${name}" created successfully`);
        },
        (error) => {
          console.log(error);
          notifyMessage(`Failed to create employee "${name}"`);
        }
      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>API FETCH</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Employee Id'
          style={styles.input}
          value={employeeId}
          onChangeText={(value) => setEmployeeId(value)}
        /> 
        <TextInput
          placeholder='Employee Name'
          style={styles.input}
          value={employeeName}
          onChangeText={(value) => setEmployeeName(value)}
        />
      </View>

      <ScrollView contentContainerStyle={styles.buttonScrollContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={getEmployees} style={styles.button}>
            <Text style={styles.buttonText}>Get</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => getEmployee(employeeId)} style={styles.button}>
            <Text style={styles.buttonText}>Get By Id</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteEmployee(employeeId)} style={styles.button}>
            <Text style={styles.buttonText}>Delete By Id</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateEmployee(employeeId, employeeName)} style={styles.button}>
            <Text style={styles.buttonText}>Update By Id</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => createEmployee(employeeName)} style={styles.button}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe6cc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 24,
    paddingTop: 50,
    paddingBottom: 40,
  },
  inputContainer: {
    alignSelf: 'stretch',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  buttonScrollContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'col',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  buttonScrollContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ffb366',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
