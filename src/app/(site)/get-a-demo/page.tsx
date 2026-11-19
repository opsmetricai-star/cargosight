import LeadForm from "@/components/LeadForm";

export const metadata = { title: "Get a demo | cargosight" };

export default function Page() {
  return (
    <section className="container-x grid gap-12 py-20 lg:grid-cols-2">
      <div>
        <div className="eyebrow text-brand">cargosight</div>
        <h1 className="h-display mt-2">Get a demo</h1>
        <p className="mt-5 max-w-md text-[18px] text-[#3a4350]">Tell us about your network and we will show you how agents detect, decide and act on your own shipments.</p>
      </div>
      <LeadForm />
    </section>
  );
}
