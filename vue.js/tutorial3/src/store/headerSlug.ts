import { reactive, provide, inject } from 'vue'

interface State {
    headerSlug: string;
}

export const stateSymbol = Symbol('state')
export const createState = () => reactive<State>({ headerSlug: '/base' })

export const useState = () => inject(stateSymbol)

export const provideState = () => provide(stateSymbol, createState())
