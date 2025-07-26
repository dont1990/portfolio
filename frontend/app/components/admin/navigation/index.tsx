"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  FileText,
  UserCircle,
  Info,
  FileSignature,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet";
import clsx from "clsx";
import { Button } from "../../ui/button";
import { cn } from "@/app/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/submission", label: "Submission", icon: FileText },
  { href: "/admin/contact-info", label: "Contact Info", icon: Mail },
  { href: "/admin/hero", label: "Hero", icon: UserCircle },
  { href: "/admin/about", label: "About", icon: Info },
];

export function AdminNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <nav className="space-y-2">
      {adminLinks.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={() => setOpen(false)}
          prefetch={true}
          className={clsx(
            "flex items-center gap-3 px-4 py-2 rounded-md transition-colors",
            pathname === href
              ? "bg-primary text-white"
              : "text-muted-foreground hover:bg-muted-foreground/10"
          )}
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile top nav with Sheet trigger */}
      <div
        className={cn(
          "lg:hidden flex items-center justify-between lg:p-4 border-b sticky top-0 z-50",
          open && "bg-background"
        )}
      >
        {/* <h2 className="text-xl font-bold">Admin Panel</h2> */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mb-auto">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4">
            <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
            <NavLinks />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:h-screen bg-muted border-r p-4 sticky top-0">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <NavLinks />
      </aside>
    </>
  );
}
