import Link from "next/link";
import Image from 'next/image'

const Logo = () => {
    return ( 
        <Link
            href='/'
        >
            <Image
                src="/images/logo.svg"
                alt='aden logo'
                height={150}
                width={150}
                className='cursor-pointer shrink-0 dark:hidden'
            />
            <Image
                src="/images/koilogo.png"
                alt='aden logo'
                height={150}
                width={150}
                className='cursor-pointer shrink-0 hidden dark:flex'
            />
        </Link>
     );
}
 
export default Logo;