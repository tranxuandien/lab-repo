
export const API_PATH = {
    CHEMICAL: {
        //import page
        REGISTER: "api/v1/admin/chemical/register",
        IMPORT: "api/v1/admin/chemical/import",
        //
        ADD: "api/v1/admin/chemical/add",
        UPDATE: "api/v1/admin/chemical/update",
        GET: "api/v1/admin/chemical/find?id=",
        PRINT: "api/v1/admin/chemical/codeprint",
        RE_PRINT: "api/v1/admin/chemical/code/reprint",
        LIST: "api/v1/chemical/list",
        LIST_MASTER: "api/v1/chemical/list/master",
        //using
        USING_GET: "api/v1/chemical/using/get",
        USING: "api/v1/chemical/using",
        //Inventory
        INVENTORY_LIST:"api/v1/admin/chemical/inventory/list",
        //History
        HISTORY: "api/v1/chemical/impexp/list",
        HISTORY_CHART: "api/v1/chemical/impexp/chart/list",
        //Delete
        DELETE: "api/v1/chemical/delete",
        INVENTORY_DELETE: "api/v1/admin/chemical/inventory/delete",
    },
    USER: {
        LIST_MASTER: "api/v1/admin/user/master/list",
    },
    ACCOUNT: {
        USER_REGISTER: "api/auth/register",
        USER_ACTIVE: "api/auth/register/active?token=",
    },
    AUTH: {
        LOGIN: "api/auth/login",
        LOGOUT: "api/auth/logout",
    },
    BRAND: "api/v1/brand",
    POSITION: "api/v1/position",
}