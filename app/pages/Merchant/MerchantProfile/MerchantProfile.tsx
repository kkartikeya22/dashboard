import { FC } from 'react';
import { Workspace } from '@/app/layout/Workspace/Workspace';
import { BusinessProfileTab } from './MerchantProfileBusinessTab';
import { VerificationTab } from './MerchantProfileVerificationTab';
import { DocumentsTab } from './MerchantProfileDocumentsTab';

// Mock data - in real app this would come from an API
export const merchantData = {
  basicInfo: {
    legalName: "TechServe Solutions Pvt Ltd",
    tradeName: "TechServe",
    businessType: "Private Limited Company",
    incorporationDate: "2020-03-15",
    industry: "Information Technology",
    description: "Enterprise software solutions and IT consulting services",
    businessCategory: "E-commerce",
    businessSubcategory: "Electronics & Gadgets",
    businessModel: "B2C Retail",
    onboardingDate: "2024-01-15",
    kycVerificationStatus: "completed",
    kycVerificationDate: "2024-01-18",
    onboardingPlatform: "website",
  },
  contact: {
    registeredAddress: "123 Business Park, Sector 5, Bangalore 560001",
    operatingAddress: "Tower A, Tech Hub, Whitefield, Bangalore 560066",
    contactPerson: "Rahul Sharma",
    email: "contact@techserve.com",
    phone: "+91 98765 43210",
    altPhone: "+91 80 4567 8900",
    mobile: "+91 98765 43210",
  },
  onlinePresence: {
    website: "https://techserve.com",
    linkedin: "linkedin.com/company/techserve",
    twitter: "twitter.com/techserve",
    playStore: "play.google.com/store/apps/techserve",
    appStore: "apps.apple.com/in/app/techserve"
  },
  compliance: {
    businessDocs: {
      gst: {
        number: "29ABCDE1234F1Z5",
        status: "active",
        lastFiled: "2024-02-15",
        verificationStatus: "verified"
      },
      pan: {
        number: "ABCDE1234F",
        verificationStatus: "verified"
      },
      cin: {
        number: "U72200KA2020PTC123456",
        verificationStatus: "verified"
      },
      msme: {
        number: "UDYAM-KR-01-0123456",
        verificationStatus: "pending"
      }
    },
    kycStatus: {
      directorKyc: "completed",
      addressVerification: "completed",
      bankAccountVerification: "completed"
    },
    complianceMetrics: {
      gstFilingStatus: "up_to_date",
      taxComplianceRating: "A",
      regulatoryStatus: "compliant"
    },
    documents: [
      {
        type: "Certificate of Incorporation",
        status: "verified",
        uploadDate: "2024-01-15",
        expiryDate: null
      },
      {
        type: "Board Resolution",
        status: "verified",
        uploadDate: "2024-01-15",
        expiryDate: "2025-01-15"
      },
      {
        type: "Business License",
        status: "pending",
        uploadDate: "2024-03-01",
        expiryDate: "2025-03-01"
      }
    ]
  },
  financial: {
    processingMetrics: {
      monthlyVolume: "₹45,00,000",
      averageTicketSize: "₹2,500",
      successRate: "97.5%",
      refundRate: "1.2%",
      chargebackRate: "0.3%",
      disputeRate: "0.5%"
    },
    settlementDetails: {
      bankAccount: {
        accountNumber: "XXXXXXXX1234",
        ifsc: "HDFC0001234",
        bankName: "HDFC Bank",
        accountType: "Current"
      },
      settlementCycle: "T+2",
      rollingReserve: "5%",
      currentBalance: "₹2,50,000"
    },
    revenueMetrics: {
      monthlyTrend: [
        { month: "Jan", revenue: "42,00,000" },
        { month: "Feb", revenue: "38,00,000" },
        { month: "Mar", revenue: "45,00,000" }
      ],
      peakHours: "2PM - 6PM",
      seasonalPeaks: "Oct-Dec"
    },
    riskMetrics: {
      overallRiskScore: 82,
      riskIndicators: [
        {
          type: "High-Value Transactions",
          frequency: "Medium",
          severity: "High",
          status: "monitoring"
        },
        {
          type: "Cross-Border Payments",
          frequency: "Low",
          severity: "Medium",
          status: "flagged"
        }
      ]
    }
  },
  bankDetails: {
    accountNumber: "XXXXXXXX1234",
    ifsc: "HDFC0001234",
    bankName: "HDFC Bank",
    accountType: "Current",
    verificationStatus: "verified",
    lastVerifiedDate: "2024-01-17",
  },
  identityProof: {
    type: "Digilocker",
    verificationStatus: "verified",
    documents: [
      {
        type: "PAN Card",
        number: "ABCDE1234F",
        verificationStatus: "verified",
        uploadDate: "2024-01-15"
      },
      {
        type: "Aadhaar Card",
        number: "XXXX-XXXX-1234",
        verificationStatus: "verified",
        uploadDate: "2024-01-15"
      }
    ]
  },
}; 

const MerchantProfile: FC = () => {
  const tabs = [
    {
      id: 'basic',
      label: 'Business Profile',
      content: <BusinessProfileTab />
    },
    {
      id: 'verification',
      label: 'Verification Status',
      content: <VerificationTab />
    },
    {
      id: 'documents',
      label: 'Documents',
      content: <DocumentsTab />
    },
  ];

  return <Workspace tabs={tabs} />;
};

export default MerchantProfile;
