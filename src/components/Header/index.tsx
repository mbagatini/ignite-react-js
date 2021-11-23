import Image from 'next/image';
import Link from 'next/link';

import commonStyles from '../../styles/common.module.scss';
import styles from './header.module.scss';

export default function Header() {
  return (
    <nav className={`${commonStyles.container} ${styles.headerContainer}`}>
      <Link href="/">
        <a>
          <Image src="/logo.svg" alt="logo" width={239} height={27} />
        </a>
      </Link>
    </nav>
  );
}
