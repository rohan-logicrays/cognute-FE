import AppLayout from "../components/layout/AppLayout";

interface RedirectRoute {
    path: string;
    name: string;
    redirectRoute: true; // Required true
    to: string; // 'to' is required when redirectRoute is true
  }
  
  interface NormalRoute {
    path: string;
    name: string;
    redirectRoute: false; // Required false
    element: () => JSX.Element; // 'element' is required
  }
  
  export type RouteType = RedirectRoute | NormalRoute;
  

export const privateRoute:RouteType[] = [
  {
    redirectRoute: false,
    path: "/home",
    name: "Home",
    element: AppLayout,
  },
  {
    redirectRoute:true,
    path: "*",
    to:"/home",
    name: "redirect route",
  },
];
