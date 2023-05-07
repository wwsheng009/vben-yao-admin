# readme

## vben 配置

修改`.env.development`配置文件,修改`VITE_GLOB_API_URL`配置成`yao-api`

```sh
# Whether to open mock
VITE_USE_MOCK = false
# public path
VITE_PUBLIC_PATH = /
# Basic interface address SPA
VITE_GLOB_API_URL=/yao-api
# File upload address， optional
VITE_GLOB_UPLOAD_URL=/upload
# Interface prefix
VITE_GLOB_API_URL_PREFIX=
```

配置`vite`代理配置

`vite.config.ts`

```js
{
    proxy: {
        '/yao-api': {
          target: 'http://127.0.0.1:5099/api/vben',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(new RegExp(`^/yao-api`), ''),
        }
    }
}
```

```sh
pnpm run dev
```
