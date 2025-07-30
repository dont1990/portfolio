import { useState, useEffect, useTransition } from "react";
import useSWR from "swr";
import * as actions from "../actions/heroActions";
import { HeroData } from "@/app/types/shared/hero/heroData";
import { toast } from "react-hot-toast";
import { fetchHeroDataClient } from "@/app/lib/fetch/fetchHero";

export function useHeroData() {
  const { data, error, isLoading, mutate } = useSWR<HeroData>(
    "/hero",
    fetchHeroDataClient
  );
  const [form, setForm] = useState<HeroData | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

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

  return {
    form,
    setForm,
    isLoading,
    error,
    isPending,
    handleChange,
    handleRolesChange,
    handleSave,
  };
}
