"use client";

import useSWR from "swr";
import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { updateSkillsData } from "./actions/updateSkills";
import SkillsEditorSkeleton from "./skeleton";
import { useKeyPressHandler } from "@/app/hooks/useKeyPressHandler";
import { fetcher } from "@/app/lib/utils/swr/fetcher";
import { Skill, SkillCategory } from "@/app/types/shared/skill/skill";

export default function SkillsEditor() {
  const { data, error, isLoading, mutate } = useSWR<SkillCategory[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/skills`,
    fetcher
  );

  const [skillsData, setSkillsData] = useState<SkillCategory[] | null>(null);

  // Sync SWR data to local state
  if (!skillsData && data) setSkillsData(data);

  useKeyPressHandler({
    key: "Enter",
    callback: (e) => {
      e.preventDefault();
      handleSave();
    },
  });

  const handleCategoryChange = (index: number, value: string) => {
    if (!skillsData) return;
    const updated = [...skillsData];
    updated[index].title = value;
    setSkillsData(updated);
  };

  const handleSkillChange = (
    catIdx: number,
    skillIdx: number,
    key: keyof Skill,
    value: string | number
  ) => {
    if (!skillsData) return;

    const updated = [...skillsData];
    const skill = updated[catIdx].skills[skillIdx];

    if (key === "level" && typeof value === "number") {
      skill[key] = value;
    } else if (key === "name" && typeof value === "string") {
      skill[key] = value;
    }

    setSkillsData(updated);
  };

  const addCategory = () => {
    setSkillsData((prev) => [
      ...(prev || []),
      { title: "New Category", skills: [{ name: "New Skill", level: 0 }] },
    ]);
  };

  const addSkill = (index: number) => {
    const updated = [...(skillsData || [])];
    updated[index].skills.push({ name: "New Skill", level: 0 });
    setSkillsData(updated);
  };

  const removeCategory = (index: number) => {
    const updated = [...(skillsData || [])];
    updated.splice(index, 1);
    setSkillsData(updated);
  };

  const removeSkill = (catIdx: number, skillIdx: number) => {
    const updated = [...(skillsData || [])];
    updated[catIdx].skills.splice(skillIdx, 1);
    setSkillsData(updated);
  };

  const handleSave = async () => {
    if (!skillsData) return;
    await updateSkillsData(skillsData);
    mutate(); // refetch from API
    alert("Skills updated successfully!");
  };

  if (isLoading || !skillsData) return <SkillsEditorSkeleton />;
  if (error) return <p>Error loading skills</p>;

  return (
    <section className="section-container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Skills Editor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {skillsData.map((category, catIdx) => (
            <div key={catIdx} className="border p-4 rounded-md space-y-4">
              <div className="flex justify-between gap-4 items-center">
                <Input
                  value={category.title}
                  onChange={(e) => handleCategoryChange(catIdx, e.target.value)}
                  className="w-full"
                />
                <Button
                  variant="destructive"
                  onClick={() => removeCategory(catIdx)}
                >
                  Remove Category
                </Button>
              </div>

              {category.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="flex gap-4">
                  <Input
                    value={skill.name}
                    onChange={(e) =>
                      handleSkillChange(
                        catIdx,
                        skillIdx,
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="Skill Name"
                  />
                  <Input
                    type="number"
                    value={skill.level}
                    onChange={(e) =>
                      handleSkillChange(
                        catIdx,
                        skillIdx,
                        "level",
                        +e.target.value
                      )
                    }
                    placeholder="Level"
                    min={0}
                    max={100}
                  />
                  <Button
                    variant="outline"
                    onClick={() => removeSkill(catIdx, skillIdx)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button variant="secondary" onClick={() => addSkill(catIdx)}>
                + Add Skill
              </Button>
            </div>
          ))}

          <div className="flex gap-4">
            <Button onClick={addCategory}>+ Add Category</Button>
            <Button onClick={handleSave} isLoading={isLoading}>
              {!isLoading && "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
