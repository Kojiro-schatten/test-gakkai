"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  name: z.string().min(1, "名前は必須です"),
  affiliation: z.string().min(1, "所属は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  note: z.string().optional(),
});

export function RegisterForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { name: string, affiliation: string, email: string, note?: string }) => {
    console.log('data', data)
    await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify(data),
    });
    reset();
    alert("送信しました！");
  };

  return (
    <section className="py-20 bg-neutral-50" id="register">
      <div className="container mx-auto px-6 max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">申し込みフォーム</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="名前" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          <Input placeholder="所属" {...register("affiliation")} />
          {errors.affiliation && <p className="text-red-500 text-sm">{errors.affiliation.message}</p>}
          <Input placeholder="メールアドレス" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          <Input type="textarea" placeholder="備考" {...register("note")} />
          {errors.note && <p className="text-red-500 text-sm">{errors.note.message}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            送信
          </Button>
        </form>
      </div>
    </section>
  );
}
