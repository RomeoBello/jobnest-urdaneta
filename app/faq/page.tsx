"use client";
import React, { useState } from "react";

const employerFAQ = [
  { q: "How do I post a job?", a: "Go to your employer dashboard, then click 'Post a Job'." },
  { q: "Is posting free?", a: "Yes, your first post is free. Subsequent posts follow the pricing plan." },
];

const jobSeekerFAQ = [
  { q: "How do I apply for jobs?", a: "Sign in, visit the jobs section, and click 'Apply' on listings." },
  { q: "Can I edit my profile?", a: "Yes, from your seeker dashboard, click 'Profile' > 'Edit'." },
];

export default function FAQPage() {
  const [selected, setSelected] = useState<"employer" | "jobseeker">("employer");
  const faqList = selected === "employer" ? employerFAQ : jobSeekerFAQ;

  return (
    <main className="min-h-screen px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-brandNavy mb-8">Frequently Asked Questions</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setSelected("employer")}
          className={`px-4 py-2 rounded-full ${selected === "employer" ? "bg-brandNavy text-white" : "bg-gray-200"}`}
        >
          Employers
        </button>
        <button
          onClick={() => setSelected("jobseeker")}
          className={`px-4 py-2 rounded-full ${selected === "jobseeker" ? "bg-brandNavy text-white" : "bg-gray-200"}`}
        >
          Job Seekers
        </button>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqList.map((item, i) => (
          <div key={i} className="border rounded-lg p-4 bg-white shadow-sm">
            <h3 className="font-semibold text-lg text-brandNavy">{item.q}</h3>
            <p className="text-slate-600 mt-2">{item.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
