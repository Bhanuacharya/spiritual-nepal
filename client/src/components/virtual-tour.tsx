import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video360, Play } from 'lucide-react';

interface VirtualTourProps {
  title: string;
  tourUrl: string;
  thumbnailUrl: string;
}

export default function VirtualTour({ title, tourUrl, thumbnailUrl }: VirtualTourProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
        variant="outline"
      >
        <Video360 className="h-5 w-5" />
        Take Virtual Tour
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video360 className="h-5 w-5" />
              {title} - Virtual Tour
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video relative">
            <iframe
              src={tourUrl}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
