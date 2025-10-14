const MDD = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-extrabold text-white mb-8 animate-fade-in filter drop-shadow-2xl">
          An MDD
        </h1>
        
        {/* Sub heading */}
        <p className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-200 mb-12 animate-fade-in-delay">
          production
        </p>

        {/* Decorative line */}
        <div className="w-24 md:w-32 lg:w-40 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-8 rounded-full animate-pulse"></div>

        {/* Additional text */}
        <p className="text-sm md:text-base lg:text-lg text-gray-400 max-w-md mx-auto leading-relaxed animate-fade-in-delay-2">
          Crafted with passion, built with precision, designed for excellence.
        </p>

        {/* Contact Information */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-delay-2">
          {/* Email */}
          <a 
            href="mailto:neutral520@gmail.com" 
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="text-sm">neutral520@gmail.com</span>
          </a>

          {/* Phone */}
          <a 
            href="tel:+233559054207" 
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="text-sm">(+233) 55 905 4207</span>
          </a>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/markdrah/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float-${i % 3 + 1}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Bottom signature */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 text-xs md:text-sm">
        © 2025 MDD Productions
      </div>

      {/* Custom styles are handled via Tailwind CSS classes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes floatOne {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
            }
          }

          @keyframes floatTwo {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-30px) rotate(270deg);
            }
          }

          @keyframes floatThree {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-25px) rotate(90deg);
            }
          }

          .animate-fade-in {
            animation: fadeInUp 1s ease-out;
          }

          .animate-fade-in-delay {
            animation: fadeInUp 1s ease-out 0.3s both;
          }

          .animate-fade-in-delay-2 {
            animation: fadeInUp 1s ease-out 0.6s both;
          }

          .animate-float-1 {
            animation: floatOne 6s ease-in-out infinite;
          }

          .animate-float-2 {
            animation: floatTwo 8s ease-in-out infinite;
          }

          .animate-float-3 {
            animation: floatThree 7s ease-in-out infinite;
          }

          .animation-delay-2000 {
            animation-delay: 2s;
          }

          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `
      }} />
    </div>
  );
};

export default MDD;
