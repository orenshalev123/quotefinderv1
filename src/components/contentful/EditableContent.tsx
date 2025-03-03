
import React, { useEffect, useRef } from 'react';
import { applySourceMappingAttributes } from '@/integrations/contentful/vercelSourceMaps';

interface EditableContentProps {
  contentId: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps content with Vercel source mapping attributes to make it editable in Vercel's Visual Editor
 */
const EditableContent: React.FC<EditableContentProps> = ({ contentId, children, className }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    applySourceMappingAttributes(contentRef.current, contentId);
  }, [contentId]);
  
  return (
    <div ref={contentRef} className={className}>
      {children}
    </div>
  );
};

export default EditableContent;
