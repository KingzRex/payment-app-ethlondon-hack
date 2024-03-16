import type { AppType, AppProps } from "next/app";
import { type NextPage } from "next";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { satoshiFont } from "@/font/setup";
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ModalContainerContext } from "@/lib/context/ModalContainer";
import { ToastContainer } from "react-toastify";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { env } from "@/env";
import "@/styles/globals.css";

const dynamicEnvironmentId = env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID;

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement<P>) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [modalContainer, setModalContainer] = useState<HTMLDivElement | null>(
    null,
  );
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (modalRef.current) {
      setModalContainer(modalRef.current);
    }
  }, [modalRef]);

  const modalContextValue = useMemo(
    () => ({
      container: modalContainer,
    }),
    [modalContainer],
  );

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ModalContainerContext.Provider value={modalContextValue}>
      <DynamicContextProvider
        settings={{
          environmentId: dynamicEnvironmentId,
          walletConnectors: [EthereumWalletConnectors],
          eventsCallbacks: {
            onLogout: () => {
              window.location.reload();
            },
          },
        }}
      >
        <main ref={modalRef} className={`${satoshiFont.variable} font-sans`}>
          <ToastContainer />
          {getLayout(<Component {...pageProps} />)}
        </main>
      </DynamicContextProvider>
    </ModalContainerContext.Provider>
  );
};

export default MyApp;