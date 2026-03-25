import { defineComponent, h } from "vue"
import type { HookContext, PluginMeta } from "../../../../types/plugin"
import {
  NavigationLayoutInfoBlock,
  NavigationLayoutPage,
} from "./components/index"

type RegisterableBlock = {
  id: string
  component?: string
  componentDef?: unknown
  priority?: number
}

type RegisterContext = HookContext<{
  registerBlock?: (block: RegisterableBlock) => void
  registerTopBlock?: (block: RegisterableBlock) => void
}>

const buildInfoBlock = (title: string, message: string) =>
  defineComponent({
    name: `NavigationLayoutHooks${title.replace(/[^a-zA-Z0-9]/g, "")}`,
    setup() {
      return () => h(NavigationLayoutInfoBlock, { title, message })
    },
  })

const addContextBlock = (
  hookCtx: RegisterContext,
  id: string,
  title: string,
  message: string,
  priority = 4,
) => {
  const register = hookCtx.registerBlock ?? hookCtx.registerTopBlock
  register?.({
    id,
    component: "NavigationLayoutInfoBlock",
    componentDef: buildInfoBlock(title, message),
    priority,
  })
}

export const NavigationLayoutHooksPlugin: PluginMeta = {
  id: "navigation-layout-hooks",
  name: "Navigation & Layout Toolkit",
  version: "1.1.0",
  description:
    "Ajoute des raccourcis de navigation et des blocs contextuels sur les pages principales.",
  author: "BittyTorrent",
  menuItems: [
    {
      id: "nav-layout-toolkit-link",
      label: "Toolkit Navigation",
      url: "/plugins/navigation-layout-toolkit",
      priority: 6,
      external: false,
      requiresAuth: false,
    },
    {
      id: "nav-layout-help",
      label: "Navigation helpers",
      url: "/torrents",
      priority: 4,
      external: false,
      requiresAuth: false,
    },
  ],
  pluginPages: [
    {
      id: "navigation-layout-toolkit-page",
      title: "Toolkit Navigation & Layout",
      path: "navigation-layout-toolkit",
      component: "NavigationLayoutPage",
      componentDef: NavigationLayoutPage,
      priority: 6,
    },
  ],
  hooks: {
    "app:init": (ctx) => {
      console.info("[NavigationLayoutHooks] Plugin prêt", ctx)
    },
    "page:home": (ctx) => {
      addContextBlock(
        ctx as RegisterContext,
        "nav-layout-home-tip",
        "Navigation rapide",
        "Utilisez le menu principal pour accéder rapidement aux sections clés.",
      )
    },
    "page:login": (ctx) => {
      addContextBlock(
        ctx as RegisterContext,
        "nav-layout-login-tip",
        "Retour à l'accueil",
        "Vous pouvez revenir à l'accueil à tout moment via le header.",
        12,
      )
    },
    "page:register": (ctx) => {
      addContextBlock(
        ctx as RegisterContext,
        "nav-layout-register-tip",
        "Compte utilisateur",
        "Après inscription, accédez à votre compte pour suivre vos stats.",
        12,
      )
    },
    "page:torrent-list": (ctx) => {
      addContextBlock(
        ctx as RegisterContext,
        "nav-layout-torrents-tip",
        "Astuce navigation",
        "Filtrez par catégorie pour retrouver plus vite vos torrents.",
        2,
      )
    },
    "page:torrent-detail": (ctx) => {
      addContextBlock(
        ctx as RegisterContext,
        "nav-layout-detail-tip",
        "Téléchargement",
        "Vérifiez la santé du torrent avant téléchargement.",
        2,
      )
    },
  },
}
