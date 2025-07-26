"use client";

import { useState, useTransition } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { toast } from "react-hot-toast";
import * as actions from "../actions/contactInfoActions";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";

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
type Props = {
  contactInfoData: ContactInfo;
};

export default function ContactEditor({ contactInfoData }: Props) {
  const [data, setData] = useState<ContactInfo>(contactInfoData);
  const [isPending, startTransition] = useTransition();

  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      handleSave();
    },
  });

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

  const handleSave = () => {
    startTransition(async () => {
      try {
        await actions.updateContactInfo(data);
        toast.success("Contact info updated.");
      } catch (err) {
        toast.error("Failed to update contact info.");
      }
    });
  };

  return (
    <section className="section-container">
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
            <Button
              onClick={handleSave}
              className="w-full"
              isLoading={isPending}
            >
              {!isPending && "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
