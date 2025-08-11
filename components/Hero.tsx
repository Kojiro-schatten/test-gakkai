import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-neutral-50 to-neutral-100 py-20" id="about">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">国際学会 2025</h1>
        <p className="text-lg text-neutral-600 mb-8">
          世界中の研究者とつながる、年に一度のイベント。
        </p>
      </div>
    </section>
  );
}
