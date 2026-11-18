import React from 'react';

interface JsonLdProps {
  data:
    | Record<string, unknown>
    | Array<Record<string, unknown> | null | undefined>
    | null
    | undefined;
}

/**
 * Server-rendered JSON-LD script component with zero client runtime overhead.
 * Safely encodes angular brackets to prevent script injection issues.
 */
export default function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;

  // Filter out nullish elements if an array was passed
  const cleanData = Array.isArray(data)
    ? data.filter((item): item is Record<string, unknown> => item !== null && item !== undefined)
    : data;

  if (Array.isArray(cleanData) && cleanData.length === 0) return null;

  const jsonString = JSON.stringify(cleanData).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}
