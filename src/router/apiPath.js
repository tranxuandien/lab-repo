
export const API_PATH = {
    CHEMICAL: {
        //import page
        REGISTER: "api/v1/buddy/chemical/register",
        IMPORT: "api/v1/buddy/chemical/import",
        //
        ADD: "api/v1/buddy/chemical/add",
        UPDATE: "api/v1/buddy/chemical/update",
        GET: "api/v1/buddy/chemical/find?id=",
        PRINT: "api/v1/buddy/chemical/codeprint",
        RE_PRINT: "api/v1/buddy/chemical/code/reprint",
        LIST: "api/v1/chemical/list",
        LIST_MASTER: "api/v1/chemical/list/master",
        //using
        USING_GET: "api/v1/chemical/using/get",
        USING: "api/v1/chemical/using",
        //Inventory
        INVENTORY_LIST: "api/v1/buddy/chemical/inventory/list",
        //History
        HISTORY: "api/v1/chemical/impexp/list",
        HISTORY_CHART: "api/v1/chemical/impexp/chart/list",
        //Delete
        DELETE: "api/v1/chemical/delete",
        INVENTORY_DELETE: "api/v1/buddy/chemical/inventory/delete",
    },
    USER: {
        LIST_MASTER: "api/v1/user/master/list",
        LIST: "api/v1/admin/user/list?name=",
        BUDDY_REGISTER: "api/v1/admin/buddy/register",
        BUDDY_LIST: "api/v1/admin/buddy/list",
        STUDENT_LIST: "api/v1/admin/student/list",
    },
    ACCOUNT: {
        USER_REGISTER: "api/auth/register",
        USER_ACTIVE: "api/auth/register/active?token=",
    },
    AUTH: {
        LOGIN: "api/auth/login",
        LOGOUT: "api/auth/logout",
    },
    BRAND: {
        LIST_MASTER: "api/v1/brand",
        DELETE: "api/v1/buddy/brand/delete",
        ADD: "api/v1/buddy/brand/add"
    },
    POSITION: {
        LIST_MASTER: "api/v1/position",
        DELETE: "api/v1/buddy/position/delete",
        ADD: "api/v1/buddy/position/add"
    },
    DEVICE: {
        LIST_MASTER: "api/v1/device/list/master",
        LIST: "api/v1/device/list",
        ADD: "api/v1/buddy/device/add",

        USING: "api/v1/device/using",
        USING_LIST: "api/v1/device/using/list",
        FOR_DEVICE: "api/v1/device/using/user?deviceId=",
        CANCEL_USING: "api/v1/device/using/cancel/",
        DONE_USING: "api/v1/device/using/done/",

        REPORT_STATUS:"api/v1/device/using/report",
        ACTIVE:"api/v1/buddy/device/active?id=",
        DELETE:"api/v1/buddy/device/delete",
    }
}