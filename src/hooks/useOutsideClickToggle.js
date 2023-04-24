// React / router
import { useEffect, useRef, useState } from "react";

// Custom hook to toggle a component's state based on clicks outside of it
const useOutsideClickToggle = () => {
  // Track the expanded state of the navbar menu
  const [expanded, setExpanded] = useState(false);
  // Create a reference to the burger icon
  const ref = useRef(null);
  // Add event listener to document and clean up when component unmounts
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    // Add event handler to check when the user clicks away from the burger menu
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useOutsideClickToggle;
