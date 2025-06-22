interface ThreatMetricsProps {
  metrics: {
    threatsBlocked: number;
    incidentsResolved: number;
    systemsMonitored: number;
    uptimePercentage: number;
    vulnerabilitiesPatched: number;
    securityAudits: number;
  };
}

export function ThreatMetrics({ metrics }: ThreatMetricsProps) {
  const metricCards = [
    {
      title: "THREATS BLOCKED",
      value: metrics.threatsBlocked.toLocaleString(),
      icon: "🛡️",
      color: "text-red-400",
      bgColor: "border-red-500/30",
    },
    {
      title: "INCIDENTS RESOLVED",
      value: metrics.incidentsResolved.toString(),
      icon: "🔧",
      color: "text-yellow-400",
      bgColor: "border-yellow-500/30",
    },
    {
      title: "SYSTEMS MONITORED",
      value: metrics.systemsMonitored.toString(),
      icon: "📊",
      color: "text-blue-400",
      bgColor: "border-blue-500/30",
    },
    {
      title: "UPTIME",
      value: `${metrics.uptimePercentage}%`,
      icon: "⚡",
      color: "text-green-400",
      bgColor: "border-green-500/30",
    },
    {
      title: "VULNERABILITIES PATCHED",
      value: metrics.vulnerabilitiesPatched.toString(),
      icon: "🔒",
      color: "text-purple-400",
      bgColor: "border-purple-500/30",
    },
    {
      title: "SECURITY AUDITS",
      value: metrics.securityAudits.toString(),
      icon: "📋",
      color: "text-orange-400",
      bgColor: "border-orange-500/30",
    },
  ];

  return (
    <div className="bg-gray-900 border border-green-500/30 rounded-lg p-6">
      <h2 className="text-xl text-green-400 mb-6 flex items-center">
        <span className="mr-2">📈</span>
        SECURITY ANALYTICS DASHBOARD
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricCards.map((metric, index) => (
          <div
            key={index}
            className={`bg-black border ${metric.bgColor} rounded-lg p-4 hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{metric.icon}</span>
              <div className={`text-2xl font-bold ${metric.color}`}>
                {metric.value}
              </div>
            </div>
            <div className="text-gray-400 text-sm font-semibold">
              {metric.title}
            </div>
            <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
              <div 
                className={`h-1 rounded-full ${metric.color.replace('text-', 'bg-')} animate-pulse`}
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
