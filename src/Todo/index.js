import './index.css'
import { observer } from 'mobx-react-lite'
import {useStore} from '../store'
import { useState } from 'react'
import uuid from 'react-uuid'
function Task() {
  const {taskStore}=useStore()
  const [taskValue,setTaskValue]=useState('')
  function addTask(e){
    if(e.keyCode===13){
      taskStore.addTask({
        id:uuid(),
        name:taskValue,
        isDone:false
      })
      setTaskValue('')
    }
  }
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          value={taskValue}
          onChange={(e)=>setTaskValue(e.target.value)}
          onKeyUp={addTask}
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={taskStore.isAll}
          onChange={(e)=>taskStore.allCheck(e.target.checked)}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {/* <li
            className="todo"
          >
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label >learn react</label>
              <button className="destroy"></button>
            </div>
          </li> */}
          {
            taskStore.list.map(item=>(
              <li
                className={item.isDone?"todo completed":"todo"}
                key={item.id}
              >
                <div className="view">
                  <input 
                    className="toggle" 
                    type="checkbox" 
                    checked={item.isDone}
                    onChange={(e)=>taskStore.singleCheck(item.id,e.target.checked)}
                   />
                  <label >{item.name}</label>
                  <button className="destroy" onClick={()=>taskStore.delTask(item.id)}></button>
                </div>
              </li>
            ))
          }
        </ul>
      </section>
      <footer className='footer'>
          <span className='todo-count'>
            任务总数：{taskStore.list.length} 已完成：{taskStore.geFinishedLength}
          </span>
      </footer>
    </section>
  )
}

export default observer(Task)