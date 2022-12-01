import { RouteInfo } from "./sidebar.metadata";
export const ROUTES: RouteInfo[] = [
  

  // Admin Modules
 
 // {
 //   path: "/admin/dashboard/dashboard2",
 //   title: "Accueil",
 //   moduleName: "dashboard",
 //   iconType: "material-icons-two-tone",
 //   icon: "home",
 //   class: "",
 //   groupTitle: false,
 //   badge: "",
 //   badgeClass: "",
 //   role: ["admin"],
 //   submenu: [],
 // },
  {
    path: "/admin/car-list",
    title: "Liste des véhicules",
    moduleName: "dashboard",
    iconType: "material-icons-two-tone",
    icon: "directions_car_filled",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["admin"],
    submenu: [],
  },
  {
    path: "/admin/car-owner",
    title: "Liste des propriétaires",
    moduleName: "dashboard",
    iconType: "material-icons-two-tone",
    icon: "group",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["admin"],
    submenu: [],
  },
  

  // User Modules
  {
    path: "/patient/dashboard",
    title: "Accueil",
    moduleName: "dashboard",
    iconType: "material-icons-two-tone",
    icon: "home",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["user"],
    submenu: [],
  },
  {
    path: "/patient/my-car",
    title: "Mes voitures",
    moduleName: "dashboard",
    iconType: "material-icons-two-tone",
    icon: "directions_car",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["user"],
    submenu: [],
  },
 
 
];
