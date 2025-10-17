"use client";

import { useState } from "react";
import Link from "next/link";

type Lang = "en" | "fil";

const t = {
  en: {
    title: "Pricing",
    subtitle:
      "Simple, flexible plans for Urdaneta City employers. Start free, upgrade anytime.",
    noteLocal:
      "JobNest Urdaneta currently serves employers and job seekers within Urdaneta City, Pangasinan.",
    perPost: "per post",
    per15: "per post / 15 days",
    per30: "per post / 30 days",
    features: {
      free: [
        "Post 1 job listing",
        "Visible in search for 7 days",
        "Basic employer dashboard",
        "Manual applicant contact",
      ],
      standard: [
        "Up to 3 active job listings",
        "Boosted search visibility",
        "Automated applicant messages",
        "Screening questions & shortlist",
        "Local focus within Urdaneta",
      ],
      premium: [
        "Unlimited job postings",
        "Featured Employer & Urgently Hiring labels",
        "Priority placement in listings",
        "AI-based candidate matching (rollout)",
        "Employer analytics dashboard",
        "Company logo on job posts",
      ],
    },
    addonsTitle: "Optional Add-ons",
    addons: [
      "Homepage Featured banner — ₱50 / hour",
      "Resume database access — (coming soon)",
      "SMS applicant alerts — ₱2 / message",
    ],
    ctaFree: "Post a job (Free)",
    ctaStandard: "Choose Standard",
    ctaPremium: "Choose Premium",
    fineprint:
      "Prices are VAT-inclusive. Billing in Philippine Peso (PHP). Plans can be changed or canceled anytime. Featured placement depends on available inventory.",
  },
  fil: {
    title: "Presyo",
    subtitle:
      "Magaang at malinaw na plano para sa mga employer sa Lungsod ng Urdaneta. Libre muna, at mag-upgrade kung kailangan.",
    noteLocal:
      "Sa ngayon, ang JobNest Urdaneta ay para lamang sa mga employer at job seeker sa Lungsod ng Urdaneta, Pangasinan.",
    perPost: "bawat post",
    per15: "bawat post / 15 araw",
    per30: "bawat post / 30 araw",
    features: {
      free: [
        "Isang (1) job listing",
        "Makikita sa search sa loob ng 7 araw",
        "Basic na employer dashboard",
        "Manwal na pakikipag-ugnayan sa aplikante",
      ],
      standard: [
        "Hanggang 3 aktibong job listing",
        "Mas mataas ang visibility sa search",
        "Awto-message sa mga aplikante",
        "Screening questions at shortlist",
        "Tukoy sa Urdaneta lamang",
      ],
      premium: [
        "Walang limit na job postings",
        "“Featured Employer” at “Urgently Hiring” labels",
        "Prayoridad na puwesto sa listahan",
        "AI-based candidate matching (papasimula)",
        "Employer analytics dashboard",
        "Logo ng kumpanya sa mga job post",
      ],
    },
    addonsTitle: "Mga Optional na Add-on",
    addons: [
      "Featured banner sa homepage — ₱50 / oras",
      "Access sa resume database — (malapit na)",
      "SMS alert sa aplikante — ₱2 / mensahe",
    ],
    ctaFree: "Mag-post (Libre)",
    ctaStandard: "Kunin ang Standard",
    ctaPremium: "Kunin ang Premium",
    fineprint:
      "Kasama na ang VAT. Sisingilin sa Philippine Peso (PHP). Maaaring baguhin o kanselahin ang plano anumang oras. Nakadepende sa availability ang featured placement.",
  },
};

export default function PricingPage() {
  const [lang, setLang] = useState<Lang>("en");
  const L = t[lang];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-brandNavy">
              {L.title}
            </h1>
            <p className="mt-2 max-w-2xl text-brandMuted">{L.subtitle}</p>
            <p className="mt-1 text-sm text-amber-700">{L.noteLocal}</p>
          </div>

          {/* Language toggle */}
          <div className="inline-flex rounded-xl border border-gray-200 p-1">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 text-sm rounded-lg ${
                lang === "en" ? "bg-brandNavy text-white" : "text-brandNavy"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("fil")}
              className={`px-3 py-1 text-sm rounded-lg ${
                lang === "fil" ? "bg-brandNavy text-white" : "text-brandNavy"
              }`}
            >
              FIL
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {/* Free */}
          <PlanCard
            highlight={false}
            name="Free"
            price="₱0"
            cycle={L.perPost}
            features={L.features.free}
            ctaLabel={L.ctaFree}
            href="/employers/post"
          />

          {/* Standard */}
          <PlanCard
            highlight={false}
            name="Standard"
            price="₱199"
            cycle={L.per15}
            features={L.features.standard}
            ctaLabel={L.ctaStandard}
            href="/employers/post?plan=standard"
            badge="Best for SMEs"
          />

          {/* Premium */}
          <PlanCard
            highlight
            name="Premium"
            price="₱499"
            cycle={L.per30}
            features={L.features.premium}
            ctaLabel={L.ctaPremium}
            href="/employers/post?plan=premium"
            badge="Most Popular"
          />
        </div>

        {/* Add-ons */}
        <div className="mt-12 rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold">{L.addonsTitle}</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {L.addons.map((a) => (
              <li key={a} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brandGold" />
                <span className="text-brandNavy/80">{a}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fine print */}
        <p className="mt-6 text-xs text-brandMuted">{L.fineprint}</p>
      </section>
    </main>
  );
}

function PlanCard(props: {
  highlight?: boolean;
  name: string;
  price: string;
  cycle: string;
  features: string[];
  ctaLabel: string;
  href: string;
  badge?: string;
}) {
  const { highlight, name, price, cycle, features, ctaLabel, href, badge } =
    props;

  return (
    <div
      className={`relative rounded-3xl p-6 ${
        highlight
          ? "bg-brandNavy text-white shadow-xl ring-1 ring-brandNavy/10"
          : "bg-white ring-1 ring-gray-200"
      }`}
    >
      {badge && (
        <div
          className={`absolute -top-3 right-4 rounded-full px-3 py-1 text-xs font-semibold ${
            highlight ? "bg-white/15 text-white" : "bg-amber-100 text-amber-800"
          }`}
        >
          {badge}
        </div>
      )}

      <h3 className={`text-lg font-bold ${highlight ? "text-white" : ""}`}>
        {name}
      </h3>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-3xl font-extrabold">{price}</span>
        <span className={`${highlight ? "text-white/70" : "text-gray-500"} text-sm`}>
          {cycle}
        </span>
      </div>

      <ul className="mt-4 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex gap-2">
            <span
              className={`mt-1 inline-block h-2 w-2 rounded-full ${
                highlight ? "bg-brandGold" : "bg-brandNavy"
              }`}
            />
            <span className={highlight ? "text-white/90" : "text-brandNavy/80"}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 font-semibold transition ${
          highlight
            ? "bg-brandGold text-brandNavy hover:opacity-90"
            : "bg-brandNavy text-white hover:opacity-90"
        }`}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
