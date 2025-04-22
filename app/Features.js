/* components/Features.js */
"use client";

export function Features() {
  const features = [
    {
      title: "Vast Collection",
      description:
        "Access thousands of eBooks, journals, and research papers across various genres and disciplines.",
    },
    {
      title: "24/7 Accessibility",
      description:
        "Read anytime, anywhere, on any device with our cloud-based platform.",
    },
    {
      title: "User-Friendly Interface",
      description:
        "Easily navigate and search through our intuitive and seamless design.",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-8">
          Why Choose Us
          <div className="w-16 h-1 bg-teal-600 mx-auto mt-2"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 hover:scale-105 transition duration-300"
            >
              <h3 className="text-xl font-bold text-teal-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-base text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
