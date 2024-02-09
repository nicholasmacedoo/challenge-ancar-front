import { Layout } from "@/layout/application-layout";
import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./home/home-page";
import { QuizzesPage } from "./quiz/quizzes-page";
import { UsersPage } from "./users/users-page";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/questionarios',
                element: <QuizzesPage />,
            },
            {
                path: '/questionarios/:id',
                element: <QuizzesPage />,
            },
            {
                path: '/usuarios',
                element: <UsersPage />
            }
        ]
    }
])


