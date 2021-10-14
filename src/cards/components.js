import React,{useState} from 'react'

import { Button, Card, CardContent, Typography,TextField } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import Autocomplete from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

export function TaskCard(props){
    const {task,index,deleteTask,editTask} = props

    const [date,setDate] = useState(task.dueDate)
    const [edit,setEdit] = useState(false)

    const handleDelete = (event)=>{
        event.preventDefault()
        deleteTask(index)
    }

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
        setEdit(false)
        editTask(index,task)
    }

    return <Card className="mt-5">
        {!edit?<CardContent>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
                {task.name}
            </Typography>
            <Typography variant="h5" component="div">
                {task.description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} >
                {task.dueDate.toString()}
            </Typography>
            <Typography sx={{ mb: 1.5 }} >
                {task.assigned}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
                {task.status}
            </Typography>
            <Button onClick={handleDelete} variant="outlined" color="secondary">Delete</Button>
            <Button onClick={()=>{setEdit(true)}} variant="outlined" color="primary" className="ml20">Edit</Button>
        </CardContent>:<CardContent>
            <form onSubmit={handleSubmit}>
                <TextField variant="standard" className="w100 mt-5" label="Name" defaultValue={task.name}/>
                <TextField variant="standard" className="w100 mt-5" label="Description" multiline defaultValue={task.description}/>
                <LocalizationProvider dateAdapter={AdapterDateFns} className="w100 mt-5">
                    <DatePicker label="Due date" value={date} onChange={(newValue)=>{
                        setDate(newValue)
                    }} renderInput={(params)=> <TextField {...params} className="w100 mt-5"/>} className="w100 mt-5"/>
                </LocalizationProvider>
                <Autocomplete defaultValue={{label:task.assigned}} 
                    options={[{label:"Luisa la monitora"}]} 
                    isOptionEqualToValue={(option,value)=>option.label===value.label}
                    renderInput={(params)=><TextField {...params} label="User"/>} className="w100 mt-5"/>
                <Autocomplete defaultValue={{label:task.status}} 
                    options={[{label:"Finished"},{label:"Current"}]}
                    isOptionEqualToValue={(option,value)=>option.label===value.label}
                    renderInput={(params)=><TextField {...params} label="Status"/>} className="w100 mt-5"/>
                <Button variant="contained" className="mt-5 w100" type="submit">Edit Task</Button>
            </form>
        </CardContent>
        }
    </Card>

}