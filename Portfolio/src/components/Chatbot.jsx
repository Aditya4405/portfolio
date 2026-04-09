import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { FiMessageSquare, FiMinus, FiSend } from 'react-icons/fi'
import { chatbotReplies } from '../data/portfolio'

const quickReplies = [
  'Tell me about Aditya',
  'Show projects',
  'Skills',
  'Resume',
  'Contact',
]

const inferReply = (prompt) => {
  const normalized = prompt.toLowerCase()
  if (normalized.includes('project')) return chatbotReplies.projects
  if (normalized.includes('skill')) return chatbotReplies.skills
  if (normalized.includes('resume')) return chatbotReplies.resume
  if (normalized.includes('contact')) return chatbotReplies.contact
  return chatbotReplies.about
}

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Ask about Aditya, projects, skills, resume, or contact details.',
    },
  ])
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, typing])

  const sendMessage = (text) => {
    if (!text.trim()) return
    setMessages((current) => [...current, { role: 'user', text }])
    setInput('')
    setTyping(true)

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: inferReply(text) },
      ])
      setTyping(false)
    }, 700)
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      <AnimatePresence>
        {open ? (
          <Motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="mb-4 flex h-[32rem] w-[min(92vw,24rem)] flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(8,12,24,0.96))] shadow-[0_30px_90px_rgba(34,211,238,0.18)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-white">AI Portfolio Assistant</p>
                <p className="text-xs text-slate-400">Fast answers with quick prompts</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
                aria-label="Minimize chatbot"
              >
                <FiMinus />
              </button>
            </div>

            <div ref={containerRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <Motion.div
                  key={`${message.role}-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 ${
                    message.role === 'assistant'
                      ? 'bg-white/6 text-slate-200'
                      : 'ml-auto bg-[linear-gradient(135deg,#22d3ee,#8b5cf6)] text-slate-950'
                  }`}
                >
                  {message.text}
                </Motion.div>
              ))}
              {typing ? (
                <div className="inline-flex rounded-full bg-white/6 px-4 py-3 text-sm text-slate-300">
                  Typing...
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/10 px-4 py-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickReplies.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => sendMessage(chip)}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
                  >
                    {chip}
                  </button>
                ))}
              </div>
              <form
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2"
                onSubmit={(event) => {
                  event.preventDefault()
                  sendMessage(input)
                }}
              >
                <FiMessageSquare className="text-slate-400" />
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask something..."
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[linear-gradient(135deg,#22d3ee,#a855f7)] p-2 text-slate-950"
                  aria-label="Send message"
                >
                  <FiSend />
                </button>
              </form>
            </div>
          </Motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="group flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/30 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(168,85,247,0.22))] text-cyan-100 shadow-[0_18px_50px_rgba(34,211,238,0.25)] transition duration-300 hover:scale-105"
        aria-label="Toggle AI chatbot"
      >
        <FiMessageSquare className="text-2xl transition group-hover:rotate-6" />
      </button>
    </div>
  )
}

export default Chatbot
