'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageSquare } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: '1. Why should I choose ReadEssay and not any other online academic services?',
    answer:
      'We deliver results! At ReadEssay, our academic writers deliver only high-quality, original work to help you achieve academic excellence—no fluff, no delays, only top-notch academic assistance at your fingertips.',
  },
  {
    id: 'faq-2',
    question: '2. Are your services safe and confidential?',
    answer:
      'Yes, 100%! Your privacy, personal information, and financial information remain safe with us. We maintain strict privacy policies, so your information remains secure with us. We will never share your information with a third party.',
  },
  {
    id: 'faq-3',
    question: '3. How do you guarantee high-quality online class services and protected exams?',
    answer:
      'Our expert professionals ensure accuracy, originality, and top grades as we deliver only original content after undergoing extensive research. Our professionals are experts in their subjects/fields. So, only the best will be responsible for your online classes. They will ensure that all your class lectures, teacher instructions, and quizzes are met. Moreover, our specialists specialize in handling protected exams securely, ensuring top results.',
  },
  {
    id: 'faq-4',
    question: '4. What kind of courses do you offer in your online class and protected exam service?',
    answer:
      'We offer a comprehensive range of online class services and protected exam services for Statistics, Accounting, Math, Finance, Chemistry, Computer Science (CS), Economics, English, Nursing, Psychology, Management, Supply Chain, and Operations Management.',
  },
  {
    id: 'faq-5',
    question: '5. Do you work on urgent orders, too?',
    answer:
      'Yes, we work on urgent orders! Share your schedule, and we will work on your timeline if you need an assignment within a few hours or cannot attend an upcoming online class due shortly. We offer an urgent assistance option. Just let us know your deadline, and we will deliver it on time, every time.',
  },
  {
    id: 'faq-6',
    question: '6. How much does your online class service and protected exam service cost?',
    answer:
      'We offer transparent, competitive pricing based on the order\'s complexity, deadline, subject, and workload. There are no hidden fees attached to our pricing. Request a free quote and check for yourself!',
  },
  {
    id: 'faq-7',
    question: '7. How can I track my orders and get updates?',
    answer:
      'Our live chat support is available 24/7. So, if you want to get an update about your order or have any ambiguity or query, our customer support team is always ready to update you and keep you informed.',
  },
  {
    id: 'faq-8',
    question: '8. Do you provide original, plagiarism-free work?',
    answer:
      '100%! Before submitting any work, we ensure it\'s original and plagiarism-free. We check every submission through advanced plagiarism detection tools, ensuring you receive authentic, citation-backed work.',
  },
  {
    id: 'faq-9',
    question: '9. How do I get started with ReadEssay’s online class services and exams?',
    answer:
      'We offer a simple 4 step easy process. Start with placing your order by sharing information about your class details, assignments, online classes or courses, or exams you need help with. Receive a quote, confirm payment, monitor progress, and receive your work!',
  },
  {
    id: 'faq-10',
    question: '10. Can you take my entire online class?',
    answer:
      'Yes! Our top online class helpers will manage your entire class and coursework. They will ensure that all your lectures, assignments, quizzes, discussions, and exams are done, keeping you on track for success.',
  },
];

interface FaqAccordionProps {
  items?: { id?: string; question: string; answer: string }[];
}

export default function FaqAccordion({ items }: FaqAccordionProps = {}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const displayItems: FaqItem[] = items && items.length > 0
    ? items.map((item, idx) => ({
        id: item.id || `faq-dynamic-${idx}`,
        question: item.question,
        answer: item.answer,
      }))
    : FAQ_ITEMS;

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      <div className="space-y-3.5" role="region" aria-label="Frequently Asked Questions">
        {displayItems.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden transition-colors"
            >
              <button
                type="button"
                id={`faq-btn-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF641A] cursor-pointer"
              >
                <span className="font-heading font-semibold text-base sm:text-lg text-[#243445] pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#FF641A] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Section CTA Button linking to /contact */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <p className="text-slate-600 text-sm sm:text-base">
          Have more questions or need a customized quote for your course?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white font-bold text-sm shadow-md transition-all transform hover:-translate-y-0.5"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact Support</span>
        </Link>
      </div>
    </div>
  );
}
