import { FC, useState } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';
import { CustomSelect } from '@/components/custom/CustomSelect';
import { Button } from '@/components/custom/CustomButton';
import { CustomInput } from '@/components/custom/CustomInput';
import { Editor } from '@/components/custom/CustomEditor';
import { Play, Code2, BarChart2, Database, Wand2, Sparkles } from 'lucide-react';
import { FeaturePerformance } from './RulesPage';
import { FeaturePerformanceArtifact } from './FeaturePerformanceArtifact';

type FeatureType = 'numerical' | 'categorical';
type Language = 'python' | 'sql';

const samplePythonCode = `# Calculate risk score based on transaction patterns
def calculate_risk_score(df):
    # Convert transaction dates to datetime
    df['txn_date'] = pd.to_datetime(df['txn_date'])
    
    # Calculate transaction velocity
    df['txn_velocity'] = df.groupby('user_id')['txn_date'].transform(
        lambda x: x.diff().dt.total_seconds().fillna(0)
    )
    
    # Calculate amount percentiles
    df['amount_percentile'] = df.groupby('merchant_category')['amount'].transform(
        lambda x: pd.qcut(x, q=100, labels=False, duplicates='drop')
    )
    
    # Generate risk score
    df['risk_score'] = (
        0.4 * (df['txn_velocity'] < 300).astype(int) +
        0.3 * (df['amount_percentile'] > 90).astype(int) +
        0.3 * (df['failed_auth_count'] > 2).astype(int)
    )
    
    return df['risk_score']`;

const sampleSqlCode = `-- Calculate merchant risk indicators
WITH merchant_metrics AS (
  SELECT 
    merchant_id,
    COUNT(DISTINCT user_id) as unique_users,
    AVG(amount) as avg_txn_amount,
    STDDEV(amount) as txn_amount_std,
    COUNT(CASE WHEN status = 'declined' THEN 1 END) * 100.0 / 
      NULLIF(COUNT(*), 0) as decline_rate,
    COUNT(CASE WHEN is_foreign_card = 1 THEN 1 END) * 100.0 / 
      NULLIF(COUNT(*), 0) as foreign_card_rate
  FROM transactions 
  WHERE transaction_date >= DATEADD(month, -3, GETDATE())
  GROUP BY merchant_id
)
SELECT
  m.*,
  CASE 
    WHEN decline_rate > 15 AND foreign_card_rate > 40 THEN 'High'
    WHEN decline_rate > 10 OR foreign_card_rate > 25 THEN 'Medium'
    ELSE 'Low'
  END as risk_category
FROM merchant_metrics m`;

export const FeatureEngineeringTab: FC = () => {
  const { setArtifact } = useWorkspace();
  const [language, setLanguage] = useState<Language>('python');
  const [featureType, setFeatureType] = useState<FeatureType>('numerical');
  const [featureName, setFeatureName] = useState('');
  const [code, setCode] = useState(language === 'python' ? samplePythonCode : sampleSqlCode);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setCode(newLanguage === 'python' ? samplePythonCode : sampleSqlCode);
  };

  const generateSamplePerformanceData = (): FeaturePerformance[] => [
    { bucket: '0-20', accountCount: 15243, fraudCount: 152, fraudRate: 0.010 },
    { bucket: '20-40', accountCount: 28391, fraudCount: 426, fraudRate: 0.015 },
    { bucket: '40-60', accountCount: 31052, fraudCount: 776, fraudRate: 0.025 },
    { bucket: '60-80', accountCount: 25634, fraudCount: 1025, fraudRate: 0.040 },
    { bucket: '80-90', accountCount: 12845, fraudCount: 771, fraudRate: 0.060 },
    { bucket: '90-95', accountCount: 6422, fraudCount: 514, fraudRate: 0.080 },
    { bucket: '95-99', accountCount: 5137, fraudCount: 565, fraudRate: 0.110 },
    { bucket: '99-100', accountCount: 1284, fraudCount: 218, fraudRate: 0.170 },
  ];

  const handleAnalyzeFeature = () => {
    const performanceData = generateSamplePerformanceData();
    
    setArtifact({
      id: 'feature-performance',
      title: `Feature Analysis: ${featureName}`,
      renderArtifact: () => (
        <FeaturePerformanceArtifact
          featureName={featureName}
          featureType={featureType}
          performance={performanceData}
        />
      )
    });
  };

  return (
    <div className="w-full max-w-full overflow-hidden p-6 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30">
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Wand2 className="w-6 h-6 text-indigo-600 animate-pulse" />
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Feature Engineering Studio
          </h2>
        </div>

        <div className="grid gap-6 max-w-3xl bg-white/50 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/60">
          <div className="flex gap-4">
            <CustomSelect
              value={language}
              onValueChange={(value) => handleLanguageChange(value as Language)}
              options={[
                { label: 'Python', value: 'python' },
                { label: 'SQL', value: 'sql' }
              ]}
              className="transition-all duration-300 hover:ring-2 hover:ring-indigo-200"
              size="sm"
            />
            <CustomSelect
              value={featureType}
              onValueChange={(value) => setFeatureType(value as FeatureType)}
              options={[
                { label: 'Numerical', value: 'numerical' },
                { label: 'Categorical', value: 'categorical' }
              ]}
              className="transition-all duration-300 hover:ring-2 hover:ring-purple-200"
              size="sm"
            />
          </div>
          
          <CustomInput
            label="Feature Name"
            value={featureName}
            onChange={(e) => setFeatureName(e.target.value)}
            className="transition-all duration-300 hover:ring-2 hover:ring-blue-200"
          />
          
          <div className="overflow-hidden rounded-lg border border-indigo-100 transition-all duration-300 hover:border-indigo-300 hover:shadow-md">
            <Editor
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              className="min-h-[400px] w-full"
            />
          </div>
          
          <Button 
            onClick={handleAnalyzeFeature}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Analyze Feature</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};