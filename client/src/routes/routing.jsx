import Starter from '../views/starter/starter.jsx';
// ui components
import Alerts from '../views/ui-components/alert.jsx';
import Badges from '../views/ui-components/badge.jsx';
import Buttons from '../views/ui-components/button.jsx';
import Cards from '../views/ui-components/cards.jsx';
import LayoutComponent from '../views/ui-components/layout.jsx';
import PaginationComponent from '../views/ui-components/pagination.jsx';
import ProductDetails from '../views/ui-components/product_details.jsx';
import TooltipComponent from '../views/ui-components/tooltip.jsx';
import BranchList from '../views/ui-components/branch_list.jsx';


var ThemeRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'mdi mdi-view-dashboard',
        permission: null,
        component: Starter
    },

    {
        path: '/branch-data',
        name: 'Branch History',
        icon: 'mdi mdi-comment-processing-outline',
        permission: '4',
        component: Alerts
    },
    {
        path: '/employees',
        name: 'Branch Employee',
        icon: 'mdi mdi-toggle-switch',
        permission: "2",
        component: Buttons
    },
    {
        path: '/branch',
        name: 'All Branch',
        icon: 'mdi mdi-credit-card-multiple',
        permission: "1",
        component: BranchList
    },
    {
        path: '/create-employee',
        name: 'Create',
        icon: 'mdi mdi-apps',
        permission: "2",
        component: LayoutComponent
    },
    {
        path: '/create-percel',
        name: 'Parcel Create',
        icon: 'mdi mdi-priority-high',
        permission: "5",
        component: PaginationComponent
    },
    {
        path: '/product-details/:uid',
        name: 'Parcel Details',
        icon: 'mdi mdi-pencil-circle',
        permission: "4",
        component: ProductDetails
    },

    // { path: '/', pathTo: '/dashboard', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;

// permission level 1 = "only for Super Admin"
// permission level 2 = "only for super admin and subadmin"
// permission level 3 = "only for subadmin"
// permission level 4 = "only for subadmin and empplye"
// permission level 5 = "only for emplyee"
// permission level null = "for all"