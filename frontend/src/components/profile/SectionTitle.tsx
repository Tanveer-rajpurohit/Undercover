import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-xl font-extrabold tracking-wide text-black">
      {children}
    </h2>
  );
}

