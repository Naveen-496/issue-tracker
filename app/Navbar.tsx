"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const Navbar = () => {
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  const currentPath = usePathname();

  return (
    <nav className="border-b mb-5 px-5 py-3">

      <Container>
         <Flex justify="between">
      
          <Flex gap="4" align="center">
            <Link href="/">
            <AiFillBug />
          </Link>

          <ul className="flex space-x-6">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={classNames({
                    "text-zinc-900": link.href === currentPath,
                    "text-zinc-500": link.href !== currentPath,
                    "text-zinc-800, transition-colors font-semibold": true,
                  })}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          </Flex>
        <Box>
          {status === "authenticated" && (
            <Link href="/api/auth/signout">Log out</Link>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </Box>
      </Flex>
      </Container>
     
    </nav>
  );
};

export default Navbar;
