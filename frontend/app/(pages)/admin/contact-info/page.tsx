"use client";

import { useEffect, useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { useToast } from "@/app/components/ui/use-toast";

type ContactInfo = {
  email: string;
  phone: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
};

export default function AdminContactInfoEditor() {
  const [data, setData] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/contact-info`)
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => {
      if (!prev) return prev;

      if (name.includes(".")) {
        const [section, key] = name.split(".") as [
          "social",
          keyof ContactInfo["social"]
        ];

        return {
          ...prev,
          [section]: {
            ...prev[section],
            [key]: value,
          },
        };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleSave = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/contact-info`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    if (res.ok) {
      toast({ title: "Success", description: "Contact info updated." });
    } else {
      toast({
        title: "Error",
        description: "Failed to update contact info.",
        variant: "destructive",
      });
    }
  };

  if (loading || !data)
    return <p className="text-center py-10">Loading contact info...</p>;

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            name="location"
            value={data.location}
            onChange={handleChange}
            placeholder="Location"
          />
        </div>

        <div className="pt-4 border-t">
          <h4 className="text-lg font-medium mb-2">Social Links</h4>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              name="social.github"
              value={data.social.github}
              onChange={handleChange}
              placeholder="GitHub URL"
            />

            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              name="social.linkedin"
              value={data.social.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn URL"
            />

            <Label htmlFor="twitter">Twitter</Label>
            <Input
              name="social.twitter"
              value={data.social.twitter}
              onChange={handleChange}
              placeholder="Twitter URL"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
