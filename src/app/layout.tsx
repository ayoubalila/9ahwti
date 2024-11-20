import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
title: "Create Next App",
description: "Generated by create next app",

};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
<html lang="en">
<body className={inter. className}>
<header>

<Link href={'/'}>
     <FontAwesomeIcon icon = {faMugHot} / >
     Buy Me a Coffee
</Link>
</header>
{children}
</body>
</html>
);
}