
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const videoUrl = "https://player.vimeo.com/external/492093842.sd.mp4?s=8ea64be43f347a13f4f013b3e170f0e0309a6ef3&profile_id=164&oauth2_token_id=57447761";
const posterUrl = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setVideoOpen(true);
    setIsPlaying(true);
    
    // Small delay to ensure video element is ready
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(err => {
          console.error("Error playing video:", err);
        });
      }
    }, 100);
  };

  const handleClose = () => {
    setVideoOpen(false);
    setIsPlaying(false);
    
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-medical/5 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-medium text-medical uppercase tracking-wider mb-2"
            >
              Experience Our Facility
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Take a <span className="text-medical">Virtual Tour</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mx-auto max-w-2xl mb-10"
            >
              <p className="text-gray-600">
                Our state-of-the-art medical facility is designed with patient comfort and advanced care in mind. 
                Take a virtual tour to explore our modern equipment and healing environment.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 group-hover:from-black/60 transition-all duration-300" />
            
            <motion.img
              src={posterUrl}
              alt="Medical facility"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 10 }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  onClick={handlePlayClick}
                  className="rounded-full w-16 h-16 flex items-center justify-center bg-white/90 hover:bg-white text-medical shadow-lg"
                >
                  <Play size={24} className="ml-1" />
                </Button>
              </motion.div>
            </div>
            
            <div className="absolute bottom-6 left-6 z-20">
              <span className="text-white/90 text-sm font-medium">02:45</span>
            </div>
          </motion.div>
        </div>
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent 
          className="max-w-5xl p-0 bg-black rounded-xl overflow-hidden"
          onInteractOutside={handleClose}
        >
          <div className="relative aspect-video">
            <Button 
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 rounded-full w-10 h-10 p-0 bg-black/50 hover:bg-black/80"
            >
              <X className="h-5 w-5 text-white" />
            </Button>
            <video
              ref={videoRef}
              controls
              playsInline
              className="w-full h-full object-cover"
              src={videoUrl}
              poster={posterUrl}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VideoSection;
