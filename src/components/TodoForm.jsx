import React, { useState } from "react";
import { useTodo } from "../Context";
function TodoForm() {
const [todo, setTodo] = useState("")//particular todo ke liye    
const {addTodo}=useTodo()//context se laaye hai isko
const add=(e)=>{
    e.preventDefault()
    if(!todo){
        return
    }
    addTodo({todo:todo,completed:false})//yaha pe id isiliye nahi li kyuki app.jsx me set karre h woh aur yaha baaki dono value isliye di kyuki wha hum isko spread karre hai aur yaha akela todo bhi likh sakte hai todo:todo ki jgh same name ki wajah se
    setTodo("")//add karne ke baad input feild ko khali kardo
}
    return (
        <form onSubmit={add} className="flex">
            <input value={todo}//iss value dene ko wiring bolte hai
              onChange={(e)=>setTodo(e.target.value)}
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

