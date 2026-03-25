import type { HookContext, PluginMeta } from "../../../../types/plugin"
import { AdminOpsPage } from "./components/index"

type AdminPageContext = HookContext<{
  page?: string
}>

type AdminSettingsContext = HookContext<{
  page?: string
  form?: {
    maxUploadSize?: number
    privateTrackerRatio?: number
  }
}>

const pushAdminEvent = (event: string) => {
  if (!process.client) return
  const raw = localStorage.getItem("administration-hooks.events")
  const events = raw ? (JSON.parse(raw) as string[]) : []
  events.unshift(event)
  localStorage.setItem(
    "administration-hooks.events",
    JSON.stringify(events.slice(0, 10)),
  )
}

export const AdministrationHooksPlugin: PluginMeta = {
  id: "administration-hooks",
  name: "Admin Activity Monitor",
  version: "1.1.0",
  description:
    "Suit l'activité de l'espace admin et expose un journal rapide côté plugin.",
  author: "BittyTorrent",
  menuItems: [
    {
      id: "admin-ops-link",
      label: "Journal Admin",
      url: "/plugins/admin-ops",
      priority: 8,
      external: false,
      requiresAuth: true,
    },
    {
      id: "admin-monitor-activity",
      label: "Logs administrateur",
      url: "/plugins/admin-ops",
      priority: 9,
      external: false,
      requiresAuth: true,
    },
  ],
  pluginPages: [
    {
      id: "admin-ops-page",
      title: "Journal Admin",
      path: "admin-ops",
      component: "AdminOpsPage",
      componentDef: AdminOpsPage,
      requiresAuth: true,
      adminOnly: true,
      priority: 8,
    },
  ],
  hooks: {
    "admin:page": (ctx) => {
      const adminCtx = ctx as AdminPageContext
      const page = adminCtx.page ?? "unknown"
      pushAdminEvent(`[admin:page] ${page} @ ${new Date().toISOString()}`)
    },
    "admin:menu": (ctx) => {
      const adminCtx = ctx as AdminPageContext
      const page = adminCtx.page ?? "unknown"
      pushAdminEvent(`[admin:menu] ${page} @ ${new Date().toISOString()}`)
    },
    "admin:settings": (ctx) => {
      const settingsCtx = ctx as AdminSettingsContext
      if (
        settingsCtx.form?.privateTrackerRatio &&
        settingsCtx.form.privateTrackerRatio < 1
      ) {
        settingsCtx.form.privateTrackerRatio = 1
      }
      pushAdminEvent(
        `[admin:settings] ${settingsCtx.page ?? "unknown"} @ ${new Date().toISOString()}`,
      )
    },
  },
}
