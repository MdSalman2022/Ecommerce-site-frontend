import React, { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const LimitedOffer = () => {
  const { scrolltop } = useContext(AuthContext);

  // countdown hook

  const [countdown, setCountdown] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { days, hours, minutes, seconds } = countdown;

  const startCountdown = () => {
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7); // set the target date to 15 days from now
    targetDate.setHours(23, 59, 59, 999); // set the time to end of the day
    let countDownDate = targetDate.getTime();

    const x = setInterval(function () {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown({ days, hours, minutes, seconds });
      if (distance < 0) {
        clearInterval(x);
        targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 15); // reset the target date to 15 days from now
        targetDate.setHours(23, 59, 59, 999); // set the time to end of the day
        countDownDate = targetDate.getTime();
        startCountdown(); // restart the countdown
      }
    }, 1000);
  };

  React.useEffect(() => {
    startCountdown();
  }, []);

  return (
    <div className="py-5 lg:py-20">
      <div className="container mx-auto rounded-2xl border dark:border-gray-400">
        <div className="card bg-base-100 lg:card-side dark:bg-neutral dark:text-white">
          <figure>
            <LazyLoadImage
              src="https://i.ibb.co/4mC2XsP/macbook.webp"
              alt="Album"
              className="h-full object-cover"
            />
          </figure>
          <div className="card-body flex-col items-center justify-center gap-10 border-l dark:border-gray-400">
            <div className="text-center text-xl font-semibold md:text-3xl">
              Limited Offer on{" "}
              <span className="font-bold text-primary">Laptops</span>{" "}
              <h2 className="text-2xl font-bold text-primary md:text-4xl">
                Upto 60%
              </h2>
            </div>
            <div className="grid auto-cols-max grid-flow-col gap-5 text-center">
              <div className="flex flex-col rounded-box bg-primary p-2 text-base-100">
                <span className="countdown font-mono text-xl md:text-4xl lg:text-5xl">
                  <span style={{ "--value": days }}></span>
                </span>
                days
              </div>
              <div className="flex flex-col rounded-box bg-primary p-2 text-base-100">
                <span className="countdown font-mono text-xl md:text-4xl lg:text-5xl">
                  <span style={{ "--value": hours }}></span>
                </span>
                hours
              </div>
              <div className="flex flex-col rounded-box bg-primary p-2 text-base-100">
                <span className="countdown font-mono text-xl md:text-4xl lg:text-5xl">
                  <span style={{ "--value": minutes }}></span>
                </span>
                min
              </div>
              <div className="flex flex-col rounded-box bg-primary p-2 text-base-100">
                <span className="countdown font-mono text-xl md:text-4xl lg:text-5xl">
                  <span style={{ "--value": seconds }}></span>
                </span>
                sec
              </div>
            </div>
            <Link onClick={scrolltop} to="/laptop">
              <div className="flex justify-center">
                <div className="btn-primary btn w-52 rounded-full text-accent transition-all duration-300 ease-in-out  hover:w-56  ">
                  SEE ALL PRODUCTS &nbsp; <FaArrowRight className="text-xl" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitedOffer;
