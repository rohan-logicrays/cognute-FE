import Login from "../components/Login/Login";

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
  

export const publicRoutes:RouteType[] = [
  {
    redirectRoute: false,
    path: "/",
    name: "Login",
    element: Login,
  },
  {
    redirectRoute:true,
    path: "*",
    to:"/",
    name: "redirect route",
  },
];