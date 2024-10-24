// import React, { ReactNode } from 'react';
// import { Link, Outlet, useLocation, matchPath } from 'react-router-dom';
// import { buttonVariants } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { AUTH_PATH } from '@/routes/paths';

// const authPages = [
//   {
//     path: AUTH_PATH.login,
//     title: 'Login to your account',
//     description: 'Welcome back. Please login to continue.',
//     footerText: "Don't have an account?",
//     footerLinkText: 'Register here',
//     footerLinkTo: AUTH_PATH.register,
//   },
//   {
//     path: AUTH_PATH.register,
//     title: 'Welcome to AgriCare!',
//     description:
//       'We are excited to have you in our community. Please fill out the information below to get started.',
//     footerText: 'Already have an account?',
//     footerLinkText: 'Login here',
//     footerLinkTo: AUTH_PATH.login,
//   },
// ];

// interface AuthLayoutProps {
//   children: ReactNode;
// }

// const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
//   const { pathname } = useLocation();

//   const currentPage = authPages.find((page) => matchPath(page.path, pathname));

//   const title = currentPage?.title || '';
//   const description = currentPage?.description || '';

//   return (
//     <Card className="w-full max-w-[500px] py-7 px-3 font-poppins">
//       <CardHeader className="text-center">
//         <CardTitle className="flex flex-col items-center text-primary-green text-3xl">
//           {/* <AppLogo width={50} height={50} /> */}
//           {title}
//         </CardTitle>
//         <CardDescription>{description}</CardDescription>
//       </CardHeader>
//       <CardContent>
//         {/* Render Nested Child Routes */}
//         <Outlet />
//         {children}
//       </CardContent>
//       {currentPage?.footerText && (
//         <CardFooter className="font-semibold text-sm flex justify-center gap-1 -mt-1">
//           {currentPage.footerText}{' '}
//           <Link
//             to={currentPage.footerLinkTo}
//             className={buttonVariants({
//               variant: 'link',
//               className: 'text-primary-green !p-0',
//             })}
//           >
//             {currentPage.footerLinkText}
//           </Link>
//         </CardFooter>
//       )}
//     </Card>
//   );
// };

// export default AuthLayout;
