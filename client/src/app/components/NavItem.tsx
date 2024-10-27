'use client';

import Link from 'next/link';

const NavItem = ({
  icon,
  text,
  href,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2 font-bold hover:text-yellow-400 transition-colors"
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default NavItem;
