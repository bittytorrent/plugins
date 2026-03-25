import type { PluginMeta } from "../../../../types/plugin"
import { PluginDonateBlock } from "./components"

/**
 * Plugin built-in : ajoute un bouton de donation Paypal dans la sidebar.
 * Exemple de plugin complet pour illustrer l'API du système.
 */
export const DonatePlugin: PluginMeta = {
  id: "donate",
  name: "Donate Paypal",
  version: "1.0.0",
  description:
    "Ajoute un bouton de donation Paypal dans la sidebar et un lien dans le menu utilisateur.",
  author: "Atmoner",
  authorUrl: "https://github.com/atmoner",

  /*   sidebarBlocks: [
    {
      id: "donate-block",
      title: "Soutenir le projet",
      component: "PluginDonateBlock",
      componentDef: PluginDonateBlock,
      priority: 8,
    },
  ],
 */
  footerBlocks: [
    {
      id: "donate-footer-block",
      title: "Soutenir BittyTorrent",
      component: "PluginDonateBlock",
      componentDef: PluginDonateBlock,
      priority: 8,
    },
  ],

  /*   topbarIcons: [
    {
      id: "donate-topbar",
      icon: "heart",
      title: "Soutenir le projet",
      priority: 9,
      action: "toggle-sidebar",
    },
  ], */

  menuItems: [
    {
      id: "donate-menu",
      label: "Faire un don",
      url: "https://paypal.me",
      priority: 9,
      external: true,
      requiresAuth: true,
    },
  ],

  hooks: {
    "app:init": () => {
      console.info("[Donate Plugin] Initialisé.")
    },
    "sidebar:before": (ctx) => {
      console.info("[Donate Plugin] sidebar:before", ctx)
    },
    "footer:content": (ctx) => {
      console.info("[Donate Plugin] footer:content", ctx)
    },
  },
}
