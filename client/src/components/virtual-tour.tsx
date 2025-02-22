import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video, Play } from 'lucide-react';

interface VirtualTourProps {
  title: string;
  tourUrl: string;
  thumbnailUrl: string;
}

export default function VirtualTour({ title, tourUrl, thumbnailUrl }: VirtualTourProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div 
        className="relative cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <img 
          src={thumbnailUrl} 
          alt={title}
          className="rounded-lg w-full max-w-md mx-auto"
        />
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center rounded-lg">
          <Play className="h-16 w-16 text-white" />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              {title} - Virtual Tour
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video relative">
            <iframe
              src={tourUrl}
              className="w-full h-full rounded-lg"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}