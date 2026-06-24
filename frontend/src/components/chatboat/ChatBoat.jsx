import { askChatbot } from "../../api/authApi";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const ChatBoat = () => {
  const handleSend = async () => {
    const reply = await askChatbot("Best MERN course");
    console.log(reply);
  };

  return (
    <motion.button
      onClick={handleSend}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50"
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
        className="w-16 h-16 rounded-full p-[3px] shadow-2xl"
      >
        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
          <MessageCircle size={30} className="text-white" />
        </div>
      </motion.div>
    </motion.button>
  );
};

export default ChatBoat;
