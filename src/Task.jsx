import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import deleteIcon from "./assets/icon-cross.svg"

export default function Task({ id, text, isCompleted, setData, index, data, setItemsLeft}) {

    const [completed, setCompleted] = useState(isCompleted)

    const handleComplete = () => {
        let modifiedElement = data[index]
        modifiedElement.isCompleted = !modifiedElement.isCompleted

        let newData = data
        newData[index] = modifiedElement

        setData(newData)
        setCompleted(modifiedElement.isCompleted)

        localStorage.setItem("TodoData", JSON.stringify(newData))
    }   

    useEffect(() => {
        let left = 0
        data.map(({isCompleted}) => isCompleted && left++)
        setItemsLeft(data.length - left) 
    }, [data, completed])

    const handleDelete = () => {
        let newData = data.filter(task => task.id !== id)
        setData(newData)
        localStorage.setItem("TodoData", JSON.stringify(newData))
    }


    return (
        <motion.li
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "64px", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={completed ? "check" : ""}
        >
            <div className="left">
                <div className={completed ? "checkbox completed" : "checkbox"} onClick={handleComplete}/>
                <p> {text} </p>
            </div>
            <div className="delete" onClick={handleDelete}>
                <img src={deleteIcon} alt="Icon cross" />
            </div>
        </motion.li>
    )
}