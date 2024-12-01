'use client'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const actualMonth = new Date().getMonth() + 1
const menuItems = {
  Dashboard: `/?month=${actualMonth}`,
  Transações: '/transactions',
  Assinatura: '/subscription',
}
const Navbar = () => {
  const pathname = usePathname()
  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image
          src={'/logo.svg'}
          alt="Logo finance.ai"
          width={173}
          height={39}
        />
        {Object.keys(menuItems).map((item) => (
          <Link
            href={menuItems[item as keyof typeof menuItems]}
            key={item}
            className={
              pathname === menuItems[item as keyof typeof menuItems]
                ? 'font-bold text-primary'
                : 'text-muted-foreground'
            }
          >
            {item}
          </Link>
        ))}
      </div>
      <UserButton showName />
    </nav>
  )
}

export default Navbar
