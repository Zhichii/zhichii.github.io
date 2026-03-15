import type {ReactNode} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Giscus, { Theme } from '@giscus/react';
import {useColorMode} from '@docusaurus/theme-common';

import {translate} from '@docusaurus/Translate';
import styles from './comments.module.css';

function Comment() {
  return (
    <Giscus
      repo={"zhichii/zhichii.github.io"}
      repoId={"R_kgDOHXx1Mg"}
      category={"General"}
      categoryId={"DIC_kwDOHXx1Ms4C4YDq"}
      mapping="number"
      term="2"
      reactionsEnabled={"0"}
      emitMetadata={"0"}
      inputPosition={"top"}
      theme={useColorMode().colorMode}
      lang={useDocusaurusContext().i18n.currentLocale}
    />
  );
}

export default function Comments(): ReactNode {
  return (
    <Layout
      title={translate({id: 'comments'})}
      description={translate({id: 'desc.comments'})}>
      <main className={clsx("container", "container--fluid", "margin-vert--lg")}>
        <div className={clsx("row", styles.row)}>
          <div className={clsx("col", "col--8")}>
            <article>
              <header>
                <h1>{translate({id: 'comments'})}</h1>
              </header>
              <p>{translate({id: 'desc.comments'})}</p>
              <Comment/>
            </article>
          </div>
        </div>
      </main>
    </Layout>
  );
}
