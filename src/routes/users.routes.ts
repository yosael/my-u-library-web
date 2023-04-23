import { lazy, LazyExoticComponent } from "react";

type JSXComponent = () => JSX.Element;

export type Route = {
  path: string;
  Component: LazyExoticComponent<JSXComponent> | JSXComponent;
  name: string;
  displayInMenu: boolean;
  children?: Route[];
};

const HomePage = lazy(
  () => import(/* webpackChunkName: "HomePage"*/ "@/pages/home.page")
);

const BookAdminPage = lazy(
  () =>
    import(/* webpackChunkName: "BooksAdminPage" */ "@/pages/bookAdmin.page")
);

const BookListAdminPage = lazy(
  () =>
    import(
      /* webpackChunkName: "BookListAdminPage" */ "@/pages/bookListAdmin.page"
    )
);

const UserPage = lazy(
  () => import(/* webpackChunkName: "UserPage" */ "@/pages/user.page")
);

const UserListPage = lazy(
  () => import(/* webpackChunkName: "UserListPage" */ "@/pages/userList.page")
);

const CheckoutAdminPage = lazy(
  () =>
    import(
      /* webpackChunkName: "CheckoutAdminPage" */ "@/pages/checkoutAdmin.page"
    )
);

const CheckoutListAdminPage = lazy(
  () =>
    import(
      /* webpackChunkName: "CheckoutListAdminPage" */ "@/pages/checkoutListAdmin.page"
    )
);

const BookPage = lazy(
  () => import(/* webpackChunkName: "BookPage" */ "@/pages/book.page")
);

const BookListPage = lazy(
  () => import(/* webpackChunkName: "BookListPage" */ "@/pages/bookList.page")
);

const CheckoutPage = lazy(
  () => import(/* webpackChunkName: "CheckoutPage" */ "@/pages/checkout.page")
);

const CheckoutListPage = lazy(
  () =>
    import(
      /* webpackChunkName: "CheckoutListPage" */ "@/pages/checkoutList.page"
    )
);

export const librarianRoutes: Route[] = [
  {
    path: "/",
    Component: HomePage,
    name: "Home",
    displayInMenu: true,
  },
  {
    path: "/books/admin",
    Component: BookListAdminPage,
    name: "Books",
    displayInMenu: true,
  },
  {
    path: "/books/admin/:id",
    Component: BookAdminPage,
    name: "Book",
    displayInMenu: false,
  },
  {
    path: "/checkouts/admin",
    Component: CheckoutListAdminPage,
    name: "Checkouts",
    displayInMenu: true,
  },
  {
    path: "/checkouts/admin/:id",
    Component: CheckoutAdminPage,
    name: "Checkout",
    displayInMenu: false,
  },
  {
    path: "/users",
    Component: UserListPage,
    name: "Users",
    displayInMenu: true,
  },
  {
    path: "/users/:id",
    Component: UserPage,
    name: "User",
    displayInMenu: false,
  },
];

export const studentRoutes: Route[] = [
  {
    path: "/",
    Component: HomePage,
    name: "Home",
    displayInMenu: true,
  },
  {
    path: "/books",
    Component: BookListPage,
    name: "Books",
    displayInMenu: true,
  },
  {
    path: "/books/:id",
    Component: BookPage,
    name: "Book",
    displayInMenu: false,
  },
  {
    path: "/checkouts",
    Component: CheckoutListPage,
    name: "Checkouts",
    displayInMenu: true,
  },
  {
    path: "/checkouts/:id",
    Component: CheckoutPage,
    name: "Checkout",
    displayInMenu: false,
  },
];
