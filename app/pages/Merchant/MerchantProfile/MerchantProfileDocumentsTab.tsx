import { FC } from 'react';
import { DocumentStatus } from './MerchantProfileComponents';
import { merchantData } from './MerchantProfile';

export const DocumentsTab: FC = () => (
  <div className="space-y-8 p-6 bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-md">
    {/* Business Documents */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 border-b border-blue-100 pb-2 transition-all duration-300 hover:text-indigo-600 hover:border-indigo-200">
        Business Documents
      </h3>
      <div className="divide-y divide-blue-100">
        {Object.entries(merchantData.compliance.businessDocs).map(([key, doc]) => (
          <div 
            key={key} 
            className="py-4 grid grid-cols-[1fr_auto] gap-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-lg px-3 hover:shadow-sm"
          >
            <div>
              <p className="text-sm font-medium text-gray-800 transition-colors duration-300 hover:text-indigo-700">
                {key.toUpperCase()} Details
              </p>
              <p className="text-xs text-gray-500 transition-colors duration-300 hover:text-indigo-600">
                Number: {doc.number}
                {'status' in doc && ` • Status: ${doc.status}`}
                {'lastFiled' in doc && ` • Last Filed: ${new Date(doc.lastFiled).toLocaleDateString()}`}
              </p>
            </div>
            <DocumentStatus status={doc.verificationStatus} />
          </div>
        ))}
      </div>
    </div>

    {/* Identity Documents */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 border-b border-purple-100 pb-2 transition-all duration-300 hover:text-purple-600 hover:border-purple-200">
        Identity Documents
      </h3>
      <div className="divide-y divide-purple-100">
        {merchantData.identityProof.documents.map((doc, index) => (
          <div 
            key={index} 
            className="py-4 grid grid-cols-[1fr_auto] gap-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-lg px-3 hover:shadow-sm"
          >
            <div>
              <p className="text-sm font-medium text-gray-800 transition-colors duration-300 hover:text-purple-700">
                {doc.type}
              </p>
              <p className="text-xs text-gray-500 transition-colors duration-300 hover:text-purple-600">
                Number: {doc.number}
                {doc.uploadDate && ` • Uploaded: ${new Date(doc.uploadDate).toLocaleDateString()}`}
              </p>
            </div>
            <DocumentStatus status={doc.verificationStatus} />
          </div>
        ))}
      </div>
    </div>

    {/* Additional Documents */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 border-b border-teal-100 pb-2 transition-all duration-300 hover:text-teal-600 hover:border-teal-200">
        Additional Documents
      </h3>
      <div className="divide-y divide-teal-100">
        <div className="py-4 text-center text-gray-500 italic transition-all duration-300 hover:text-teal-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-green-50 rounded-lg">
          No additional documents found
        </div>
      </div>
    </div>
  </div>
);