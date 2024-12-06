import { useState } from 'react';
import { FlagList } from '@/app/pages/Lists/FlagList';

export const RedFlagsTab = () => {
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  return (
    <div className="p-6">
      <FlagList 
        openAccordions={openAccordions}
        setOpenAccordions={setOpenAccordions}
      />
    </div>
  );
};
