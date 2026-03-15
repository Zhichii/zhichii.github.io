import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

import ConfigLocalized from './docusaurus.config.localized.json';

const defaultLocale = 'en';

function getLocalizedConfigValue(key: keyof typeof ConfigLocalized) {
  const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? defaultLocale;
  const values = ConfigLocalized[key];
  if (!values) {
    throw new Error(`Localized config key=${key} not found`);
  }
  const value = values[currentLocale] ?? values[defaultLocale];
  if (!value) {
    throw new Error(
      `Localized value for config key=${key} not found for both currentLocale=${currentLocale} or defaultLocale=${defaultLocale}`,
    );
  }
  return value;
}

const config: Config = {
  title: getLocalizedConfigValue('title'),
  tagline: getLocalizedConfigValue('tagline'),
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://zhichii.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zhichii', // Usually your GitHub org/user name.
  projectName: 'zhichii.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans','en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: getLocalizedConfigValue('title'),
      logo: {
        alt: '山邱HillQiu的头像',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          label: getLocalizedConfigValue('navbar.documents'),
          position: 'left',
        },
        {
          to: '/blog',
          label: getLocalizedConfigValue('navbar.blogs'),
          position: 'left'
        },
        {
          to: '/comments',
          label: getLocalizedConfigValue('navbar.comments'),
          position: 'left'
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/zhichii/zhichii.github.io',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: getLocalizedConfigValue('footer.contacts'),
          items: [
            {
              label: getLocalizedConfigValue('footer.contacts.bilibili'),
              href: 'https://space.bilibili.com/521877155',
            },
            {
              label: 'OutLook',
              href: 'mailto:qiuyixuan_last@outlook.com',
            },
            {
              label: getLocalizedConfigValue('footer.contacts.gmail'),
              href: 'mailto:hlhillmc@gmail.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/zhichii',
            },
          ],
        },
        {
          title: getLocalizedConfigValue('footer.launchers'),
          items: [
            {
              label: getLocalizedConfigValue('footer.launchers.riverlauncher2'),
              href: 'https://github.com/Zhichii/RiverLauncher2-RvFr',
            },
            {
              label: getLocalizedConfigValue('footer.launchers.riverlauncher3'),
              href: 'https://github.com/Zhichii/PortalToMinecraft',
            },
            {
              label: getLocalizedConfigValue('footer.launchers.xmcx'),
              href: 'https://github.com/Zhichii/xmcx',
            },
            {
              label: getLocalizedConfigValue('footer.launchers.launcherqiu-core'),
              href: 'https://github.com/Zhichii/LauncherQiu-Core',
            },
          ],
        },
        {
          title: getLocalizedConfigValue('footer.games'),
          items: [
            {
              label: getLocalizedConfigValue('footer.games.mountainworld'),
              href: 'https://github.com/Zhichii/MountainWorld',
            },
            {
              label: getLocalizedConfigValue('footer.games.craeft'),
              href: 'https://github.com/Zhichii/Craeft',
            },
          ],
        },
        {
          title: getLocalizedConfigValue('footer.mods'),
          items: [
            {
              label: getLocalizedConfigValue('footer.mods.whitestone'),
              href: 'https://github.com/Zhichii/Whitestone',
            },
          ],
        },
        {
          title: getLocalizedConfigValue('footer.more'),
          items: [
            {
              label: getLocalizedConfigValue('footer.more.videos'),
              href: 'https://space.bilibili.com/521877155/upload/video',
            },
            {
              label: getLocalizedConfigValue('footer.more.tk4cpp'),
              href: 'https://github.com/Zhichii/tk4cpp',
            },
            {
              label: getLocalizedConfigValue('footer.more.hti'),
              href: 'https://github.com/Zhichii/HTI',
            },
            {
              label: getLocalizedConfigValue('footer.more.twt2.3'),
              href: 'https://github.com/Zhichii/TwT2.3',
            },
          ],
        },
      ],
      copyright: `${getLocalizedConfigValue('footer.copyright')} © ${new Date().getFullYear()} ${getLocalizedConfigValue('footer.copyright-end')}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;