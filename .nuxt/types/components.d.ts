
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  AppBreadCrumb: typeof import("../../app/components/AppBreadCrumb.vue")['default']
  AppNavbar: typeof import("../../app/components/AppNavbar.vue")['default']
  AppSidebar: typeof import("../../app/components/AppSidebar.vue")['default']
  ProfileDropdown: typeof import("../../app/components/ProfileDropdown.vue")['default']
  BaseCheckbox: typeof import("../../app/components/base/BaseCheckbox.vue")['default']
  BaseDatePicker: typeof import("../../app/components/base/BaseDatePicker.vue")['default']
  BaseDropzone: typeof import("../../app/components/base/BaseDropzone.vue")['default']
  BaseInput: typeof import("../../app/components/base/BaseInput.vue")['default']
  BaseMultiSelect: typeof import("../../app/components/base/BaseMultiSelect.vue")['default']
  BaseNumber: typeof import("../../app/components/base/BaseNumber.vue")['default']
  BaseSearch: typeof import("../../app/components/base/BaseSearch.vue")['default']
  BaseSelect: typeof import("../../app/components/base/BaseSelect.vue")['default']
  BaseSwitch: typeof import("../../app/components/base/BaseSwitch.vue")['default']
  BaseTextArea: typeof import("../../app/components/base/BaseTextArea.vue")['default']
  BaseTimePicker: typeof import("../../app/components/base/BaseTimePicker.vue")['default']
  ButtonBaseButton: typeof import("../../app/components/button/BaseButton.vue")['default']
  ButtonBaseIconButton: typeof import("../../app/components/button/BaseIconButton.vue")['default']
  CardBaseCard: typeof import("../../app/components/card/BaseCard.vue")['default']
  CardBaseStatCard: typeof import("../../app/components/card/BaseStatCard.vue")['default']
  ModalBaseModal: typeof import("../../app/components/modal/BaseModal.vue")['default']
  TableBaseTable: typeof import("../../app/components/table/BaseTable.vue")['default']
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
  NuxtImg: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  NuxtPicture: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  ColorScheme: typeof import("../../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue")['default']
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyAppBreadCrumb: LazyComponent<typeof import("../../app/components/AppBreadCrumb.vue")['default']>
  LazyAppNavbar: LazyComponent<typeof import("../../app/components/AppNavbar.vue")['default']>
  LazyAppSidebar: LazyComponent<typeof import("../../app/components/AppSidebar.vue")['default']>
  LazyProfileDropdown: LazyComponent<typeof import("../../app/components/ProfileDropdown.vue")['default']>
  LazyBaseCheckbox: LazyComponent<typeof import("../../app/components/base/BaseCheckbox.vue")['default']>
  LazyBaseDatePicker: LazyComponent<typeof import("../../app/components/base/BaseDatePicker.vue")['default']>
  LazyBaseDropzone: LazyComponent<typeof import("../../app/components/base/BaseDropzone.vue")['default']>
  LazyBaseInput: LazyComponent<typeof import("../../app/components/base/BaseInput.vue")['default']>
  LazyBaseMultiSelect: LazyComponent<typeof import("../../app/components/base/BaseMultiSelect.vue")['default']>
  LazyBaseNumber: LazyComponent<typeof import("../../app/components/base/BaseNumber.vue")['default']>
  LazyBaseSearch: LazyComponent<typeof import("../../app/components/base/BaseSearch.vue")['default']>
  LazyBaseSelect: LazyComponent<typeof import("../../app/components/base/BaseSelect.vue")['default']>
  LazyBaseSwitch: LazyComponent<typeof import("../../app/components/base/BaseSwitch.vue")['default']>
  LazyBaseTextArea: LazyComponent<typeof import("../../app/components/base/BaseTextArea.vue")['default']>
  LazyBaseTimePicker: LazyComponent<typeof import("../../app/components/base/BaseTimePicker.vue")['default']>
  LazyButtonBaseButton: LazyComponent<typeof import("../../app/components/button/BaseButton.vue")['default']>
  LazyButtonBaseIconButton: LazyComponent<typeof import("../../app/components/button/BaseIconButton.vue")['default']>
  LazyCardBaseCard: LazyComponent<typeof import("../../app/components/card/BaseCard.vue")['default']>
  LazyCardBaseStatCard: LazyComponent<typeof import("../../app/components/card/BaseStatCard.vue")['default']>
  LazyModalBaseModal: LazyComponent<typeof import("../../app/components/modal/BaseModal.vue")['default']>
  LazyTableBaseTable: LazyComponent<typeof import("../../app/components/table/BaseTable.vue")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  LazyColorScheme: LazyComponent<typeof import("../../node_modules/@nuxtjs/color-mode/dist/runtime/component.vue")['default']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
