"use client";

import { useState } from "react";

/**
 * Holds a preview URL for a picked file.
 * //TODO: Add a useCallback for perf?? (check prototype)
 * @returns 
 */
export function useObjectUrl() {
  const [url, setUrl] = useState(null);

  function setFile(file) {
    if (url) {
      URL.revokeObjectURL(url); //cleanup
    }

    setUrl(file ? URL.createObjectURL(file) : null);
  }

  return [url, setFile];
}