"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EndaiRegistrationForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("ファイルを選択してください");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    setIsUploading(false);

    if (res.ok) {
      alert("アップロード成功！");
      setFile(null);
    } else {
      alert("アップロード失敗");
    }
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-6 max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">資料アップロード</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? "アップロード中..." : "アップロード"}
          </Button>
        </form>
      </div>
    </section>
  );
}
