export class TransitionDto {
    transitionId: string;
    sourceColumnId: string;
    targetColumnId: string;
    transitionType: TransitionType;
    actions: ActionType[];
    constructor(transitionId: string, sourceColumnId: string, targetColumnId: string, transitionType: TransitionType, actions: ActionType[]) {
        this.transitionId = transitionId;
        this.sourceColumnId = sourceColumnId;
        this.targetColumnId = targetColumnId;
        this.transitionType = transitionType;
        this.actions = actions;
    }
}
enum TransitionType {
    Global,
    NodeToNode,
    Undefined
}

enum ActionType {
    OpenChat,
    Unassign,
}
