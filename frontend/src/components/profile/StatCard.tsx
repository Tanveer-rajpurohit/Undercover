
interface StatCardProps {
  value: string | number;
  label: string;
  bgColor: string;
}

export function StatCard({ value, label, bgColor }: StatCardProps) {
  return (
    <div className={`${bgColor} rounded-2xl p-4 flex flex-col items-center justify-center min-h-[100px]`}>
      <span className="text-4xl font-semibold text-white">{value}</span>
      <span className="text-sm text-white text-center mt-1">{label}</span>
    </div>
  );
}

