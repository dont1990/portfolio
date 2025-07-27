"use client";

import useSWR from "swr";
import { useEffect, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { fetchAboutDataClient } from "@/app/lib/fetch/fetchAbout";
import * as actions from "./actions/aboutActions";
import AboutEditorSkeleton from "./skeleton";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import { AboutData, Feature } from "@/app/types/shared/about/aboutData";

export default function AboutEditor() {
  const { data, error, isLoading, mutate } = useSWR<AboutData>(
    "/about",
    fetchAboutDataClient
  );

  const [form, setForm] = useState<AboutData | null>(null);
  const [isPending, startTransition] = useTransition();

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

  if (isLoading) return <AboutEditorSkeleton />;
  if (error || !form) return <p>Failed to load about data.</p>;

  const updateArrayItem = (
    field: keyof AboutData,
    index: number,
    value: string
  ) => {
    setForm((prev) => {
      if (!prev) return prev;
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addArrayItem = (field: keyof AboutData, value = "") => {
    setForm((prev) =>
      prev ? { ...prev, [field]: [...prev[field], value] } : null
    );
  };

  const removeArrayItem = (field: keyof AboutData, index: number) => {
    setForm((prev) => {
      if (!prev) return prev;
      const updated = [...prev[field]];
      updated.splice(index, 1);
      return { ...prev, [field]: updated };
    });
  };

  const updateFeatureItem = (
    index: number,
    key: keyof Feature,
    value: string
  ) => {
    setForm((prev) => {
      if (!prev) return prev;
      const updated = [...prev.features];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, features: updated };
    });
  };

  const addFeature = () => {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            features: [
              ...prev.features,
              { title: "", description: "", icon: "Zap" },
            ],
          }
        : null
    );
  };

  const removeFeature = (index: number) => {
    setForm((prev) => {
      if (!prev) return prev;
      const updated = [...prev.features];
      updated.splice(index, 1);
      return { ...prev, features: updated };
    });
  };

  const handleSave = () => {
    if (!form) return;
    startTransition(async () => {
      try {
        await actions.updateAboutData(form);
        toast.success("About info updated.");
        mutate();
      } catch {
        toast.error("Failed to update.");
      }
    });
  };

  return (
    <section className="section-container">
      <Card className="max-w-3xl mx-auto space-y-6">
        <CardHeader>
          <CardTitle>Edit About Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Descriptions */}
          <div className="space-y-2">
            <Label>Description</Label>
            {form.description.map((desc, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={desc}
                  onChange={(e) =>
                    updateArrayItem("description", i, e.target.value)
                  }
                />
                <Button
                  variant="destructive"
                  onClick={() => removeArrayItem("description", i)}
                >
                  −
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => addArrayItem("description")}
            >
              + Add Description
            </Button>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Skills</Label>
            {form.skills.map((skill, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={skill}
                  onChange={(e) => updateArrayItem("skills", i, e.target.value)}
                />
                <Button
                  variant="destructive"
                  onClick={() => removeArrayItem("skills", i)}
                >
                  −
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={() => addArrayItem("skills")}>
              + Add Skill
            </Button>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <Label>Features</Label>
            {form.features.map((feature, i) => (
              <div key={i} className="space-y-2 border p-4 rounded-md">
                <Input
                  placeholder="Title"
                  value={feature.title}
                  onChange={(e) =>
                    updateFeatureItem(i, "title", e.target.value)
                  }
                />
                <Input
                  placeholder="Description"
                  value={feature.description}
                  onChange={(e) =>
                    updateFeatureItem(i, "description", e.target.value)
                  }
                />
                <Input
                  placeholder="Icon"
                  value={feature.icon}
                  onChange={(e) => updateFeatureItem(i, "icon", e.target.value)}
                />
                <Button variant="destructive" onClick={() => removeFeature(i)}>
                  − Remove Feature
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addFeature}>
              + Add Feature
            </Button>
          </div>

          {/* Save */}
          <div>
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
