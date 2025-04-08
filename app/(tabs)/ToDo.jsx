import { Ionicons } from '@expo/vector-icons' 
import React, { useEffect, useState } from 'react'
import { Alert, Button, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import api from "@/api";

export default function ToDo() {
  const [tasks,SetTasks] = useState([]);
  const [InputTask,SetInputTask] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  // fetch tasks
  const fetchTasks = async () => {
    let response = await api.get("tasks")
    let data = await response.data
    let Tasks = data.tasks
    
    SetTasks(Tasks)
  }
  useEffect(() => {
    fetchTasks()
  }, [])

  // add tasks
  const addTasks = async () => {
    let formdata = new FormData()
    formdata.append("task" , InputTask)

    api.post("task/store", formdata);
    
    fetchTasks()
  }

  // delete task
  const deleteTask = async (id) => {
    api.remove(`task/delete/${id}`)

    fetchTasks()
  }

  // Edit task 
  const EditTask = ({ id, visible, onClose , initialValue }) => {
    const [taskName, setTaskName] = useState(initialValue);
  
    const handleEdit = async () => {
      if (!taskName.trim()) {
        Alert.alert('Error', 'Task name cannot be empty');
        return;
      }
  
      let formdata = new FormData();
      formdata.append('task', taskName);
  
      try {
        await api.put(`task/update/${id}`, formdata);
        fetchTasks(); // Refresh task list after update
        onClose(); // Close modal after success
      } catch (error) {
        Alert.alert('Error', 'Failed to update task');
        console.error(error);
      }
    };
  
    return (
      <Modal visible={visible} transparent>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: '#0f0f0f', padding: 20, borderRadius: 10, width: 300 }}>
            <TextInput 
              placeholder="Enter new name"
              value={taskName}
              onChangeText={setTaskName}
              style={{ borderBottomWidth: 1, marginBottom: 10 }}
              className='text-white'
            />
            <Button title="Save" onPress={handleEdit} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </View>
      </Modal>
    );
  };
  

  return (
    <ScrollView>
      <View className='min-h-[100%] overflow-y-scroll bg-[#25292e] items-center '>
          <View className='mt-10 flex-col items-center gap-y-5'>
            <Text className='text-white text-2xl'>Tasks</Text>

            {/* add task */}
            <View className='flex-row items-center justify-center gap-x-3 w-[100vw]'>
              <TextInput onChangeText={(e) => {SetInputTask(e)}} className='bg-transparent border-[#ffd33d] border text-white w-[60%] p-3 rounded-lg ' placeholder="Enter task"/>
              <Pressable onPress={addTasks} className='bg-[#ffd33d] rounded-lg py-3 px-6'><Text>Add</Text></Pressable>
            </View>


            {/* show tasks */}
            <View className='flex-col items-center gap-y-5 w-screen mt-6'>
              {tasks.map((task,index)=> (
                <View key={index} className='border-y-[#ffd33d] w-[80%] px-2  border-y h-16 flex-row items-center justify-between '>
                    <TextInput className='text-white px-3 h-full flex-row w-1/2 ' value={task.task}  />
                  <View className='flex-row items-center  gap-x-2'>
                    <Pressable onPress={() => {setModalVisible(true)}}><Ionicons name='create-outline' color="#ffd33d" size={22}/></Pressable>
                    <Pressable onPress={() => {deleteTask(task.id)}}><Ionicons name='trash-outline' color="#ffd33d" size={22}/></Pressable>
                  </View>
                  <EditTask id={task.id} visible={modalVisible} onClose={() => setModalVisible(false)} initialValue={task.task} />

                </View>
                
              ))}
            </View>


          </View>
      </View>
    </ScrollView>
  )
}





