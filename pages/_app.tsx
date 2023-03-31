import { ChakraProvider } from "@chakra-ui/react"
import WalletContextProvider from "../contexts/WalletContextProvider"
import { AnchorContextProvider } from "@/contexts/AnchorContextProvider"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WalletContextProvider>
        <AnchorContextProvider>
          <Component {...pageProps} />
        </AnchorContextProvider>
      </WalletContextProvider>
    </ChakraProvider>
  )
}
