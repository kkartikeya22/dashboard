import { FC } from 'react';
import { Calendar, Globe, Building2, FileText } from 'lucide-react';
import { InfoItem, DocumentStatus } from './MerchantProfileComponents';
import { merchantData } from './MerchantProfile';

export const VerificationTab: FC = () => (
  <div className="space-y-6">
    {/* Onboarding Status */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Onboarding Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem 
          icon={Calendar} 
          label="Onboarding Date" 
          value={new Date(merchantData.basicInfo.onboardingDate).toLocaleDateString()} 
        />
        <InfoItem 
          icon={Globe} 
          label="Onboarding Platform" 
          value={merchantData.basicInfo.onboardingPlatform} 
        />
      </div>
    </div>

    {/* KYC Status */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">KYC Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-500 mb-2">Overall KYC Status</p>
          <DocumentStatus status={merchantData.basicInfo.kycVerificationStatus} />
          <p className="text-xs text-gray-500 mt-1">
            Verified on: {new Date(merchantData.basicInfo.kycVerificationDate).toLocaleDateString()}
          </p>
        </div>
        {Object.entries(merchantData.compliance.kycStatus).map(([key, status]) => (
          <div key={key} className="p-4 rounded-lg border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">
              {key.split(/(?=[A-Z])/).join(' ')}
            </p>
            <DocumentStatus status={status} />
          </div>
        ))}
      </div>
    </div>

    {/* Bank Account Verification */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Bank Account Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem 
          icon={Building2} 
          label="Bank Name" 
          value={merchantData.bankDetails.bankName} 
        />
        <InfoItem 
          icon={FileText} 
          label="Account Number" 
          value={merchantData.bankDetails.accountNumber} 
        />
        <InfoItem 
          icon={FileText} 
          label="IFSC Code" 
          value={merchantData.bankDetails.ifsc} 
        />
        <div className="p-4 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-500 mb-2">Verification Status</p>
          <DocumentStatus status={merchantData.bankDetails.verificationStatus} />
          <p className="text-xs text-gray-500 mt-1">
            Last verified: {new Date(merchantData.bankDetails.lastVerifiedDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  </div>
); 