import {assign, createMachine} from 'xstate'

interface FetchData {
    data: {}
}
interface ErrorMsg {
    error: string
}

export const transactionsMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAdrdBjZAlgPbYB0ANkehAZlAMQQlim0BuRA1i2ljvsTKVqtKAnZFc6QiQDaABgC6CxYlAAHIrAIzMakAA9EAWgCMAJgAspeefnyAzAA4np0wFZzANicAaEACeiKYA7CGkTlaW7vKRAJzmCXEAvsn+vNh4urAUVDR09GCoqESopOrk0gBmpQC2pBn82bkidOKYHFK6Kir6mtq6+kYIZuYOpA7uDg4hll7RpnHuXv5BI4ukoV7mU16L8qby7qap6RiZAiQ5VWDIuAAWAGLoBOSQ9ABKt6gBvUgg-R0giGJgc8i8NnkITi0S8IWOlkRIVWwXMTlIcT2sXk0QccSclhCqTSIEwRAgcH0jSygng-0Bg3+w2MllCpEsUJCbncTjiCRilhR63BE0siSsUI8djCpxA1MuQjyoj6WiBJBB6xmpCmOLmoUSPJcQss6Nc8gSs2W4KsKRJ8uaNzu9wAygBXXC4OB0jSqxmgYamSabAmeJaBzFOEIrQKIELjDwzUOOebRWX22mkR0PZ6vSAqgbApmgrxxdmc7m8-k4oVxzZTeGJZOI9zE5JAA */
    id: 'transactions',
    context: {
        data: {},
        errorMsg: '',
        loading: false
    },
    schema: {
        events: {} as {type: 'Retry'},
        services: {} as {
            fetchData:{
                data:{}
            }
        }
        },

    initial: 'loading',
    states: {
        loading: {
            invoke: {
                src: 'fetchData',

                onDone: [
                    {target: 'fetchSuccess', actions: 'dataToContext'}
                ],
                onError: [
                    { target:'fetchFailed'},
                ]
            }
        },
        fetchSuccess: {
            type: "final"
        },
        fetchFailed: {
            on: {
                Retry: {target: "loading", actions: 'trigerred'}
            }
        }
    }
}, {
    actions: {
        dataToContext: assign((context, event) => {
            return {data: (event as unknown as FetchData).data}
        }),
        trigerred: assign((context, event) => {
            return {errorMsg: (event as unknown as ErrorMsg).error}
        })
    }
})