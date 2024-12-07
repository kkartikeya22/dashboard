import { FC } from 'react';
import { Building2, Store, Briefcase, Calendar, Globe, MapPin, Mail, Phone } from 'lucide-react';
import { InfoItem } from './MerchantProfileComponents';
import { merchantData } from './MerchantProfile';

export const BusinessProfileTab: FC = () => (
  <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50">
    {/* Business Information */}
    <div className="space-y-4 transition-all duration-300 hover:shadow-lg rounded-lg bg-white/80 p-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Building2 className="h-5 w-5 text-blue-600" />
        Business Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem 
          icon={Building2} 
          label="Legal Business Name" 
          value={merchantData.basicInfo.legalName}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50/50 p-4 rounded-lg"
        />
        <InfoItem 
          icon={Store} 
          label="Trade Name" 
          value={merchantData.basicInfo.tradeName}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50/50 p-4 rounded-lg"
        />
        <InfoItem 
          icon={Briefcase} 
          label="Business Type" 
          value={merchantData.basicInfo.businessType}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50/50 p-4 rounded-lg"
        />
        <InfoItem 
          icon={Store} 
          label="Business Category" 
          value={`${merchantData.basicInfo.businessCategory} / ${merchantData.basicInfo.businessSubcategory}`}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50/50 p-4 rounded-lg"
        />
        <InfoItem 
          icon={Briefcase} 
          label="Business Model" 
          value={merchantData.basicInfo.businessModel}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50/50 p-4 rounded-lg"
        />
        <InfoItem 
          icon={Calendar} 
          label="Date of Incorporation" 
          value={new Date(merchantData.basicInfo.incorporationDate).toLocaleDateString()}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50/50 p-4 rounded-lg"
        />
      </div>
      <div className="p-6 rounded-lg border border-blue-100 bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50 transition-all duration-300 hover:shadow-md hover:border-blue-200">
        <p className="text-sm font-medium text-blue-600 mb-2">Business Description</p>
        <p className="text-sm text-gray-700 leading-relaxed">{merchantData.basicInfo.description}</p>
      </div>
    </div>

    {/* Contact Information */}
    <div className="space-y-4 transition-all duration-300 hover:shadow-lg rounded-lg bg-white/80 p-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <Phone className="h-5 w-5 text-blue-600" />
        Contact Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem 
          icon={MapPin} 
          label="Registered Address" 
          value={merchantData.contact.registeredAddress}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50/50 p-4 rounded-lg"
        />
        <InfoItem 
          icon={MapPin} 
          label="Operating Address" 
          value={merchantData.contact.operatingAddress}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50/50 p-4 rounded-lg"
        />
        <InfoItem 
          icon={Mail} 
          label="Email Address" 
          value={merchantData.contact.email}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50/50 p-4 rounded-lg"
        />
        <InfoItem 
          icon={Phone} 
          label="Phone Number" 
          value={merchantData.contact.phone}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50/50 p-4 rounded-lg"
        />
        <InfoItem 
          icon={Phone} 
          label="Mobile Number" 
          value={merchantData.contact.mobile}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50/50 p-4 rounded-lg"
        />
        <InfoItem 
          icon={Phone} 
          label="Alternate Phone" 
          value={merchantData.contact.altPhone}
          className="transition-all duration-300 hover:scale-[1.02] hover:bg-blue-50/50 p-4 rounded-lg"
        />
      </div>
    </div>
  </div>
);