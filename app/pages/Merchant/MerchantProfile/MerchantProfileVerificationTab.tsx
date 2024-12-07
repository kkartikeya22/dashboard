import { FC } from 'react';
import { Calendar, Globe, Building2, FileText } from 'lucide-react';
import { InfoItem, DocumentStatus } from './MerchantProfileComponents';
import { merchantData } from './MerchantProfile';

export const VerificationTab: FC = () => (
  <div className="space-y-8 p-6 bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50 rounded-lg shadow-md">
    {/* Onboarding Status */}
    <div className="space-y-4 transition-all duration-300 hover:shadow-lg rounded-lg bg-white/80 p-6">
      <h3 className="text-lg font-semibold text-gray-900 border-b border-blue-100 pb-2 transition-colors duration-300 hover:text-blue-600">
        Onboarding Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem 
          icon={Calendar} 
          label="Onboarding Date" 
          value={new Date(merchantData.basicInfo.onboardingDate).toLocaleDateString()}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50/50"
        />
        <InfoItem 
          icon={Globe} 
          label="Onboarding Platform" 
          value={merchantData.basicInfo.onboardingPlatform}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50/50"
        />
      </div>
    </div>

    {/* KYC Status */}
    <div className="space-y-4 transition-all duration-300 hover:shadow-lg rounded-lg bg-white/80 p-6">
      <h3 className="text-lg font-semibold text-gray-900 border-b border-indigo-100 pb-2 transition-colors duration-300 hover:text-indigo-600">
        KYC Status
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-lg border border-indigo-100 bg-white transition-all duration-300 hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50/30">
          <p className="text-sm font-medium text-indigo-600 mb-2">Overall KYC Status</p>
          <DocumentStatus status={merchantData.basicInfo.kycVerificationStatus} />
          <p className="text-xs text-gray-500 mt-2 transition-colors duration-300 hover:text-indigo-600">
            Verified on: {new Date(merchantData.basicInfo.kycVerificationDate).toLocaleDateString()}
          </p>
        </div>
        {Object.entries(merchantData.compliance.kycStatus).map(([key, status]) => (
          <div key={key} className="p-4 rounded-lg border border-indigo-100 bg-white transition-all duration-300 hover:shadow-md hover:border-indigo-200 hover:bg-indigo-50/30">
            <p className="text-sm font-medium text-indigo-600 mb-2">
              {key.split(/(?=[A-Z])/).join(' ')}
            </p>
            <DocumentStatus status={status} />
          </div>
        ))}
      </div>
    </div>

    {/* Bank Account Verification */}
    <div className="space-y-4 transition-all duration-300 hover:shadow-lg rounded-lg bg-white/80 p-6">
      <h3 className="text-lg font-semibold text-gray-900 border-b border-teal-100 pb-2 transition-colors duration-300 hover:text-teal-600">
        Bank Account Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem 
          icon={Building2} 
          label="Bank Name" 
          value={merchantData.bankDetails.bankName}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-teal-50/50"
        />
        <InfoItem 
          icon={FileText} 
          label="Account Number" 
          value={merchantData.bankDetails.accountNumber}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-teal-50/50"
        />
        <InfoItem 
          icon={FileText} 
          label="IFSC Code" 
          value={merchantData.bankDetails.ifsc}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-teal-50/50"
        />
        <div className="p-4 rounded-lg border border-teal-100 bg-white transition-all duration-300 hover:shadow-md hover:border-teal-200 hover:bg-teal-50/30">
          <p className="text-sm font-medium text-teal-600 mb-2">Verification Status</p>
          <DocumentStatus status={merchantData.bankDetails.verificationStatus} />
          <p className="text-xs text-gray-500 mt-2 transition-colors duration-300 hover:text-teal-600">
            Last verified: {new Date(merchantData.bankDetails.lastVerifiedDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  </div>
);