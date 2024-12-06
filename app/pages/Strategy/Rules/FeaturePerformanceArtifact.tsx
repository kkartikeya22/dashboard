import { FC } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FeaturePerformance } from './RulesPage';

interface FeaturePerformanceArtifactProps {
  featureName: string;
  featureType: 'numerical' | 'categorical';
  performance: FeaturePerformance[];
}

export const FeaturePerformanceArtifact: FC<FeaturePerformanceArtifactProps> = ({
  featureName,
  featureType,
  performance
}) => {
  const totalAccounts = performance.reduce((sum, p) => sum + p.accountCount, 0);
  const totalFraud = performance.reduce((sum, p) => sum + p.fraudCount, 0);
  const overallFraudRate = totalFraud / totalAccounts;

  const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}%`;
  const formatNumber = (value: number) => value.toLocaleString();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-gray-600">
            Accounts: {formatNumber(payload[0].payload.accountCount)}
          </p>
          <p className="text-sm text-gray-600">
            Fraud Rate: {formatPercentage(payload[0].payload.fraudRate)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{featureName}</h2>
          <p className="text-gray-500 capitalize">{featureType} Feature Analysis</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Overall Fraud Rate</p>
          <p className="text-xl font-semibold">{formatPercentage(overallFraudRate)}</p>
        </div>
      </div>

      {/* Distribution Chart */}
      <CustomCard className="p-4">
        <h3 className="font-semibold mb-4">Distribution & Fraud Rate</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="bucket" 
                label={{ 
                  value: featureType === 'numerical' ? 'Value Range' : 'Categories',
                  position: 'insideBottom',
                  offset: -5 
                }} 
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="#82ca9d"
                label={{ 
                  value: 'Account Count',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 10
                }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#8884d8"
                tickFormatter={formatPercentage}
                label={{ 
                  value: 'Fraud Rate',
                  angle: 90,
                  position: 'insideRight',
                  offset: 10
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                yAxisId="left" 
                dataKey="accountCount" 
                fill="#82ca9d" 
                name="Account Count"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="right" 
                dataKey="fraudRate" 
                fill="#8884d8" 
                name="Fraud Rate"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CustomCard>

      {/* Detailed Stats */}
      <CustomCard className="p-4">
        <h3 className="font-semibold mb-4">Bucket Analysis</h3>
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="text-left py-2">Bucket</th>
              <th className="text-right">Accounts</th>
              <th className="text-right">Fraud Cases</th>
              <th className="text-right">Fraud Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {performance.map((bucket) => (
              <tr key={bucket.bucket}>
                <td className="py-2">{bucket.bucket}</td>
                <td className="text-right">{formatNumber(bucket.accountCount)}</td>
                <td className="text-right">{formatNumber(bucket.fraudCount)}</td>
                <td className="text-right">{formatPercentage(bucket.fraudRate)}</td>
              </tr>
            ))}
            <tr className="font-medium">
              <td className="py-2">Total</td>
              <td className="text-right">{formatNumber(totalAccounts)}</td>
              <td className="text-right">{formatNumber(totalFraud)}</td>
              <td className="text-right">{formatPercentage(overallFraudRate)}</td>
            </tr>
          </tbody>
        </table>
      </CustomCard>
    </div>
  );
}; 