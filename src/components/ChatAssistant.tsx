
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your healthcare assistant. How can I help you today?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        // Don't close, just minimize
        if (isChatOpen && !isMinimized) {
          setIsMinimized(true);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Focus back on input after sending
    inputRef.current?.focus();

    // Simulate API call delay
    setTimeout(() => {
      let response = "I understand you're asking about ";
      
      if (userMessage.toLowerCase().includes("appointment")) {
        response += "booking an appointment. You can schedule one through our app or call us at (555) 123-4567.";
      } else if (userMessage.toLowerCase().includes("doctor")) {
        response += "our doctors. We have specialists in various fields. What specific specialty are you looking for?";
      } else if (userMessage.toLowerCase().includes("emergency")) {
        response += "emergency services. For medical emergencies, please call 911 immediately.";
      } else {
        response += "healthcare services. Is there something specific you'd like to know about our facilities or services?";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openChat = () => {
    setIsChatOpen(true);
    setIsMinimized(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50" ref={chatRef}>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : 480,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn(
              "bg-white rounded-2xl shadow-2xl w-[340px] overflow-hidden flex flex-col",
              isMinimized ? "h-auto" : "h-[480px]"
            )}
          >
            <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-medical to-medical-dark text-white">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-white/20">
                  <AvatarImage src="/placeholder.svg" alt="Bot" />
                  <AvatarFallback className="bg-medical-dark text-white">HC</AvatarFallback>
                </Avatar>
                <span className="font-medium">Healthcare Assistant</span>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white hover:bg-white/10"
                >
                  <ChevronUp className={`h-5 w-5 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
                </Button>
                <Button 
                  onClick={() => setIsChatOpen(false)}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {!isMinimized && (
              <>
                <div className="flex-1 p-4 overflow-y-auto">
                  <AnimatePresence initial={false}>
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex items-start gap-2 mb-4 ${
                          message.role === 'user' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarImage src="/placeholder.svg" alt="Bot" />
                            <AvatarFallback className="bg-medical text-white">HC</AvatarFallback>
                          </Avatar>
                        )}
                        {message.role === 'user' && (
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarImage src="/placeholder.svg" alt="You" />
                            <AvatarFallback className="bg-gray-200 text-gray-700">You</AvatarFallback>
                          </Avatar>
                        )}
                        <motion.div
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          className={`rounded-lg p-3 text-sm max-w-[230px] ${
                            message.role === 'user'
                              ? 'bg-medical text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p>{message.content}</p>
                        </motion.div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 mb-4"
                      >
                        <Avatar className="h-8 w-8 mt-1">
                          <AvatarImage src="/placeholder.svg" alt="Bot" />
                          <AvatarFallback className="bg-medical text-white">HC</AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                          <div className="flex space-x-1">
                            <motion.div
                              animate={{ scale: [0.8, 1, 0.8] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="h-2 w-2 rounded-full bg-gray-400"
                            />
                            <motion.div
                              animate={{ scale: [0.8, 1, 0.8] }}
                              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                              className="h-2 w-2 rounded-full bg-gray-400"
                            />
                            <motion.div
                              animate={{ scale: [0.8, 1, 0.8] }}
                              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                              className="h-2 w-2 rounded-full bg-gray-400"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </AnimatePresence>
                </div>

                <div className="p-3 border-t">
                  <div className="relative rounded-full overflow-hidden border border-gray-200 focus-within:ring-1 focus-within:ring-medical focus-within:border-medical">
                    <textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your question..."
                      className="w-full px-4 py-2 pr-12 text-sm max-h-20 resize-none focus:outline-none"
                      rows={1}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full transition-colors ${
                        inputMessage.trim() && !isLoading
                          ? 'bg-medical text-white hover:bg-medical-dark'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isChatOpen && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={openChat}
                className="bg-medical text-white p-4 rounded-full shadow-lg flex items-center gap-2"
              >
                <Bot className="w-6 h-6" />
                <span className="hidden md:inline font-medium">Chat with us</span>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Ask a healthcare question</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default ChatAssistant;
