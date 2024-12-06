import { FC } from 'react';
import { Building2, Store, Briefcase, Calendar, Globe, MapPin, Mail, Phone } from 'lucide-react';
import { InfoItem } from './MerchantProfileComponents';
import { merchantData } from './MerchantProfile';

export const BusinessProfileTab: FC = () => (
  <div className="space-y-6">
    {/* Business Information */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem 
          icon={Building2} 
          label="Legal Business Name" 
          value={merchantData.basicInfo.legalName} 
        />
        <InfoItem 
          icon={Store} 
          label="Trade Name" 
          value={merchantData.basicInfo.tradeName} 
        />
        <InfoItem 
          icon={Briefcase} 
          label="Business Type" 
          value={merchantData.basicInfo.businessType} 
        />
        <InfoItem 
          icon={Store} 
          label="Business Category" 
          value={`${merchantData.basicInfo.businessCategory} / ${merchantData.basicInfo.businessSubcategory}`} 
        />
        <InfoItem 
          icon={Briefcase} 
          label="Business Model" 
          value={merchantData.basicInfo.businessModel} 
        />
        <InfoItem 
          icon={Calendar} 
          label="Date of Incorporation" 
          value={new Date(merchantData.basicInfo.incorporationDate).toLocaleDateString()} 
        />
      </div>
      <div className="p-4 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-500 mb-2">Business Description</p>
        <p className="text-sm text-gray-900">{merchantData.basicInfo.description}</p>
      </div>
    </div>

    {/* Contact Information */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem 
          icon={MapPin} 
          label="Registered Address" 
          value={merchantData.contact.registeredAddress} 
        />
        <InfoItem 
          icon={MapPin} 
          label="Operating Address" 
          value={merchantData.contact.operatingAddress} 
        />
        <InfoItem 
          icon={Mail} 
          label="Email Address" 
          value={merchantData.contact.email} 
        />
        <InfoItem 
          icon={Phone} 
          label="Phone Number" 
          value={merchantData.contact.phone} 
        />
        <InfoItem 
          icon={Phone} 
          label="Mobile Number" 
          value={merchantData.contact.mobile} 
        />
        <InfoItem 
          icon={Phone} 
          label="Alternate Phone" 
          value={merchantData.contact.altPhone} 
        />
      </div>
    </div>
  </div>
); 