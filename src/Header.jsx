import { motion } from "framer-motion"

export default function Header({handleSubmit, schemeIcon, changeScheme}) {
    return (
        <motion.header
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: .3, delay: 1 }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 }}
            >
                <h1> Todo </h1>
                <motion.img
                    src={schemeIcon}
                    onClick={changeScheme}
                    alt="Scheme Icon"
                    whileTap={{ scale: .8 }} whileHover={{ scale: 1.5 }}
                />
            </motion.div>
            <motion.form
                onSubmit={handleSubmit}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.7 }}
            >
                <div className="checkbox">
                    <input type="checkbox" name="completed" />
                </div>
                <input type="text" placeholder="Create new todo..." name="task" autoComplete="off" />
            </motion.form>
        </motion.header>
    )
}