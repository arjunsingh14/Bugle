import newspaper from "../../public/newspaper.svg"
const Landing = () => {
  return (
    <div className="mt-10">
      <div className="flex w-full flex-wrap-reverse items-center justify-center">
        <section>
          <h1 className="sm:text-2xl lg:text-3xl">
            Choose your <span className="font-bold">trusted</span> sources
          </h1>
          <div>
            <p className="sm:text-md lg:text-lg mt-1">
              In the age of misinformation it's hard to 
              <br></br>
              establish a baseline for reputable sources.
            </p>
          </div>
          <button className="rounded-full bg-secondary px-5 mt-3 hover:bg-white">Sign up</button>
        </section>
        <figure className="shrink-0 sm:px-5">
          <img src={newspaper} alt="" />
        </figure>
      </div>
    </div>
  );
}

export default Landing