'use client';

import { Suspense } from 'react';
import AddNotePage from '../../../views/AddNotePage';

export default function AddNoteRoute() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <AddNotePage />
    </Suspense>
  );
}
