import { EndaiRegistrationForm } from "@/components/EndaiRegistrationForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { RegisterForm } from "@/components/RegistrationForm";

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <RegisterForm />
      <EndaiRegistrationForm />
      <Pricing />
      <Footer />
    </>
  );
}
