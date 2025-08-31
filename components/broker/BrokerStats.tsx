import { BrokerInfo } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface BrokerStatsProps {
  broker: BrokerInfo;
}

export function BrokerStats({ broker }: BrokerStatsProps) {
  const stats = [
    {
      label: "Deals",
      value: formatNumber(broker.deals),
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Approval Rate",
      value: broker.approval_rate,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Pending",
      value: formatCurrency(broker.pending),
      color: "text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
