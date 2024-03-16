import type { FC, PropsWithChildren } from "react";
import { Hamburger } from "../svg-icons";
import Link from "next/link";
import { APP_NAME } from "@/utils/constants";

interface AppLayoutProps extends PropsWithChildren {
  previousPathName?: string;
}

const AppLayout: FC<AppLayoutProps> = ({ children, previousPathName }) => {
  return (
    <div className="mx-auto flex w-screen flex-col gap-6 px-6 py-10 sm:my-5 sm:max-w-[390px] sm:border">
      <header className="flex justify-between">
        {previousPathName ? (
          <Link href={previousPathName}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19.9201L8.48 13.4001C7.71 12.6301 7.71 11.3701 8.48 10.6001L15 4.08008"
                stroke="#1A1A1A"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        ) : (
          <p className="text-xl font-bold">{APP_NAME}</p>
        )}
        <Hamburger />
      </header>
      <main className="flex-1 shrink-0">{children}</main>
    </div>
  );
};

export default AppLayout;