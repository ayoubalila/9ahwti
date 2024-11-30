'use client';

import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header({ session }: { session: Session | null }) {
  const [avatarUrl, setAvatarUrl] = useState<string>('/images/default-avatar.jpg'); // Assurez-vous que l'image par défaut existe
  const [displayName, setDisplayName] = useState<string>('User');

  useEffect(() => {
    const fetchProfile = async () => {
      if (session) {
        try {
          // Appeler l'API pour récupérer les informations du profil
          const response = await fetch('/api/getProfile');
          if (response.ok) {
            const profile = await response.json();
            // Met à jour l'avatar et le nom d'utilisateur si disponibles
            setAvatarUrl(profile.avatarUrl || '/images/default-avatar.jpg');
            setDisplayName(profile.username || 'User');
          } else {
            console.error('Erreur lors de la récupération du profil:', await response.json());
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données de profil:', error);
        }
      }
    };

    fetchProfile();
  }, [session]);

  return (
    <header className="mb-16">
      <div className="flex justify-between max-w-2xl mx-auto px-4 py-4">
        <Link href={'/'} className="inline-flex gap-1 items-center">
          <FontAwesomeIcon className="h-8" icon={faMugHot} />
          <span className="mt-2">9ahwty</span>
        </Link>

        <nav className="mt-2 flex gap-6 items-center">
          <Link href="/about">About</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>

          <div className="flex gap-4">
            {session ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 bg-yellow-300 rounded-full p-1 pr-6"
              >
                {/* Utilisation du composant Image pour l'avatar */}
                <Image
                  src={avatarUrl} // Avatar dynamique
                  alt="avatar"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                {displayName}
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <button className="border-2 rounded-full px-4 py-2 ml-4">Login</button>
                </Link>
                <Link href="/signup">
                  <button className="bg-yellow-300 rounded-full px-4 py-2">Sign up</button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
