import Link from 'next/link';

import commonStyles from '../../styles/common.module.scss';

export default function ExitPreview() {
  return (
    <aside className={commonStyles.preview}>
      <Link href="/api/exit-preview">
        <a>Sair do modo Preview</a>
      </Link>
    </aside>
  );
}
