import type { PluginMeta } from "../../../../types/plugin"
import { HelloPluginPage } from "./components"

export const HelloPlugin: PluginMeta = {
  id: "hello-plugin",
  name: "Hello Plugin",
  version: "1.0.0",
  description: "Ajoute des logs et un item de menu.",
  author: "VotreNom",

  menuItems: [
    {
      id: "hello-link",
      label: "Hello",
      url: "/plugins/hello",
      priority: 5,
      external: false,
      requiresAuth: true,
    },
  ],

  pluginPages: [
    {
      id: "hello-plugin-page",
      title: "Hello Plugin",
      path: "hello",
      component: "HelloPluginPage",
      componentDef: HelloPluginPage,
      requiresAuth: true,
      priority: 5,
    },
  ],

  hooks: {
    "app:init": (ctx) => {
      console.info("[HelloPlugin] init", ctx)
    },
    "user:login": (ctx) => {
      console.info("[HelloPlugin] login", ctx)
    },
    "page:plugin": (ctx) => {
      console.info("[HelloPlugin] plugin page", ctx)
    },
  },
}
