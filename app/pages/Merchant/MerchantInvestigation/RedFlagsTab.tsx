import { useState } from 'react';
import { FlagList } from '@/app/pages/Lists/FlagList';

export const RedFlagsTab = () => {
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      <div className="transition-all duration-300 hover:shadow-lg rounded-lg bg-gradient-to-br from-white via-blue-50/30 to-blue-50/50 p-4">
        <div className="animate-fade-in">
          <FlagList 
            openAccordions={openAccordions}
            setOpenAccordions={setOpenAccordions}
            className="transition-all duration-300 hover:scale-[1.01]"
          />
        </div>
      </div>
    </div>
  );
};
