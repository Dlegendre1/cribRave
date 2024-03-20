import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Splash from '../components/Splash';
import NewPostPage from '../components/AddNewPost';
import CurrentUserPosts from '../components/CurrentUserPosts/CurrentUserPosts';
import PostDetailsPage from '../components/PostDetailsPage/PostDetailsPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Splash />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/posts/new",
        element: <NewPostPage />
      },
      {
        path: "/user/current",
        element: <CurrentUserPosts />
      },
      {
        path: "/posts/",
        children: [
          {
            path: ':postId',
            element: <PostDetailsPage />
          }
        ]
      }
    ],
  },

]);
