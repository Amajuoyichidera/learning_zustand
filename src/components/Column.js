import React from 'react'
import './Column.css'
import Task from './Task'
import { useStore } from '../store';
import { useState } from 'react';
import classNames from 'classnames';


export default function Column({ state }) {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  
  const tasks = useStore(store=>store.tasks.filter((task) => task.state === state))
  const addTask = useStore(store=> store.addTask)
  const setDraggedTask = useStore(store => store.setDraggedTask)
  const draggedTask = useStore(store => store.draggedTask)
  const moveTask = useStore(store => store.moveTask)

  return ( 
    <div className={classNames('column', {drop:drop})} 
    onDragOver={(e)=>{setDrop(true); e.preventDefault()}}
    onDragLeave={(e)=>{setDrop(false); e.preventDefault()}}
    onDrop={(e) => {
      setDrop(false)
      moveTask(draggedTask, state)
      setDraggedTask(null)
    }}>
      <div className='titleWrapper'>
        <p>{state}</p> 
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      
      {tasks.map((task) =>  <Task title={task.title} key={task.title} />)}
      
      {open && <div className='Modal'>
        <div className='modalcontent'>
          <input onChange={e=>setText(e.target.value)} value={text} />
          <button onClick={() => {
            addTask(text, state);
            setText('')
            setOpen(false)
          }}>Submit</button>
        </div>
      </div>}
    </div>
  )
}
