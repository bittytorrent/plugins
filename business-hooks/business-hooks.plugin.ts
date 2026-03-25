import type { HookContext, PluginMeta } from "../../../../types/plugin"
import { BusinessStatusPage } from "./components/index"

type UploadContext = HookContext<{
  fileName?: string
  categoryId?: string | null
}>

type AfterUploadContext = HookContext<{
  torrent?: {
    name?: string
    infoHash?: string
  }
}>

type DownloadContext = HookContext<{
  infoHash?: string
}>

const incrementCounter = (key: string) => {
  if (!import.meta.client) return
  const value = Number(localStorage.getItem(key) ?? "0")
  localStorage.setItem(key, String(value + 1))
}

export const BusinessHooksPlugin: PluginMeta = {
  id: "business-hooks",
  name: "Business Rules & Metrics",
  version: "1.1.0",
  description:
    "Ajoute des validations métier sur l'upload et suit des indicateurs utilisateur/torrent.",
  author: "BittyTorrent",
  menuItems: [
    {
      id: "business-status-link",
      label: "Mon Statut Métier",
      url: "/plugins/business-status",
      priority: 7,
      external: false,
      requiresAuth: true,
    },
  ],
  pluginPages: [
    {
      id: "business-status-page",
      title: "Statut métier",
      path: "business-status",
      component: "BusinessStatusPage",
      componentDef: BusinessStatusPage,
      requiresAuth: true,
      priority: 7,
    },
  ],
  hooks: {
    "user:login": () => {
      if (!import.meta.client) return
      localStorage.setItem(
        "business-hooks.last-login",
        new Date().toISOString(),
      )
    },
    "user:register": () => {
      if (!import.meta.client) return
      localStorage.setItem(
        "business-hooks.last-register",
        new Date().toISOString(),
      )
    },
    "torrent:before-upload": (ctx) => {
      const uploadCtx = ctx as UploadContext
      const fileName = uploadCtx.fileName ?? ""

      if (!fileName.toLowerCase().endsWith(".torrent")) {
        throw new Error("Le fichier doit avoir l'extension .torrent.")
      }
      incrementCounter("business-hooks.upload-count")
    },
    "torrent:after-upload": (ctx) => {
      const uploadCtx = ctx as AfterUploadContext
      if (!import.meta.client) return
      const torrentName = uploadCtx.torrent?.name ?? "Torrent sans nom"
      localStorage.setItem("business-hooks.last-upload-name", torrentName)
      localStorage.setItem(
        "business-hooks.last-upload-at",
        new Date().toISOString(),
      )
    },
    "torrent:before-download": (ctx) => {
      const downloadCtx = ctx as DownloadContext
      if (!downloadCtx.infoHash) {
        throw new Error("InfoHash manquant avant téléchargement.")
      }
      incrementCounter("business-hooks.download-count")
    },
  },
}
