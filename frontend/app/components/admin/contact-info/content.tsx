"use client";

import { useState, useTransition, useEffect } from "react";
import useSWR from "swr";
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
import * as actions from "./actions/contactInfoActions";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import { ContactInfo } from "@/app/types/shared/contact/contactInfo";
import ContactInfoSkeleton from "./skeleton";
import { fetcher } from "@/app/lib/utils/swr/fetcher";

export default function ContactEditor() {
  const { data, error, isLoading, mutate } = useSWR<ContactInfo>(
  `${process.env.NEXT_PUBLIC_API_URL}/contact-info`,
  fetcher // <- your generic fetcher that accepts a URL
);


  const [formData, setFormData] = useState<ContactInfo | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (data && !formData) {
      setFormData(data);
    }
  }, [data, formData]);

  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      handleSave();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!formData) return;

    setFormData((prev) => {
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
    if (!formData) return;
    startTransition(async () => {
      try {
        await actions.updateContactInfo(formData);
        toast.success("Contact info updated.");
        mutate(); // revalidate
      } catch (err) {
        toast.error("Failed to update contact info.");
      }
    });
  };

  if (isLoading || !formData) {
    return <ContactInfoSkeleton />;
  }

  if (error) {
    return <p className="text-red-500">Failed to load contact info</p>;
  }

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
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              name="location"
              value={formData.location}
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
                value={formData.social.github}
                onChange={handleChange}
                placeholder="GitHub URL"
              />

              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                name="social.linkedin"
                value={formData.social.linkedin}
                onChange={handleChange}
                placeholder="LinkedIn URL"
              />

              <Label htmlFor="twitter">Twitter</Label>
              <Input
                name="social.twitter"
                value={formData.social.twitter}
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
