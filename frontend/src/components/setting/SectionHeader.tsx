interface SectionHeaderProps {
    title: string;
  }
  
  export function SectionHeader({ title }: SectionHeaderProps) {
    return (
      <h2 className="text-2xl font-bold px-4 py-3">
        {title}
      </h2>
    );
  }
  
  