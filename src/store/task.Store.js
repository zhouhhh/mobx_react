
import {  makeAutoObservable } from 'mobx'
class TaskStore {
  list = [
    {
      id:1,
      name: '学习react',
      isDone: true
    },
    {
      id:2,
      name: '搞定mobx',
      isDone: false
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }
  get isAll(){
    return this.list.every(item=>item.isDone)
  }
  get geFinishedLength(){
    return this.list.filter(item=>item.isDone).length
  }
  singleCheck(id,check){
    const item=this.list.find(item=>item.id===id)
    item.isDone=check
  }
  allCheck(check){
    this.list.forEach(item=>{
      item.isDone=check
    })
  }
  delTask=(id)=>{
    this.list=this.list.filter(item=>item.id!==id)
  }
  addTask=(task)=>{
    this.list.push(task)
  }
}
export default TaskStore
