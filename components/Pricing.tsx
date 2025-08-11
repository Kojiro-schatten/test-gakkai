import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Pricing() {
  const plans = [
    { title: "一般", price: "¥10,000", desc: "全日程参加可能" },
    { title: "学生", price: "¥5,000", desc: "全日程参加可能" },
    { title: "オンライン", price: "¥3,000", desc: "ライブ配信＋録画視聴" },
  ];

  return (
    <section className="py-20 bg-white" id="pricing">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">事前参加受付</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.title} className="shadow-lg">
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-4">{plan.price}</p>
                <p className="mb-6">{plan.desc}</p>
                <Button variant="outline">申し込む</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
