const FAQs = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          FAQ
        </p>
        <h2 className="mt-2 text-3xl font-bold text-gray-950">
          Common questions before adoption
        </h2>
      </div>

      <div className="space-y-4">
        <details className="rounded-xl border border-gray-200 bg-white p-5 hover:bg-blue-100 shadow-sm">
          <summary className="cursor-pointer list-none text-lg font-semibold text-gray-950">
            What do I need to adopt a pet?
          </summary>
          <p className="mt-3 text-sm leading-6 text-gray-700">
            You usually need a valid ID, basic contact information, and a
            willingness to provide a safe and caring home.
          </p>
        </details>
        <details className="rounded-xl border border-gray-200 bg-white p-5 hover:bg-blue-100 shadow-sm">
          <summary className="cursor-pointer list-none text-lg font-semibold text-gray-950">
            Is there an adoption fee?
          </summary>
          <p className="mt-3 text-sm leading-6 text-gray-700">
            Yes, most pets have a small fee that helps cover care, food, and
            medical needs before adoption.
          </p>
        </details>
        <details className="rounded-xl border border-gray-200 bg-white p-5 hover:bg-blue-100 shadow-sm">
          <summary className="cursor-pointer list-none text-lg font-semibold text-gray-950">
            Can I meet the pet first?
          </summary>
          <p className="mt-3 text-sm leading-6 text-gray-700">
            Absolutely. Meeting the pet first is an important step to make sure
            it feels like the right match for both sides.
          </p>
        </details>
        <details className="rounded-xl border border-gray-200 bg-white p-5 hover:bg-blue-100 shadow-sm">
          <summary className="cursor-pointer list-none text-lg font-semibold text-gray-950">
            What happens after I submit a request?
          </summary>
          <p className="mt-3 text-sm leading-6 text-gray-700">
            Our team reviews your request and may contact you with the next
            steps, including a meet-and-greet or short screening.
          </p>
        </details>
      </div>
    </section>
  );
};

export default FAQs;
