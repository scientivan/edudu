'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
// import ConnectWalletModal from './ConnectWallet-Modal'
import axios from 'axios'

import {
  useAccount,
  useBalance,
  useChainId,
  useConfig,
} from 'wagmi'

const Navbar = () => {
  // const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  // const connectButtonRef = useRef<HTMLButtonElement | null>(null)

  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const chainId = useChainId()
  const config = useConfig()

  const chain = config.chains.find(c => c.id === chainId)

  const previousIsConnected = useRef<boolean | null>(null)
  const previousAddressRef = useRef<string | null>(null) // 👈 Tambahkan ini

  // Log informasi wallet
  useEffect(() => {
    // console.log('Wallet Connected:', isConnected)
    // console.log('Wallet Address:', address)
    // console.log('Wallet Balance:', balance)
    // console.log('Current Chain:', chain)
    // console.log('Chain ID:', chainId)
  }, [isConnected, address, balance, chain, chainId])

  // Simpan address terakhir saat masih connected
  useEffect(() => {
    if (isConnected && address) {
      previousAddressRef.current = address
    }
  }, [isConnected, address])

  // Kirim info wallet ke backend setelah connect
  useEffect(() => {
    if (isConnected && address && balance && chain) {
      const sendWalletInfo = async () => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/wallet-connect`,
            {
              address,
              chainId,
              networkName: chain.name,
              balance: balance.formatted + ' ' + balance.symbol,
            },
            {
              withCredentials: true,
            }
          )
          console.log('Wallet data sent:', response.data)
        } catch (error) {
          console.error('Error sending wallet data:', error)
        }
      }

      sendWalletInfo()
    }
  }, [isConnected, address, balance, chain])

  // Deteksi disconnect dan kirim logout
  useEffect(() => {
    if (previousIsConnected.current && !isConnected) {
      const sendLogout = async () => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`,
            {
              address: previousAddressRef.current, // 👈 Gunakan address terakhir
            },
            { withCredentials: true }
          )
          console.log('Wallet disconnected, logout sent:', res.data)
        } catch (err) {
          console.error('Error during wallet logout:', err)
        }
      }

      sendLogout()
    }

    // Update status koneksi terakhir
    previousIsConnected.current = isConnected
  }, [isConnected])

  return (
    <header
      style={{ backgroundColor: 'var(--background)' }}
      className='container mx-auto p-4 flex justify-between items-center'
    >
      <div className='flex items-center gap-2'>
        <div className='w-8 h-8 bg-white rounded'></div>
        <Link href='/' className='font-semibold text-lg text-[#EACA91]'>
          Edugram
        </Link>
      </div>

      <nav className='flex gap-6 text-white items-center'>
        <Link href='/' className='font-semibold'>
          Home
        </Link>
        <Link href='/explore' className='font-semibold'>
          Explore
        </Link>
        <ConnectButton />
      </nav>

      {isConnected && (
        <div className='text-white text-right text-sm ml-6'>
          <div>👛 {address?.slice(0, 6)}...{address?.slice(-4)}</div>
          <div>💰 {balance?.formatted} {balance?.symbol}</div>
          <div>🔗 {chain?.name}</div>
        </div>
      )}

      {/* <ConnectWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        buttonRef={connectButtonRef}
      /> */}
    </header>
  )
}

export default Navbar
