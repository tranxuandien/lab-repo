
export const API_PATH = {
    CHEMICAL: {
        //import page
        REGISTER: "api/v1/admin/chemical/register",
        IMPORT: "api/v1/admin/chemical/import",
        //
        ADD: "api/v1/admin/chemical/add",
        PRINT: "api/v1/admin/chemical/codeprint",
        LIST: "api/v1/chemical/list",
        LIST_MASTER: "api/v1/chemical/list/master",
        //using
        USING_GET: "api/v1/chemical/using/get",
        USING: "api/v1/chemical/using",
        //Delete
        DELETE: "api/v1/chemical/delete"
    },
    ACCOUNT: {
        USER_REGISTER: "api/auth/register",
    },
    AUTH: {
        LOGIN: "api/auth/login",
        LOGOUT: "api/auth/logout",
    },
    BRAND: "api/v1/brand",
    POSITION: "api/v1/position",
}