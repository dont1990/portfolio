"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/components/ui/popover";

export function DownloadResumeButton() {
  const api = process.env.NEXT_PUBLIC_API_URL;
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button size="lg" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-40 p-0">
          <a
            href={`${api}/hero/resume?lang=en`}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
          >
            Resume (EN)
          </a>
          <a
            href={`${api}/hero/resume?lang=fa`}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
          >
            Resume (FA)
          </a>
        </PopoverContent>
      </Popover>
    </div>
  );
}
