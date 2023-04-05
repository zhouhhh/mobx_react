// 导入模块
import TaskStore from "./task.Store"
import React from "react"
class RootStore {
  // 组合模块
  constructor() {
    this.taskStore = new TaskStore()
    //这里可以实例化多个store模块，如下还有一个list模块
    // this.listStore=new ListStore()
    //使用的时候就可以:
    //注意：结构赋值到store实例就可以了，防止破坏响应式，用哪个store就解构哪个store
    // const {taskStore,listStore}=useStore()
  }
}
// 实例化根store注入context
const StoresContext = React.createContext(new RootStore())
// 导出方法 供组件调用方法使用store根实例
export const useStore = () => React.useContext(StoresContext)
