"use client";

import useSWR from "swr";
import { useState, useTransition, useEffect } from "react";
import { fetchHeroDataClient } from "@/app/lib/fetch/fetchHero";
import { toast } from "react-hot-toast";
import * as actions from "./actions/heroActions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import HeroEditorSkeleton from "./skeleton";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import { HeroData } from "@/app/types/shared/hero/heroData";

export default function HeroEditor() {
  const { data, error, isLoading, mutate } = useSWR<HeroData>(
    "/hero",
    fetchHeroDataClient
  );

  const [form, setForm] = useState<HeroData | null>(null);
  const [isPending, startTransition] = useTransition();

  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      handleSave();
    },
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  if (isLoading) return <HeroEditorSkeleton />;
  if (error || !form) return <p>Failed to load hero data.</p>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      if (!prev) return prev;

      if (name.includes(".")) {
        const [section, key] = name.split(".") as [
          "socials",
          keyof HeroData["socials"]
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

  const handleRolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const roles = e.target.value.split(",").map((r) => r.trim());
    setForm((prev) => (prev ? { ...prev, roles } : null));
  };

  const handleResumeUpload = async () => {
    if (!resumeFile) return;
    const formData = new FormData();
    formData.append("resume", resumeFile);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/hero/upload-resume`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Failed to upload resume.");
      toast.success("Resume uploaded.");
    } catch (err) {
      toast.error("Resume upload failed.");
    }
  };

  const handleSave = () => {
    if (!form) return;
    startTransition(async () => {
      try {
        await actions.updateHeroInfo(form);
        toast.success("Hero info updated.");
        mutate(); // re-fetch after update
      } catch (err) {
        toast.error("Failed to update hero info.");
      }
    });
  };

  return (
    <section className="section-container">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Hero Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Same form as before */}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Initials</Label>
            <Input
              name="initials"
              value={form.initials}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Roles (comma-separated)</Label>
            <Input
              value={form.roles.join(", ")}
              onChange={handleRolesChange}
              placeholder="e.g. Developer, Designer, Freelancer"
            />
          </div>

          <div className="space-y-2">
            <Label>Bio</Label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full p-2 rounded-md border"
              rows={4}
            />
          </div>

          <div className="pt-4 border-t">
            <h4 className="text-lg font-medium mb-2">Resume</h4>

            <div className="space-y-2">
              <Input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setResumeFile(e.target.files[0]);
                  }
                }}
              />

              <div className="flex gap-2">
                <Button onClick={handleResumeUpload} disabled={!resumeFile}>
                  Upload Resume
                </Button>

                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/hero/resume`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="outline" className="w-full sm:w-auto">
                    Download Resume
                  </Button>
                </a>
              </div>
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