import { useEffect } from 'react';

// username/repo format
const REPO_NAME = 'mbagatini/05-desafio-blog';

export const useUtterances = (commentNodeId: string, slug: string) => {
  // const { theme } = useTheme();
  // const utterancesTheme = theme === 'light' ? 'github-light' : 'photon-dark';
  const utterancesTheme = 'photon-dark';

  useEffect(() => {
    const scriptParentNode = document.getElementById(commentNodeId);
    if (!scriptParentNode) return;

    // docs - https://utteranc.es/
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', REPO_NAME);
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'comment :speech_balloon:');
    script.setAttribute('theme', utterancesTheme);
    script.setAttribute('crossorigin', 'anonymous');

    scriptParentNode.appendChild(script);

    return () => {
      // cleanup - remove the older script with previous theme
      scriptParentNode.removeChild(scriptParentNode.firstChild as Node);
    };
  }, [commentNodeId, slug]);
};
