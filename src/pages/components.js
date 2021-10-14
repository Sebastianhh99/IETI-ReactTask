import { Button, TextField } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from "react";
import { TaskCard } from "../cards";
import { ApiLookup } from "../lookup";

export function Login(props){

    const callback=(response,status)=>{
        if(status===200){
            localStorage.setItem("token",response.token)
            window.location.pathname="tasks"
        }else{
            alert(response.detail)
        }
    }

    const handleSubmit = (event)=>{
        event.preventDefault()
        console.log("submit")
        const elements = event.target.elements
        ApiLookup.login(callback,elements[0],elements[1])
    }

    return <div className="container">
        <div className="row justify-content-center mt200">
            <section className="col-12 col-md-6">
                <h1 className="textCenter">Login</h1>
            </section>
        </div>
        <form className="row justify-content-center" onSubmit={handleSubmit}>
            <div className="col-12 col-md-6">
                <TextField label="UserName" variant="standard" className="w100 mt-5"/>
                <TextField label="Password" variant="standard" type="password" className="w100 mt-5"/>
                <Button variant="contained" className="mt-5 w100" type="submit">Login</Button>
            </div>
        </form>
    </div>
}

export function TasksPage(props){
    const [tasks,setTasks] = useState([])
    const [adding,setAdding] = useState(false)

    const deleteTask =(index)=>{
        var newArr = [...tasks]
        newArr.splice(index,1)
        setTasks(newArr)
    }

    const editTask =(index,task)=>{
        var newArr = [...tasks]
        newArr[index]=task
        setTasks(newArr)
    }

    return !adding ? <Tasks tasks={tasks} setAdding={setAdding} deleteTask={deleteTask} editTask={editTask} />:
    <AddTask tasks={tasks} setTasks={setTasks} setAdding={setAdding}/>
}

function Tasks(props){
    const {tasks,setAdding,deleteTask,editTask} = props

    const handleClickAdd = (event)=>{
        event.preventDefault()
        setAdding(true)
    }

    return <div className="container">
        <div className="row justify-content-center mt100">
            <section className="col-12 col-md-6">
                <h1 className="textCenter">Tasks</h1>
            </section>
        </div>
        {tasks.map((item,index)=>{
            return <TaskCard task={item} key={index} index={index} deleteTask={deleteTask} editTask={editTask}/>
        })}
        <button onClick={handleClickAdd} className="btn btn-primary addButton">Add Task</button>
    </div>
}

function AddTask(props){

    const {tasks,setTasks,setAdding} = props
    const [date,setDate] = useState(null)

    const handleSubmit = (event)=>{
        event.preventDefault()
        const elements = event.target.elements
        const task = {
            name:elements[0].value,
            description:elements[1].value,
            dueDate:date,
            assigned:elements[5].value,
            status:elements[8].value,
        }
        var newArr = [...tasks]
        newArr.push(task)
        setTasks(newArr)
        setAdding(false)
    }

    return <div className="container">
        <div className="row justify-content-center mt200">
            <section className="col-12 col-md-6">
                <h1 className="textCenter">Add Task</h1>
            </section>
        </div>
        <form onSubmit={handleSubmit}>
            <TextField variant="standard" className="w100 mt-5" label="Name"/>
            <TextField variant="standard" className="w100 mt-5" label="Description" multiline/>
            <LocalizationProvider dateAdapter={AdapterDateFns} className="w100 mt-5">
                <DatePicker label="Due date" value={date} onChange={(newValue)=>{
                    setDate(newValue)
                }} renderInput={(params)=> <TextField {...params} className="w100 mt-5"/>} className="w100 mt-5"/>
            </LocalizationProvider>
            <Autocomplete options={[{label:'Luisa la monitora'}]} renderInput={(params)=><TextField {...params} label="User"/>} className="w100 mt-5"/>
            <Autocomplete options={[{label:'Finished'},{label:"Current"}]} renderInput={(params)=><TextField {...params} label="Status"/>} className="w100 mt-5"/>
            <Button variant="contained" className="mt-5 w100" type="submit">Add Task</Button>
        </form>
    </div>
}