import { createContext, useContext } from "react"
import {
  Program,
  AnchorProvider,
  Idl,
  setProvider,
} from "@project-serum/anchor"
import { IDL, TinyAdventure } from "../idl/tiny_adventure"
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js"
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet"

const programId = new PublicKey("2F2K73Sj1ygx4N9ptCegrxEDvGNLCndrsCdmUbcHej3c")

const AnchorContext = createContext<AnchorWorkSpace>({
  connection: new Connection(clusterApiUrl("devnet")),
})

interface AnchorWorkSpace {
  connection: Connection
  provider?: AnchorProvider
  program?: Program<TinyAdventure>
}

const AnchorContextProvider = ({ children }: any) => {
  const connection = new Connection(clusterApiUrl("devnet"))
  const wallet = new NodeWallet(Keypair.generate())
  const provider = new AnchorProvider(connection, wallet, {})

  setProvider(provider)
  const program = new Program(
    IDL as Idl,
    programId
  ) as unknown as Program<TinyAdventure>

  const anchorWorkspace = {
    connection,
    provider,
    program,
  }

  return (
    <AnchorContext.Provider value={anchorWorkspace}>
      {children}
    </AnchorContext.Provider>
  )
}

const useAnchor = (): AnchorWorkSpace => {
  return useContext(AnchorContext)
}

export { AnchorContextProvider, useAnchor }
