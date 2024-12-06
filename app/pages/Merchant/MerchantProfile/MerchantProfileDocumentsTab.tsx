import { FC } from 'react';
import { DocumentStatus } from './MerchantProfileComponents';
import { merchantData } from './MerchantProfile';

export const DocumentsTab: FC = () => (
  <div className="space-y-6">
    {/* Business Documents */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Business Documents</h3>
      <div className="divide-y">
        {Object.entries(merchantData.compliance.businessDocs).map(([key, doc]) => (
          <div key={key} className="py-3 grid grid-cols-[1fr_auto] gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {key.toUpperCase()} Details
              </p>
              <p className="text-xs text-gray-500">
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
      <h3 className="text-lg font-semibold text-gray-900">Identity Documents</h3>
      <div className="divide-y">
        {merchantData.identityProof.documents.map((doc, index) => (
          <div key={index} className="py-3 grid grid-cols-[1fr_auto] gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900">{doc.type}</p>
              <p className="text-xs text-gray-500">
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
      <h3 className="text-lg font-semibold text-gray-900">Additional Documents</h3>
      <div className="divide-y">
        {/* Add your additional documents here */}
      </div>
    </div>
  </div>
); 