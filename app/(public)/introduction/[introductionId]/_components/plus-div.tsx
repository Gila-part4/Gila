'use client';

import { Plus } from 'lucide-react';
import React from 'react';

export default function PlusDiv() {
  return (
    <div
      className="flex justify-center w-full p-1 rounded-full shadow-md bg-primary hover:bg-primary_dark"
      aria-label="plus-div"
    >
      <Plus className="text-white" />
    </div>
  );
}
