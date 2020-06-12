export default {
    // 插件配置
    plugins: [
        [
            'umi-plugin-react',
            {
                antd: true,
                dva: true, // 在这里打开 dva
            }
        ],
    ],
    // 路由配置
    routes: [
        {
            path: '/login',
            component: '../layouts/Login'
        },
        {
            path: '/',
            component: '../layouts/BasicLayout',
            Routes: ['./routes/PrivateRoute.js'], // 路由守卫
            routes: [
                {
                    path: '/',
                    component: './Home'
                },
                {
                    path: '/home',
                    component: './Home'
                },
                {
                    path: '/dashboard',
                    component: './Dashboard',
                    routes: [
                        {
                            path: '/dashboard/pj1',
                            component: './Dashboard/Project1'
                        },
                        {
                            path: '/dashboard/pj2',
                            component: './Dashboard/Project2'
                        },
                        {
                            // 默认路由不需要path字段
                            component: './Errors/NotFound',
                        }
                    ],

                },
                {
                    path: '/user',
                    component: './User',
                    routes: [
                        {
                            path: '/user/list',
                            exact: true,
                            component: './User/UserList',
                        },
                        {
                            path: '/user/register',
                            exact: true,
                            component: './User/UserRegister',
                            Routes: ['./routes/AdminRoute.js'], // 路由守卫
                        },
                        {
                            // 默认路由不需要path字段
                            component: './Errors/NotFound',
                        }
                    ],
                },
                {
                    path: '/account',
                    component: './Account',
                    routes: [
                        {
                            path: '/account/info',
                            exact: true,
                            component: './Account/UserInfo',
                        },
                        {
                            path: '/account/settings',
                            exact: true,
                            component: './Account/UserSettings',
                        },
                        {
                            // 默认路由不需要path字段
                            component: './Errors/NotFound',
                        }
                    ],
                },
                {
                    // 默认路由不需要path字段
                    component: './Errors/NotFound',
                }
            ]
        },

    ],
}
