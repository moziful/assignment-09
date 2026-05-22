"use client";

import { MdHelpOutline, MdAttachMoney, MdPets, MdEmail } from "react-icons/md";
import ScrollReveal from "@/components/ScrollReveal";

const faqData = [
  {
    icon: <MdHelpOutline />,
    title: "What do I need to adopt a pet?",
    text: "You usually need a valid ID, basic contact information, and a willingness to provide a safe and caring home.",
  },
  {
    icon: <MdAttachMoney />,
    title: "Is there an adoption fee?",
    text: "Yes, most pets have a small fee that helps cover care, food, and medical needs before adoption.",
  },
  {
    icon: <MdPets />,
    title: "Can I meet the pet first?",
    text: "Absolutely. Meeting the pet first is an important step to make sure it feels like the right match for both sides.",
  },
  {
    icon: <MdEmail />,
    title: "What happens after I submit a request?",
    text: "Our team reviews your request and may contact you with the next steps, including a meet-and-greet or short screening.",
  },
];

const FAQs = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">
            Common questions before adoption
          </h2>
        </div>
      </ScrollReveal>

      <div className="space-y-4">
        {faqData.map((faq, i) => (
          <ScrollReveal key={i} delay={0.1 * (i + 1)}>
            <details className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm transition hover:bg-blue-50 dark:hover:bg-gray-800">
              <summary className="cursor-pointer list-none text-lg font-semibold text-gray-950 dark:text-white flex items-center gap-3">
                <span className="text-blue-600 dark:text-blue-400">
                  {faq.icon}
                </span>
                {faq.title}
              </summary>
              <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-400 pl-9">
                {faq.text}
              </p>
            </details>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
