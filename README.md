# HMW Apps Gallery

用于 GitHub Pages 的零依赖静态应用展示站，包含：

- 作品集主页
- 数据驱动的应用详情页
- 通用及应用级隐私政策
- 多应用共享的技术支持页

## 本地预览

```bash
python3 -m http.server 8080
```

然后打开 `http://localhost:8080`。

## 接入新应用

编辑 `assets/catalog.js`，参考文件中的示例向 `apps` 数组添加应用。主页会自动生成应用卡片，应用详情地址为：

```text
/app/?id=应用ID
```

对应的隐私政策地址为：

```text
/privacy/?app=应用ID
```

在 `siteConfig.supportEmail` 中填入支持邮箱后，技术支持页会自动启用邮件链接。

## GitHub Pages

在仓库 Settings → Pages 中选择从默认分支根目录部署即可。项目包含 `.nojekyll`，无需额外构建步骤。
