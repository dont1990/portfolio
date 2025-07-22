"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"; // adjust path if needed

interface Submission {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

type Props = {
  submissions: Submission[];
};

export default function ContactSubmissionsPage({ submissions }: Props) {
  return (
    <section className="section-container">
      <Card>
        <CardHeader>
          <CardTitle>Contact Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((item) => {
                const [open, setOpen] = useState(false);

                return (
                  <Popover key={item.id} open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <TableRow
                        className="cursor-pointer hover:bg-muted transition-colors"
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                      >
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.subject}</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {item.message}
                        </TableCell>
                        <TableCell>
                          {new Date(item.submittedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </TableCell>
                      </TableRow>
                    </PopoverTrigger>
                    <PopoverContent
                      side="bottom"
                      align="start"
                      className="w-[320px] rounded-2xl shadow-xl border border-primary bg-popover p-3 space-y-3"
                      onMouseEnter={() => setOpen(true)}
                      onMouseLeave={() => setOpen(false)}
                    >
                      <div className="text-lg font-semibold text-primary">
                        {item.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.email}
                      </div>

                      <div className="pt-1 space-y-1 text-sm">
                        <p>
                          <span className="font-medium text-foreground">
                            Subject:
                          </span>{" "}
                          {item.subject}
                        </p>
                        <p>
                          <span className="font-medium text-foreground">
                            Message:
                          </span>{" "}
                          {item.message}
                        </p>
                        <p className="text-xs text-muted-foreground pt-2">
                          Submitted on{" "}
                          {new Date(item.submittedAt).toLocaleString()}
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
