import Starter from '../views/starter/starter.jsx';
// ui components
import Alerts from '../views/ui-components/alert.jsx';
import Badges from '../views/ui-components/badge.jsx';
import Buttons from '../views/ui-components/button.jsx';
import Cards from '../views/ui-components/cards.jsx';
import LayoutComponent from '../views/ui-components/layout.jsx';
import PaginationComponent from '../views/ui-components/pagination.jsx';
import PopoverComponent from '../views/ui-components/popover.jsx';
import TooltipComponent from '../views/ui-components/tooltip.jsx';


var ThemeRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'mdi mdi-view-dashboard',
        component: Starter
    },

    {
        path: '/branch-data',
        name: 'Branch History',
        icon: 'mdi mdi-comment-processing-outline',
        component: Alerts
    },
    {
        path: '/all-branch',
        name: 'All Branch History',
        icon: 'mdi mdi-arrange-send-backward',
        component: Badges
    },
    {
        path: '/create-percel',
        name: 'Book Parcel',
        icon: 'mdi mdi-toggle-switch',
        component: Buttons
    },
    {
        path: '/my-parcel',
        name: 'My Parcels',
        icon: 'mdi mdi-credit-card-multiple',
        component: Cards
    },
    {
        path: '/create-employee',
        name: 'Create',
        icon: 'mdi mdi-apps',
        component: LayoutComponent
    },
    {
        path: '/pagination',
        name: 'Parcel Details',
        icon: 'mdi mdi-priority-high',
        //permission: "employee",
        component: PaginationComponent
    },
    {
        path: '/popover',
        name: 'Popover',
        icon: 'mdi mdi-pencil-circle',
        component: PopoverComponent
    },
    {
        path: '/parcel-list',
        name: 'Parcel List',
        icon: 'mdi mdi-image-filter-vintage',
        component: TooltipComponent
    },
    // { path: '/', pathTo: '/dashboard', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;
