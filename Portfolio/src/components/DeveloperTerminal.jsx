import { useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { commandResponses } from '../data/portfolio'

function DeveloperTerminal() {
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState([
    { input: 'help', output: commandResponses.help },
  ])

  const runCommand = (value) => {
    const normalized = value.trim().toLowerCase()
    if (!normalized) return
    const output = commandResponses[normalized] ?? 'Unknown command. Try: help'
    setHistory((current) => [...current, { input: normalized, output }])
    setCommand('')
  }

  return (
    <Motion.div
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(6,10,20,0.96),rgba(15,23,42,0.92))] shadow-[0_25px_70px_rgba(15,23,42,0.55)]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <p className="ml-3 text-sm text-slate-400">interactive-terminal.sh</p>
      </div>
      <div className="space-y-4 p-5 font-mono text-sm text-slate-200">
        {history.map((entry, index) => (
          <div key={`${entry.input}-${index}`}>
            <p className="text-cyan-300">$ {entry.input}</p>
            <p className="mt-1 text-slate-400">{entry.output}</p>
          </div>
        ))}
        <form
          onSubmit={(event) => {
            event.preventDefault()
            runCommand(command)
          }}
          className="flex items-center gap-2"
        >
          <span className="text-cyan-300">$</span>
          <input
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            className="flex-1 bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
            placeholder="Type help"
          />
        </form>
      </div>
    </Motion.div>
  )
}

export default DeveloperTerminal
