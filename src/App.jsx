import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import sunIcon from "./assets/icon-sun.svg"
import moonIcon from "./assets/icon-moon.svg"

import initialData from "./data.json"

import Task from "./Task"
import Header from "./Header"

import "./App.css"

export default function App() {

  const [data, setData] = useState()
  const [currentId, setCurrentId] = useState()
  const [type, setType] = useState("all")
  const [itemsLeft, setItemsLeft] = useState(0)
  const [scheme, setScheme] = useState()
  const [schemeIcon, setSchemeIcon] = useState()
 
  const handleSubmit = (e) => {
    e.preventDefault()

    let { task, completed } = Object.fromEntries(new FormData(e.target))

    if (task === "") return

    let newData = [{ id: currentId + 1, text: task, isCompleted:  completed === undefined ? false : true}, ...data]

    setData(newData)
    setCurrentId(currentId + 1)

    localStorage.setItem("TodoData", JSON.stringify(newData))
    localStorage.setItem("CurrentId", currentId + 1)

    e.target.reset()
  }

  const handleClear = () => {
    let newData = data.filter(({isCompleted}) => isCompleted !== true)
    setData(newData)
    localStorage.setItem("TodoData", JSON.stringify(newData))
  }

  const callback = (value) => {
    if (type === "all") return value
    if (type === "active") return value.isCompleted === false
    else return value.isCompleted === true
  }

  const changeScheme = () => {
    if(scheme === "white"){
      setScheme("black")
      setSchemeIcon(moonIcon)
      localStorage.setItem("scheme", "black")
      document.documentElement.setAttribute("scheme", "black")
    }else{
      setScheme("white")
      setSchemeIcon(sunIcon)
      localStorage.setItem("scheme", "white")
      document.documentElement.setAttribute("scheme", "white")
    }
  }

  useEffect(() => {
    if(localStorage.getItem("scheme") === null){
      document.documentElement.setAttribute("scheme", "white")
      localStorage.setItem("scheme", "white")
      setScheme("white")
      setSchemeIcon(sunIcon)
    }else{
      let scheme = localStorage.getItem("scheme")
      document.documentElement.setAttribute("scheme", scheme)
      setScheme(scheme)
      if(scheme === "white") setSchemeIcon(sunIcon)
      else setSchemeIcon(moonIcon)
    }
  }, [])

  useEffect(() => {
    if(localStorage.getItem("TodoData") === null){
      localStorage.setItem("TodoData", JSON.stringify(initialData))
      localStorage.setItem("CurrentId", initialData.length)
      setData(initialData)
      setCurrentId(initialData.length)
    }else{
      setData(JSON.parse(localStorage.getItem("TodoData")))
      setCurrentId(Number(localStorage.getItem("CurrentId")))
    }
  }, [])

  return (
    <>
      <Header handleSubmit={handleSubmit} schemeIcon={schemeIcon} changeScheme={changeScheme}/>
      <main>
        <motion.div className="container"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 2}}
        >
          <ul className="task-container">
            <AnimatePresence>
              {
                data !== undefined && data.length > 0 &&
                data.filter(callback).map((task, i) => <Task {...task} key={task.id} setData={setData} index={i} data={data} setItemsLeft={setItemsLeft} />)
              }
            </AnimatePresence>
          </ul>
          <AnimatePresence>
            {
              data !== undefined && data.length > 0 &&
              <motion.section
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "3rem", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <p> {itemsLeft} items left </p>
                <div className="filters">
                  <p onClick={() => setType("all")} className={type === "all" ? "active" : ""}> All </p>
                  <p onClick={() => setType("active")} className={type === "active" ? "active" : ""}> Active </p>
                  <p onClick={() => setType("completed")} className={type === "completed" ? "active" : ""}> Completed</p>
                </div>
                <p className="clear" onClick={handleClear}> Clear completed </p>
              </motion.section>
            }
          </AnimatePresence>
        </motion.div>
      </main>
    </>
  )
}