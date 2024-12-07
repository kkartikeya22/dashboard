import { FC } from 'react';
import { CustomCard } from '@/components/custom/CustomCard';
import { Globe, Star, MessageSquare, Newspaper, Twitter, Linkedin, Store, AlertTriangle } from 'lucide-react';

interface WebsiteMetricProps {
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

interface WebsiteMetrics {
  domain: string;
  age: string;
  traffic: {
    monthly: string;
    trend: {
      value: string;
      isPositive: boolean;
    };
  };
  trustScore: string;
  securityStatus: string;
  lastUpdated: string;
}

interface ReviewSourceData {
  platform: string;
  icon: React.ReactNode;
  rating: number;
  totalReviews: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

interface SocialPlatform {
  platform: string;
  icon: React.ReactNode;
  metrics: Array<{
    label: string;
    value: string;
  }>;
}

interface RecentMention {
  source: string;
  title: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  snippet: string;
}

const WebsiteMetric: FC<WebsiteMetricProps> = ({ label, value, trend }) => (
  <div className="transition-all duration-300 hover:scale-105 p-4 rounded-lg bg-gradient-to-br from-white to-blue-50">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-xl font-semibold text-gray-800">{value}</p>
    {trend && (
      <p className={`text-xs ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend.value}
      </p>
    )}
  </div>
);

const ReviewSource: FC<ReviewSourceData> = ({ platform, icon, rating, totalReviews, sentiment }) => (
  <CustomCard className="p-4 space-y-3 transition-all duration-300 hover:shadow-lg hover:border-blue-200 bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="transition-transform duration-200 hover:scale-110">
          {icon}
        </div>
        <span className="font-medium text-gray-800">{platform}</span>
      </div>
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 text-amber-400 fill-current" />
        <span className="font-medium text-gray-800">{rating.toFixed(1)}</span>
        <span className="text-sm text-gray-500">({totalReviews})</span>
      </div>
    </div>
    <div className="space-y-2">
      <div className="flex gap-2 text-sm">
        <span className="text-emerald-600">{sentiment.positive}% Positive</span>
        <span className="text-slate-600">{sentiment.neutral}% Neutral</span>
        <span className="text-rose-600">{sentiment.negative}% Negative</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex transition-all duration-300">
        <div className="bg-emerald-500 h-full transition-all duration-500 ease-in-out" style={{ width: `${sentiment.positive}%` }} />
        <div className="bg-slate-300 h-full transition-all duration-500 ease-in-out" style={{ width: `${sentiment.neutral}%` }} />
        <div className="bg-rose-500 h-full transition-all duration-500 ease-in-out" style={{ width: `${sentiment.negative}%` }} />
      </div>
    </div>
  </CustomCard>
);

export const DigitalFootprintTab: FC = () => {
  const websiteMetrics: WebsiteMetrics = {
    domain: 'techserve.com',
    age: '3 years',
    traffic: {
      monthly: '45K',
      trend: { value: '+12% vs last month', isPositive: true }
    },
    trustScore: '85/100',
    securityStatus: 'Valid SSL',
    lastUpdated: '2 days ago'
  };

  const reviewSources: ReviewSourceData[] = [
    {
      platform: 'Google Reviews',
      icon: <Globe className="h-5 w-5 text-blue-500" />,
      rating: 4.2,
      totalReviews: 128,
      sentiment: { positive: 75, neutral: 15, negative: 10 }
    },
    {
      platform: 'Play Store',
      icon: <Store className="h-5 w-5 text-green-500" />,
      rating: 3.8,
      totalReviews: 1250,
      sentiment: { positive: 65, neutral: 20, negative: 15 }
    }
  ];

  const socialPresence: SocialPlatform[] = [
    {
      platform: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5 text-blue-600" />,
      metrics: [
        { label: 'Followers', value: '2.5K' },
        { label: 'Posts/Month', value: '15' },
        { label: 'Engagement Rate', value: '3.2%' }
      ]
    },
    {
      platform: 'Twitter',
      icon: <Twitter className="h-5 w-5 text-blue-400" />,
      metrics: [
        { label: 'Followers', value: '1.8K' },
        { label: 'Tweets/Month', value: '25' },
        { label: 'Engagement Rate', value: '2.1%' }
      ]
    }
  ];

  const recentMentions: RecentMention[] = [
    {
      source: 'Tech News Blog',
      title: 'Top 10 Emerging FinTech Solutions',
      date: '2024-03-10',
      sentiment: 'positive',
      snippet: "TechServe's innovative approach to digital payments..."
    },
    {
      source: 'Industry Forum',
      title: 'Payment Processing Challenges',
      date: '2024-03-05',
      sentiment: 'neutral',
      snippet: 'Companies like TechServe are addressing integration issues...'
    }
  ];

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Website Analysis */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Website Analysis</h3>
        <CustomCard className="p-4 transition-all duration-300 hover:shadow-lg hover:border-blue-200 bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-blue-500 transition-transform duration-200 hover:scale-110" />
            <span className="font-medium text-gray-800">{websiteMetrics.domain}</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <WebsiteMetric label="Domain Age" value={websiteMetrics.age} />
            <WebsiteMetric 
              label="Monthly Traffic" 
              value={websiteMetrics.traffic.monthly} 
              trend={websiteMetrics.traffic.trend}
            />
            <WebsiteMetric label="Trust Score" value={websiteMetrics.trustScore} />
            <WebsiteMetric label="Security" value={websiteMetrics.securityStatus} />
          </div>
        </CustomCard>
      </div>

      {/* Reviews & Ratings */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Reviews & Ratings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviewSources.map((source, index) => (
            <ReviewSource key={index} {...source} />
          ))}
        </div>
      </div>

      {/* Social Media Presence */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Social Media Presence</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialPresence.map((platform, index) => (
            <CustomCard key={index} className="p-4 transition-all duration-300 hover:shadow-lg hover:border-blue-200 bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50">
              <div className="flex items-center gap-2 mb-3">
                <div className="transition-transform duration-200 hover:scale-110">
                  {platform.icon}
                </div>
                <span className="font-medium text-gray-800">{platform.platform}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {platform.metrics.map((metric, idx) => (
                  <div key={idx} className="transition-all duration-300 hover:scale-105 p-2 rounded-lg bg-white/50">
                    <p className="text-sm text-gray-500">{metric.label}</p>
                    <p className="font-medium text-gray-800">{metric.value}</p>
                  </div>
                ))}
              </div>
            </CustomCard>
          ))}
        </div>
      </div>

      {/* Recent Mentions */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Recent Mentions</h3>
        <CustomCard className="divide-y divide-gray-100 bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50">
          {recentMentions.map((mention, index) => (
            <div key={index} className="p-4 transition-all duration-300 hover:bg-blue-50/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4 text-blue-400 transition-transform duration-200 hover:scale-110" />
                  <span className="font-medium text-gray-800">{mention.source}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(mention.date).toLocaleDateString()}
                </span>
              </div>
              <p className="font-medium mb-1 text-gray-800">{mention.title}</p>
              <p className="text-sm text-gray-600">{mention.snippet}</p>
              <div className="flex items-center gap-1 mt-2">
                <div className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  mention.sentiment === 'positive' ? 'bg-emerald-500' :
                  mention.sentiment === 'negative' ? 'bg-rose-500' :
                  'bg-amber-500'
                }`} />
                <span className="text-xs text-gray-500 capitalize">
                  {mention.sentiment} Mention
                </span>
              </div>
            </div>
          ))}
        </CustomCard>
      </div>
    </div>
  );
};