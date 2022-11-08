import useHttp from "../../hooks/useHttp"

interface actionsParams {
    ids?: number[],
    url?: string
}

class TableAction {
    constructor(public name: string, public action: Function, active: boolean) { }
}

const deleteAction = new TableAction('Eliminar', () => {console.log(this) }, true)

deleteAction.action()