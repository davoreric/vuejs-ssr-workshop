# VueJS 2 SSR Workshop documentation

> Vue.js 2 workshop with step by step guide how to build VueJS instance with single file components, router and sprinkle it all with server side rendering flavor.
Since VueJS has one of the best documented API around, for any additional questions please refer to official documentation for VueJS, VueJS router and VueJS SSR.

## Reading
- [VueJS API documentation](https://vuejs.org/v2/api/)
- [VueJS router API documentation](https://router.vuejs.org/en/)
- [VueJS SSR API documentation](https://ssr.vuejs.org/en/)

## Requirements

- Node 6+
- NPM 4.6+

## Bootstraping VueJS app

1. Copy index.html, package.json and webpack.config.js from ./workshop to root folder

2. Create ./src folder

2. Create JS entry point in "./src/app.js"

    ```javascript
    import Vue from 'vue'
    import App from './App.vue'

    new Vue({
        el: '#app',
        render: h => h(App)
    });
    ```

3. Create VueJS single file component in "./src/App.vue"

    ```javascript
    <template>
        <h1>{{ msg }}</h1>
    </template>

    <script>
    export default {
        name: 'app',
        data() {
            return {
                msg: 'Hello world'
            }
        }
    }
    </script>

    <style></style>
    ```

4. Run cli `npm install`

5. Run cli `npm run dev`

## Adding VueJS router

1. Run cli `npm install vue-router --save` to install vue router as dependancy

2. Create VueJS components for home and about page, and save them in “./src/components/*.vue”

    ```javascript
    <template>
        <h1>{{title}}</h1>
    </template>

    <script>
    export default {
        data() {
            return {
                title: 'ABOUT'
            };
        }
    };
    </script>

    <style></style>
    ```

3. Create router component and save that in "./src/router.js"

    ```javascript
    import Vue from 'vue';
    import Router from 'vue-router';
    import Home from './components/Home.vue';
    import About from './components/About.vue';

    Vue.use(Router);

    export default new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                name: 'home',
                component: Home
            },
            {
                path: '/about',
                name: 'about',
                component: About
            }
        ]
    });
    ```

4. Import router in app.js and pass it as prop

    ```javascript
    import Vue from 'vue'
    import App from './App.vue'
    import Router from './router';

    new Vue({
        router: Router,
        el: '#app',
        render: h => h(App)
    });
    ```

5. Add router view and link in App.vue component

    ```javascript
    <template>
    <div id="app">    
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-view></router-view>
    </div>
    </template>

    <script>
    export default {
        name: 'app'
    };
    </script>

    <style></style>
    ```

## SSR magic

> This is fully customizable server side rendering with VueJS and Express server. This gives you possibility to tweak appliction to your needs. But if you require quick and easy solution please take look on [Nuxt](https://nuxtjs.org/).

1. Install following packages as dependencies:
    - vue-server-renderer
    - cross-env

2. Install following packages as dev dependencies:
    - extract-text-webpack-plugin
    - webpack-merge
    - webpack-node-externals
    - webpack-hot-middleware
    - webpack-dev-middleware
    - rimraf
    - memory-fs

3. Modify "./src/router.js" to return factory function:

    ```javascript
    export function createRouter() {
        
        return new Router({
            mode: 'history',
            routes: [...]
        });

    }
    ```

4. Modify "./src/app.js" to return factory function:

    ```javascript
    import { createRouter } from './router';

    export function createApp () {
        const router = createRouter();
        const app = new Vue({
            router,
            el: '#app',
            render: h => h(App)
        });
        return { app, router };
    }
    ```

5. Override following files

    - package.json in root (copy from workshop/package.full.json)

6. Copy following files

    - server.js in /src folder (copy from workshop/server.js)
    - index template in /src folder (copy from workshop/index.template.html)
    - server entry point in /src folder (copy from workshop/entry-server.js)
    - client entry point in /src folder (copy from workshop/entry-client.js)

7. Copy webpack files for build process

    - development server setup file (copy from workshop/setup-dev-server.js)
    - base webpack config (copy from workshop/webpack.base.config.js)
    - build for client entry point (copy from workshop/webpack.client.config.js)
    - build for server entry point (copy from workshop/webpack.server.config.js)

8. Run cli `npm run build` to create server and client bundles

9. Run cli `npm run dev` for development enviorment with hot module replacement

10. Run cli `npm start` for production enviorment