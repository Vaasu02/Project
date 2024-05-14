import React from 'react'

const Hero = () => {
  return (
    <>
    <section className="bg-gray-900 text-white">
  <div className="mx-auto max-w-screen-xl min-h-screen px-4 py-32 ">
    <div className="mx-auto max-w-3xl mt-9 text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-6xl font-extrabold text-transparent sm:text-5xl"
      >
        Empower your thoughts

        <span className="sm:block"> capture your ideas. </span>
      </h1>

      <p className="mx-auto sm:mt-4 mt-16 max-w-xl text-2xl sm:text-xl/relaxed">
      Get started today and transform the way you take notes with our intuitive and versatile platform.
      </p>

      <div className="sm:mt-8 mt-16 flex sm:flex-wrap justify-center gap-4">
        <a
          className="block w-[40rem] rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="/login"
        >
          Go to DashBoard
        </a>

        
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Hero