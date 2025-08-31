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
      color: "text-blue-600",
    },
    {
      label: "Approval Rate",
      value: broker.approval_rate,
      color: "text-green-600",
    },
    {
      label: "Pending",
      value: formatCurrency(broker.pending),
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
