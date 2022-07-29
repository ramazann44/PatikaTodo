import { View, Text, SafeAreaView, FlatList, useColorScheme, TextInput, Image, ListViewBase, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';


const App = () => {

  const isDarkMode = useColorScheme() === 'dark';
  const [newTodoText, setNewTodoText] = useState('')
  const [todoList, setTodoList] = useState({})
  const [todoLength, setTodoLength] = useState(0)

  function getTodoList() {

    if (todoList.length) {
      const todolist = todoList;
      const todolistUpdate = [];
      setTodoList({})
      for (let i = 0; i < todolist.length; i++) {
        todolistUpdate.push(todolist[i]);
      } setTodoList(todolistUpdate)
    }

  }

  function getTodoCount() {
    const lengthList = [];
    if (todoList.length != "undefined") {
      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].stateOfBeingDone == false) {
          lengthList.push(todoList[i])
        }

      } setTodoLength(lengthList.length);

    }

  }

  function addTodo() {

    const newTodolist = [];

    if (newTodoText.length > 0) {
      setTodoList({})
      for (let i = 0; i < todoList.length; i++) {
        newTodolist.push(todoList[i]);
      }
      newTodolist.push({
        todoText: newTodoText,
        stateOfBeingDone: false
      });
      setTodoList(newTodolist);
      setNewTodoText('');
      getTodoCount();

    } else {
      getTodoCount();
    }
    getTodoCount();

  }

  function renderItem({ item, index }) {

    return (
      <TouchableOpacity onLongPress={() => {
        todoList.splice(index, 1);
        getTodoList();
        getTodoCount();
      }} onPress={() => {
        todoList[index].stateOfBeingDone = !item.stateOfBeingDone
        getTodoList();
        getTodoCount();
      }}
        style={{
          width: '100%',
          backgroundColor: item.stateOfBeingDone ? "#485460" : '#7DA453',
          padding: 10,
          borderRadius: 10,
          marginBottom: 10
        }}>
        <Text style={{
          width: '100%',
          color: item.stateOfBeingDone ? "#aaa" : Colors.white,
          textDecorationLine: item.stateOfBeingDone ? 'line-through' : 'none'
        }}>
          {item.todoText}
        </Text>
      </TouchableOpacity>
    )

  }

  useEffect(() => {

    getTodoList();
    getTodoCount();

  }, [todoList.length != "undefined" && todoList.length])


  return (
    <SafeAreaView style={{
      width: '100%',
      height: '100%',
      backgroundColor: "#2C3A47",
      padding: '2%',
      alignItems: 'center'
    }}>

      <View style={{
        width: '100%',
        marginBottom: 10,
        flexDirection: 'row',
      }}>

        <Text style={{
          color: "#DB9005",
          fontSize: 30,
          width: '50%'
        }}>
          Yapılacaklar
        </Text>

        <Text style={{
          color: "#DB9005",
          fontSize: 30,
          textAlign: 'right',
          width: '50%'
        }}>
          {todoLength}
        </Text>
      </View>

      <View style={{
        width: '100%',
        height: '76%'
      }}>
        <FlatList style={{
          width: '100%',
        }}
          data={todoList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>

      <View style={{
        position: 'absolute',
        backgroundColor: "#485460",
        width: '100%',
        borderRadius: 10,
        padding: '5%',
        bottom: 0,
        justifyContent: 'center'
      }}>

        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            marginBottom: 10
          }}
          placeholder="Yapılacak..."
          onChangeText={value => setNewTodoText(value)}
          value={newTodoText}
        />

        <TouchableOpacity
          onPress={() => {
            addTodo();
            getTodoCount();
          }}
          style={{
            backgroundColor: newTodoText.length ==0 ?
            'gray'
            :"#DB9005"
            ,
            justifyContent: 'center',
            alignItems: 'center',
            padding: '3%',
            borderRadius: 10
          }}>
          <Text style={{color:'white'}}>Kaydet</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  )
}

export default App
