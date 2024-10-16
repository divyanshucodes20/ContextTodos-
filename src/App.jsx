import React,{ useEffect, useState } from 'react'
import { TodoProvider } from './Context'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
const [todos,setTodos]=useState([])
const addTodo=(todo)=>{//remember always use same name as name given in context else functionality not come 
setTodos((prev)=>[{id:Date.now(),...todo},...prev])//isme prev array leke saari values me apna naaya todo add kar  diya usko spread karke
}
const updatedTodo=(id,todo)=>{
setTodos((prev)=>prev.map((prevtodo)=>(prevtodo.id===id?todo:prevtodo)))
//isme phle hume prev todos liye phir usme se ek ek todo se given id ko uski id se match karwaya agar milgyi to naya todo set kardo uski jagah nahi mili toh prevtodo hi rakhdo wapas see
}
const deleteTodo=(id)=>{
  setTodos((prev)=>prev.filter((todo)=>todo.id!==id));//isme yeh kiya hai ki array me saari value daaldo given id wale todo ke alawa
}
const toggleComplete=(id)=>{
setTodos((prev)=>prev.map((prevtodo)=>prevtodo.id===id?{...prevtodo,completed:!prevtodo.completed}:prevtodo))
}
useEffect(() => {
//values string me set hongi hume json me chaiye to json me convert kardo
const todos=JSON.parse(localStorage.getItem("todos"))
if(todos && todos.length>0){//todos.length islye kyuki json me array bhi ho sakta h
setTodos(todos)
}
}, [])//yeh useeffect ka kam yeh hai ki jab hum log application load karenege tab yeh already created todo aajaye screen pe means load ho jaaye local storage se aake
useEffect(() => {
localStorage.setItem("todos",JSON.stringify(todos))//yeh todos get item me jo diya hai wahi same speeling ka dena h yaha pe
}, [todos])


  return (
    <TodoProvider value={{todos,updatedTodo,addTodo,deleteTodo,toggleComplete}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                      {todos.map((todo)=>(
                        <div key={todo.id} className='w-full'>
                          <TodoItem todo={todo}/>
                        </div>
                      ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
