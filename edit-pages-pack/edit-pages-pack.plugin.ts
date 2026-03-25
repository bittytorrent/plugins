import { defineComponent, h } from "vue"
import type { HookContext, PluginMeta } from "../../../../types/plugin"
import { EditPagesPackBlock } from "./components"

type RegisterableBlock = {
  id: string
  component?: string
  componentDef?: unknown
  priority?: number
}

type RegisterBlockContext = HookContext<{
  page?: string
  registerBlock?: (block: RegisterableBlock) => void
}>

type RegisterTopBlockContext = HookContext<{
  page?: string
  registerTopBlock?: (block: RegisterableBlock) => void
}>

const buildBlockComponent = (title: string, hookName: string) =>
  defineComponent({
    name: `EditPagesPackBlock${title.replace(/[^a-zA-Z0-9]/g, "")}`,
    setup() {
      return () => h(EditPagesPackBlock, { title, hookName })
    },
  })

const addPageBlock = (
  register: ((block: RegisterableBlock) => void) | undefined,
  id: string,
  title: string,
  hookName: string,
  priority = 4,
) => {
  register?.({
    id,
    component: "EditPagesPackBlock",
    componentDef: buildBlockComponent(title, hookName),
    priority,
  })
}

export const EditPagesPackPlugin: PluginMeta = {
  id: "edit-pages-pack",
  name: "Edit Pages Pack",
  version: "1.0.0",
  description:
    "Plugin d'exemple unique qui regroupe les injections de blocs pour toutes les pages hookées.",
  author: "Atmoner",
  hooks: {
    "app:init": () => {
      console.info("[EditPagesPackPlugin] initialisé")
    },
    "page:home": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-home",
        "Pack pages · Accueil",
        "page:home",
      )
    },
    "page:login": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-login",
        "Pack pages · Connexion",
        "page:login",
      )
    },
    "page:register": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-register",
        "Pack pages · Inscription",
        "page:register",
      )
    },
    "page:account": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-account",
        "Pack pages · Compte",
        "page:account",
      )
    },
    "page:account-profile": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-account-profile",
        "Pack pages · Compte > Profil",
        "page:account-profile",
      )
    },
    "page:account-favorites": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-account-favorites",
        "Pack pages · Compte > Favoris",
        "page:account-favorites",
      )
    },
    "page:account-wallet": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-account-wallet",
        "Pack pages · Compte > Wallet",
        "page:account-wallet",
      )
    },
    "page:account-reviews": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-account-reviews",
        "Pack pages · Compte > Avis",
        "page:account-reviews",
      )
    },
    "page:account-settings": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-account-settings",
        "Pack pages · Compte > Paramètres",
        "page:account-settings",
      )
    },
    "page:stats": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-stats",
        "Pack pages · Statistiques",
        "page:stats",
      )
    },
    "page:install": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-install",
        "Pack pages · Installation",
        "page:install",
      )
    },
    "page:logout": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-logout",
        "Pack pages · Déconnexion",
        "page:logout",
      )
    },
    "page:upload": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-upload",
        "Pack pages · Upload",
        "page:upload",
      )
    },
    "page:plugin": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-plugin",
        "Pack pages · Route plugin",
        "page:plugin",
      )
    },
    "page:torrent-list": (ctx) => {
      const hookCtx = ctx as RegisterTopBlockContext
      addPageBlock(
        hookCtx.registerTopBlock,
        "edit-pages-pack-torrent-list",
        "Pack pages · Liste des torrents",
        "page:torrent-list",
      )
    },
    "page:torrent-detail": (ctx) => {
      const hookCtx = ctx as RegisterBlockContext
      addPageBlock(
        hookCtx.registerBlock,
        "edit-pages-pack-torrent-detail",
        "Pack pages · Détail torrent",
        "page:torrent-detail",
      )
    },
  },
}
