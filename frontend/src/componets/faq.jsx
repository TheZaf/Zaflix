const Faq = () => {
  return (
    <section className=" py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-24">
        <div className="mb-16">
          <h2 className="text-4xl font-manrope text-center font-bold text-white leading-[3.25rem]">
            Frequently asked questions
          </h2>
        </div>
        <div className="space-y-4 ">

          {/* FAQ Item 1 */}
          <details className="bg-zinc-800 p-4 group lg:p-4 open:bg-zinc-800 ">
            <summary className="flex items-center justify-between text-left text-lg font-normal leading-8 text-white cursor-pointer  open:font-medium open:text-indigo-600">
              <h5 className=" text-2xl">What is Zaflix?</h5>
               <span className="text-2xl font-bold text-white">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:block">−</span>
              </span>
            </summary>
            <div className="w-full overflow-hidden pr-4" style={{ maxHeight: "250px" }}>
              <p className="text-base text-white font-normal leading-6 mt-2">
                Zaflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, 
                documentaries and more – on thousands of internet-connected devices.
                You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price.
                 There's always something new to discover, and new TV shows and movies are added every week!
              </p>
            </div>
          </details>

          {/* FAQ Item 2 */}
          <details className="bg-zinc-800 p-4 group mb-8 lg:p-4 open:bg-zinc-800 ">
            <summary className="flex items-center justify-between text-left text-lg font-normal leading-8 text-white cursor-pointer">
              <h5 className=" text-2xl">How much does Zaflix cost?</h5>
               <span className="text-2xl font-bold text-white">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:block">−</span>
              </span>
            </summary>
            <div className="w-full overflow-hidden pr-4">
              <p className="text-base text-white font-normal leading-6 mt-2">
                Watch Zaflix on your smartphone, tablet, Smart TV, laptop, or streaming device, 
                all for one fixed monthly fee. Plans range from ₹149 to ₹649/month.
              </p>
            </div>
          </details>

          {/* FAQ Item 3 */}
          <details className="bg-zinc-800 p-4 group mb-8 lg:p-4 open:bg-zinc-800 ">
            <summary className="flex items-center justify-between text-left text-lg font-normal leading-8 text-white cursor-pointer">
              <h5 className=" text-2xl" >What can I Watch on Zaflix?</h5>
              <span className="text-2xl font-bold text-white">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:block">−</span>
              </span>
            </summary>
            <div className="w-full overflow-hidden pr-4">
              <p className="text-base text-white font-normal leading-6 mt-2">
                Zaflix has an extensive library of feature films, documentaries, shows,
                 anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.
              </p>
            </div>
          </details>

          {/* FAQ Item 4 */}
          <details className="bg-zinc-800 p-4 group mb-8 lg:p-4 open:bg-zinc-800 ">
            <summary className="flex items-center justify-between text-left text-lg font-normal leading-8 text-white cursor-pointer">
              <h5 className=" text-2xl">How do I Cancel?</h5>
              <span className="text-2xl font-bold text-white">
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:block">−</span>
              </span>
            </summary>
            <div className="w-full overflow-hidden pr-4">
              <p className="text-base text-white font-normal leading-6 mt-2">
                Netflix is flexible. You can easily cancel your account online in two clicks.
                 There are no cancellation fees – start or stop your account anytime.
              </p>
            </div>
          </details>

        </div>
      </div>
    </section>
  );
};

export default Faq;