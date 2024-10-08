<template>
    <div class=" custom-sidenav">
        <Tree :value="nodes" class="w-full md:w-[30rem]">
            <template #default="slotProps">
                <b>{{ slotProps.node.label }}</b>
            </template>
            <template #url="slotProps">
                <div>
                    <img v-if="slotProps.node.label=='Đăng kí thông tin thiết bị'" src="@/assets/icons/machine.png" style="width:16px;height:16px;float: left;margin-top: 5px;">
                    <router-link :to="slotProps.node.data" rel="noopener noreferrer"
                        class="text-surface-700 dark:text-surface-0 hover:text-primary">{{ slotProps.node.label
                        }}</router-link>
                </div>
            </template>
        </Tree>
    </div>
</template>

<script>
import Tree from 'primevue/tree';
import { useAuthStore } from '@/stores/auth';

export default {
    components: {
        Tree
    },
    data() {
        return {
            nodes: [
                {
                    key: '0',
                    label: 'Trang chủ',
                    data: "/",
                    type: 'url',
                    style: "font-weight: bolder;"
                },

            ],
        };
    },
    methods: {
        showSideNav() {
            const { hasRoleAdmin, isLogIn } = useAuthStore();
            if (isLogIn()) {
                this.nodes.push(
                    {
                        key: '1',
                        label: 'Hóa chất',
                        children: [
                            { key: '1-0',icon:"pi pi-list", label: 'Danh sách hóa chất', data: '/user/chemical', type: 'url' },
                        ]
                    },
                    {
                        key: '2',
                        label: 'Sử dụng hóa chất',
                        children: [
                            { key: '2-0',icon:"pi pi-filter", label: 'Đăng ký sử dụng hóa chất', data: '/user/chemical/using/register', type: 'url' },
                            { key: '2-1',icon:"pi pi-history", label: 'Lịch sử sử dụng HC', data: '/user/chemical/using/history', type: 'url' },
                        ]
                    },
                    {
                        key: '5',
                        label: 'Thiết bị',
                        children: [
                            { key: '5-0',icon:"pi pi-list", label: 'Danh sách thiết bị', data: '/user/device', type: 'url' },
                            { key: '5-2',icon:"pi pi-spin pi-cog", label: 'Đăng ký sử dụng thiết bị', data: '/user/device/using/register', type: 'url' },
                        ]
                    },
                );
            }

            if (hasRoleAdmin() && isLogIn()) {
                this.nodes[1].children.push(
                    { key: '1-1',icon:"pi pi-address-book", label: 'Đăng kí hóa chất', data: '/user/chemical/register', type: 'url' },
                    { key: '1-2',icon:"pi pi-print", label: 'In tem hóa chất', data: '/user/chemical/barcode/print', type: 'url' },
                    { key: '1-3',icon:"pi pi-file-import", label: 'Đăng kí nhập hóa chất', data: '/user/chemical/import/register', type: 'url' },
                    { key: '1-4',icon:"pi pi-wave-pulse", label: 'Kiểm tra tình trạng HC', data: '/user/chemical/manager', type: 'url' },
                );
                this.nodes[3].children.push(
                    { key: '5-1', label: 'Đăng kí thông tin thiết bị', data: '/user/device/register', type: 'url' },
                );
                this.nodes.push(
                    {
                        key: '3',
                        label: 'Nơi sản xuất',
                        // type: 'url',
                        children: [
                            { key: '3-0',icon:"pi pi-building-columns", label: 'Đăng kí nơi sản xuất', data: '/user/brand/register', type: 'url' },
                        ]
                    },
                    {
                        key: '4',
                        label: 'Nơi đặt hóa chất',
                        // type: 'url',
                        children: [
                            { key: '1-0',icon:"pi pi-bars",label: 'Đăng kí vị trí đặt HC', data: '/user/position/register', type: 'url' },
                        ]
                    },
                );
            }
        }
    },
    mounted() {
        // eslint-disable-next-line
        this.showSideNav();
        // this.user = user;
    }
};
</script>
<style>
.custom-sidenav {
    height: 81.7vh;
    /* background-color: #343a40; */
    color: white;
    padding: 20px;
    /* position: fixed;
  top: 0;
  left: 0; */
    /* overflow-y: auto; */
}
</style>
