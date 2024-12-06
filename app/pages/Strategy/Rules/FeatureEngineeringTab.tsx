import { FC, useState } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { useWorkspace } from '@/app/layout/Workspace/WorkspaceContext';
import { CustomSelect } from '@/components/custom/CustomSelect';
import { Button } from '@/components/custom/CustomButton';
import { CustomInput } from '@/components/custom/CustomInput';
import { Editor } from '@/components/custom/CustomEditor';
import { Play, Code2, BarChart2, Database } from 'lucide-react';
import { FeaturePerformance } from './RulesPage';
import { FeaturePerformanceArtifact } from './FeaturePerformanceArtifact';

type FeatureType = 'numerical' | 'categorical';
type Language = 'python' | 'sql';

const samplePythonCode = `# Example: Calculate days since last transaction
def calculate_days_since_last_txn(df):
    df['last_txn_date'] = pd.to_datetime(df['txn_date'])
    df['current_date'] = pd.Timestamp.now()
    df['days_since_last_txn'] = (
        df['current_date'] - df['last_txn_date']
    ).dt.days
    return df['days_since_last_txn']`;

const sampleSqlCode = `-- Example: Calculate transaction amount percentile
WITH txn_stats AS (
  SELECT 
    merchant_id,
    amount,
    PERCENT_RANK() OVER (
      PARTITION BY merchant_category 
      ORDER BY amount
    ) as amt_percentile
  FROM transactions
  WHERE date >= DATEADD(day, -30, GETDATE())
)
SELECT 
  merchant_id,
  MAX(amt_percentile) as max_amt_percentile
FROM txn_stats
GROUP BY merchant_id`;

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
    { bucket: '0-10', accountCount: 1200, fraudCount: 24, fraudRate: 0.02 },
    { bucket: '10-20', accountCount: 2300, fraudCount: 69, fraudRate: 0.03 },
    { bucket: '20-30', accountCount: 3100, fraudCount: 155, fraudRate: 0.05 },
    { bucket: '30-40', accountCount: 2800, fraudCount: 224, fraudRate: 0.08 },
    { bucket: '40-50', accountCount: 1900, fraudCount: 209, fraudRate: 0.11 },
    { bucket: '50+', accountCount: 1100, fraudCount: 187, fraudRate: 0.17 },
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
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-4">
        <div className="grid gap-4 max-w-2xl">
          <div className="flex gap-4">
            <CustomSelect
              value={language}
              onValueChange={(value) => handleLanguageChange(value as Language)}
              options={[
                { label: 'Python', value: 'python' },
                { label: 'SQL', value: 'sql' }
              ]}
              size="sm"
            />
            <CustomSelect
              value={featureType}
              onValueChange={(value) => setFeatureType(value as FeatureType)}
              options={[
                { label: 'Numerical', value: 'numerical' },
                { label: 'Categorical', value: 'categorical' }
              ]}
              size="sm"
            />
          </div>
          
          <CustomInput
            label="Feature Name"
            value={featureName}
            onChange={(e) => setFeatureName(e.target.value)}
          />
          
          <div className="overflow-x-auto">
            <Editor
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              className="min-h-[300px] w-full"
            />
          </div>
          
          <Button onClick={handleAnalyzeFeature}>
            Analyze Feature
          </Button>
        </div>
      </div>
    </div>
  );
};