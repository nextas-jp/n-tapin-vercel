"use client";

// import { useSyncExternalStore } from "react"; //TODO: change to this??
import { useState, useEffect } from "react";

export function useCurrentMinute() {
  const [currentMinute, setCurrentMinute] = useState(null); // start as null cuz we don't know the time yet

  useEffect(() => {
    function updateTime() {
      setCurrentMinute(new Date()); // set the time as soon as we're on the client
    }

    updateTime();

    const intervalId = setInterval(updateTime, 1000); // check every second for minute

    return () => clearInterval(intervalId); // cleanup on unmounts
  }, []);

  return currentMinute;
}