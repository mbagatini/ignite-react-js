import React from 'react';
import { useUtterances } from '../../hooks/useUtterances';

interface CommentsProps {
  slug: string;
}

export default function Comments({ slug, ...rest }: CommentsProps) {
  const commentNodeId = 'comments';

  useUtterances(commentNodeId, slug);

  return <div id={commentNodeId} {...rest} />;
}
