import { useState } from "react";
import { askChatbot } from "../../api/authApi";
import { MessageCircle, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-hot-toast';

const ChatBoat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! Ask me anything about our courses.",
    },
  ]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = message;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const reply = await askChatbot(userMsg);
      toast.success("Reply received!");

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: reply },
      ]);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong 😔");
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong 😔",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-indigo-600 text-white">
              <h3 className="font-semibold">AI Course Assistant</h3>

              <button onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[370px] overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${msg.sender === "user"
                      ? "bg-indigo-600 text-white ml-auto"
                      : "bg-slate-800 text-gray-200"
                    }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="bg-slate-800 text-white px-4 py-2 rounded-2xl w-fit">
                  Typing...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-700 bg-slate-900">
              <div className="flex gap-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSend()
                  }
                  placeholder="Ask about courses..."
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-800 text-white outline-none"
                />

                <button
                  onClick={handleSend}
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 rounded-xl text-white"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-[999]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{
            background: [
              "#6366f1",
              "#8b5cf6",
              "#ec4899",
              "#06b6d4",
              "#6366f1",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-16 h-16 rounded-full p-[3px]"
        >
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
            <MessageCircle
              size={30}
              className="text-white"
            />
          </div>
        </motion.div>
      </motion.button>
    </>
  );
};

export default ChatBoat;
