import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Bot, MessageCircleMore, SendHorizonal, Sparkles, X } from 'lucide-react'
import { chatbotReplies as fallbackReplies } from '../data/portfolio'

const quickReplies = [
  'Tell me about Aditya',
  'Show projects',
  'Skills',
  'Resume',
  'Contact',
]

function inferReply(prompt, replies) {
  const normalized = prompt.toLowerCase()
  if (normalized.includes('project')) return replies.projects
  if (normalized.includes('skill')) return replies.skills
  if (normalized.includes('resume')) return replies.resume
  if (normalized.includes('contact')) return replies.contact
  return replies.about
}

function Chatbot({ replies = fallbackReplies }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Ask about Aditya, projects, skills, resume, or how to get in touch.' },
  ])
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, typing])

  const sendMessage = (text) => {
    if (!text.trim()) return
    setMessages((current) => [...current, { role: 'user', text }])
    setInput('')
    setTyping(true)

    window.setTimeout(() => {
      setMessages((current) => [...current, { role: 'assistant', text: inferReply(text, replies) }])
      setTyping(false)
    }, 650)
  }

  return (
    <div className="fixed bottom-5 right-5 z-[85]">
      <AnimatePresence>
        {open ? (
          <Motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="chatbot-shell"
          >
            <div className="chatbot-header">
              <div className="flex items-center gap-3">
                <span className="chatbot-orb">
                  <Bot size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">AI Portfolio Assistant</p>
                  <p className="text-xs text-slate-500">Instant answers with premium UI</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="chatbot-close">
                <X size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="chatbot-messages">
              {messages.map((message, index) => (
                <Motion.div
                  key={`${message.role}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={message.role === 'assistant' ? 'chat-bubble chat-bubble--assistant' : 'chat-bubble chat-bubble--user'}
                >
                  {message.text}
                </Motion.div>
              ))}
              {typing ? (
                <div className="chat-bubble chat-bubble--assistant">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              ) : null}
            </div>

            <div className="p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button key={reply} type="button" onClick={() => sendMessage(reply)} className="suggestion-chip">
                    <Sparkles size={14} />
                    {reply}
                  </button>
                ))}
              </div>
              <form
                className="chatbot-input-wrap"
                onSubmit={(event) => {
                  event.preventDefault()
                  sendMessage(input)
                }}
              >
                <MessageCircleMore size={16} className="text-slate-500" />
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  placeholder="Ask something smart..."
                />
                <button type="submit" className="chatbot-send">
                  <SendHorizonal size={16} />
                </button>
              </form>
            </div>
          </Motion.div>
        ) : null}
      </AnimatePresence>

      <button type="button" onClick={() => setOpen((current) => !current)} className="chatbot-trigger">
        <span className="chatbot-trigger__halo" />
        <Bot size={24} />
      </button>
    </div>
  )
}

export default Chatbot
