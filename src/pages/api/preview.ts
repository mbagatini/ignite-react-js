import { NextApiRequest, NextApiResponse } from 'next';

import {
  linkResolver,
  getPrismicClient as Client,
} from '../../services/prismic';

export async function previewResolver(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token: ref, documentId } = req.query;

  const redirectUrl = await Client(req)
    .getPreviewResolver(String(ref), String(documentId))
    .resolve(linkResolver, '/');

  if (!redirectUrl) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.setPreviewData({ ref });

  res.write(
    `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${redirectUrl}" />
    <script>window.location.href = '${redirectUrl}'</script>
    </head>`
  );

  res.end();
}
