export interface ReduxAction<ActionPayload> {
    type: string,
    payload: ActionPayload
}