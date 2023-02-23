import { useState, useEffect } from "react";

function useShowAtThreshold(threshold) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const offset = window.pageYOffset;
      setShow(offset > threshold);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return show;
}

export default useShowAtThreshold;
