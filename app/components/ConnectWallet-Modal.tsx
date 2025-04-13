"use client"

import type React from "react"
import { formatEther, BrowserProvider } from "ethers"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { useMediaQuery } from "../hooks/use-media-query"

interface WalletOption {
  id: string
  name: string
  icon: string
  color: string
}

interface ConnectWalletModalProps {
  isOpen: boolean
  onClose: () => void
  buttonRef: React.RefObject<HTMLButtonElement | null>
}

export default function ConnectWalletModal({
  isOpen,
  onClose,
  buttonRef,
}: ConnectWalletModalProps) {
  const connectWallet = async (walletId: string) => {
    console.log("Trying to connect wallet")
    try {
      if (!window.ethereum) {
        alert("MetaMask tidak ditemukan!")
        return
      }

      const provider = new BrowserProvider(window.ethereum)
      // const accounts = await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      const network = await provider.getNetwork()
      const balanceRaw = await provider.getBalance(address)
      const balance = formatEther(balanceRaw)

      const walletData = {
        id: walletId,
        address,
        chainId: network.chainId,
        networkName: network.name,
        balance,
      }

      console.log("Wallet connected:", walletData)

      await fetch("/api/wallet-connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(walletData),
      })

      onClose()
    } catch (err) {
      console.error("Gagal koneksi ke wallet:", err)
    }
  }

  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const modalRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const walletOptions: WalletOption[] = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: "/placeholder.svg",
      color: "#F6851B",
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: "/placeholder.svg",
      color: "#0052FF",
    },
    // Add others...
  ]

  useEffect(() => {
    if (!isOpen || !buttonRef.current || !mounted) return

    const updatePosition = () => {
      if (!buttonRef.current) return

      const buttonRect = buttonRef.current.getBoundingClientRect()
      const modalWidth = modalRef.current?.offsetWidth || 400

      if (!isMobile) {
        setPosition({
          top: buttonRect.bottom + window.scrollY,
          left:
            Math.max(
              0,
              buttonRect.left + window.scrollX + buttonRect.width / 2 - modalWidth / 2
            ),
        })
      } else {
        setPosition({ top: 0, left: 0 })
      }
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)

    return () => {
      window.removeEventListener("resize", updatePosition)
    }
  }, [isOpen, buttonRef, isMobile, mounted])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`fixed z-50 bg-[#1F3B5B] rounded-lg shadow-lg overflow-hidden 
        ${isMobile ? "inset-x-4 mx-auto top-1/2 -translate-y-1/2 max-w-md" : "w-[400px]"}`}
        style={!isMobile ? { top: `${position.top}px`, left: `${position.left}px` } : {}}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgb(42,73,128)]">
          <h2 className="text-xl font-semibold text-white">Connect Wallet</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wallet options */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-2">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.id}
                className="flex items-center w-full p-3 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                onClick={() => {
                  console.log("clicked wallet")
                  connectWallet(wallet.id)
                }}
              >
                <div
                  className="w-8 h-8 rounded flex items-center justify-center mr-3"
                  style={{ backgroundColor: wallet.color }}
                >
                  <Image src={wallet.icon} alt={wallet.name} width={24} height={24} />
                </div>
                <span className="text-white">{wallet.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
