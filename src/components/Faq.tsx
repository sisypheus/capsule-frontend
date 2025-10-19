import { Container } from '@/components/Container'

const faqs = [
  {
    question: 'How can I deploy my project ?',
    answer:
      "Once you've granted access to capsule, you can start deploying your projects.",
  },
  {
    question: 'How much does it cost ?',
    answer: "Nothing, it's free for anyone to try and deploy their applications.",
  },
  {
    question: 'Is it easy to use ?',
    answer:
      "If you're a software engineer and you know how to create a Dockerfile for your project, it's enough !",
  },
]
type question = { question: string; answer: string }

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <img
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src="/images/bg-faq.jpg"
        alt=""
        width={1558}
        height={946}
      />
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Can’t find the answer you’re looking for? Reach out to {' '}
                <a href="mailto:poette.theo@gmail.com" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  me.
                </a>{' '}
              </p>
            </div>
            <div className="mt-10 lg:col-span-7 lg:mt-0">
              <dl className="space-y-10">
                {faqs.map((faq: question) => (
                  <div key={faq.question}>
                    <dt className="text-base font-semibold leading-7 text-gray-900">{faq.question}</dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
