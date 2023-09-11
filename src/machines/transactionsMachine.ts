import {assign, createMachine} from 'xstate'

interface FetchData {
    data: {}
}
interface ErrorMsg {
    error: string
}

export const transactionsMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBcBOBDAdrdBjZAlgPbYB0ANkehAZlAMQQlim0BuRA1i2ljvsTKVqtKAnZFc6QiQDaABgC6CxYlAAHIrAIzMakAA9EANnmljAVgAcAZmNWALACYAnA-n2PAGhABPRBakAIwWAOyhtk4W8i42TsYuFgC+ST682Hi6sBRUNHT0YKioRKik6uTSAGYlALak6fxZOSJ04pgcUroqKvqa2rr6RggAtDYxpE4Ooc72lvJWoUHGPv4IQWOkVk42oRamQfLrtqEpaRgZAiTZlWDIuAAWAGLoBOSQ9ABKt6i+PUggfR0gkGiFGEVI8nkoUS8lcixsFkSK0QDgmbhsVgsDhssVCTlhSxSqRAmCIEDg+gamUE8H+gIG-yGwxmEKhMLh60RFmRI1sE3kexC1gSQUmNlOICplyEuVEvS0QJIIJG61CpAsYwcDmMQTxiSsBp5DismwOLic0z2HkmLglUqaNzu9wAygBXXC4OC0jQKhmgIac4KOCyuCzrFz2ULLPyIUI2YIa3aueR2LXJYn2mmkR0PZ6vSDy-rAxmguwuUjucJBEJWFzm6IOHlxhM7EMuFPGNNEpJAA */
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
                data:any
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
        fetchSuccess: {},
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