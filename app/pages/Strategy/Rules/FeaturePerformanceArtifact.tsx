import { FC } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FeaturePerformance } from './RulesPage';
import { Activity, BarChart2, TrendingUp, AlertCircle } from 'lucide-react';

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
        <div className="bg-white/95 backdrop-blur-sm p-4 border-l-4 border-indigo-500 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
          <p className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            {label}
          </p>
          <div className="space-y-1">
            <p className="text-sm text-gray-600 flex justify-between gap-4">
              Accounts: <span className="font-medium text-indigo-700">{formatNumber(payload[0].payload.accountCount)}</span>
            </p>
            <p className="text-sm text-gray-600 flex justify-between gap-4">
              Fraud Rate: <span className="font-medium text-purple-700">{formatPercentage(payload[0].payload.fraudRate)}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 p-8 bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/30 rounded-2xl shadow-sm">
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <div className="flex items-center gap-3 group">
            <Activity className="w-7 h-7 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              {featureName}
            </h2>
          </div>
          <p className="text-gray-500 capitalize pl-10 text-sm tracking-wide">
            {featureType} Feature Performance Analysis
          </p>
        </div>
        <div className="text-right p-4 bg-white/90 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 hover:bg-gradient-to-br hover:from-white hover:to-indigo-50/50 group">
          <p className="text-sm text-gray-500 group-hover:text-indigo-600 transition-colors duration-300">Overall Fraud Rate</p>
          <p className="text-2xl font-bold text-purple-700 group-hover:text-indigo-700 transition-colors duration-300">
            {formatPercentage(overallFraudRate)}
          </p>
        </div>
      </div>

      {/* Distribution Chart */}
      <CustomCard className="p-8 hover:shadow-xl transition-all duration-500 bg-white/90 hover:bg-white transform hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-8">
          <BarChart2 className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-800">Distribution & Fraud Rate Analysis</h3>
        </div>
        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="accountGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.4}/>
                </linearGradient>
                <linearGradient id="fraudGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.4}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="bucket" 
                label={{ 
                  value: featureType === 'numerical' ? 'Value Range' : 'Categories',
                  position: 'insideBottom',
                  offset: -5,
                  fill: '#4f46e5',
                  fontSize: 12
                }}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="#6366f1"
                label={{ 
                  value: 'Account Distribution',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 10,
                  fill: '#4f46e5',
                  fontSize: 12
                }}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#a855f7"
                tickFormatter={formatPercentage}
                label={{ 
                  value: 'Fraud Rate',
                  angle: 90,
                  position: 'insideRight',
                  offset: 10,
                  fill: '#7c3aed',
                  fontSize: 12
                }}
                tick={{ fill: '#6b7280' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                yAxisId="left" 
                dataKey="accountCount" 
                fill="url(#accountGradient)"
                name="Account Count"
                radius={[8, 8, 0, 0]}
                className="transition-all duration-300 hover:brightness-110"
              />
              <Bar 
                yAxisId="right" 
                dataKey="fraudRate" 
                fill="url(#fraudGradient)"
                name="Fraud Rate"
                radius={[8, 8, 0, 0]}
                className="transition-all duration-300 hover:brightness-110"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CustomCard>

      {/* Detailed Stats */}
      <CustomCard className="p-8 hover:shadow-xl transition-all duration-500 bg-white/90 hover:bg-white transform hover:-translate-y-1">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="w-6 h-6 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-800">Detailed Bucket Analysis</h3>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="text-sm border-b-2 border-indigo-100">
                <th className="text-left py-4 px-6 text-indigo-700">Bucket Range</th>
                <th className="text-right px-6 text-indigo-700">Total Accounts</th>
                <th className="text-right px-6 text-indigo-700">Fraud Cases</th>
                <th className="text-right px-6 text-indigo-700">Fraud Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-50">
              {performance.map((bucket) => (
                <tr key={bucket.bucket} className="hover:bg-indigo-50/40 transition-colors duration-300">
                  <td className="py-4 px-6 font-medium text-indigo-800">{bucket.bucket}</td>
                  <td className="text-right px-6 text-gray-700">{formatNumber(bucket.accountCount)}</td>
                  <td className="text-right px-6 text-purple-700">{formatNumber(bucket.fraudCount)}</td>
                  <td className="text-right px-6 font-medium text-indigo-700">{formatPercentage(bucket.fraudRate)}</td>
                </tr>
              ))}
              <tr className="font-semibold bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                <td className="py-4 px-6 text-indigo-900">Total / Average</td>
                <td className="text-right px-6 text-indigo-900">{formatNumber(totalAccounts)}</td>
                <td className="text-right px-6 text-purple-900">{formatNumber(totalFraud)}</td>
                <td className="text-right px-6 text-indigo-900">{formatPercentage(overallFraudRate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CustomCard>
    </div>
  );
};