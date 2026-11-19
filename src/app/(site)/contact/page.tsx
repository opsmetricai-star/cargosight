import LeadForm from "@/components/LeadForm";

export const metadata = { title: "Contact us | cargosight" };

export default function Page() {
  return (
    <section className="container-x grid gap-12 py-20 lg:grid-cols-2">
      <div>
        <div className="eyebrow text-brand">Support & sales</div>
        <h1 className="h-display mt-2">Contact us</h1>
        <p className="mt-5 max-w-md text-[18px] text-[#3a4350]">Questions about the platform, carriers or pricing? Send a note and our team will respond.</p>
      </div>
      <LeadForm cta="Send message" />
    </section>
  );
}
