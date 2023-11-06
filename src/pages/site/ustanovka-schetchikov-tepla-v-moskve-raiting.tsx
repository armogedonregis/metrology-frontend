import { Hero } from "@/components/hero";
import { Wrapper } from "@/components/layout/wrapper";
import { Organization } from "@/components/organization";
import { ICompanys } from "@/types/company";
import { NextPageContext } from "next";
import parse from 'html-react-parser'
import Head from "next/head";
import { SearchBar } from "@/components/searchBar";
import { isServer } from "@/utils/server";

export default function Home({ company, block }: ICompanys) {

  return (
    <>
      <Head>
        <title>ТОП московских служб по установке счетчиков тепла по отзывам бывших клиентов</title>
        <meta name="description" content="ТОП московских служб по установке счетчиков тепла по отзывам бывших клиентов" />
        <meta property="og:title" content="ТОП московских служб по установке счетчиков тепла по отзывам бывших клиентов" />
        <meta property="og:description" content="ТОП московских служб по установке счетчиков тепла по отзывам бывших клиентов" />
      </Head>
      <Hero />
      <Organization />
      <Wrapper>
        <div className="mt-10">
          {block && <div>{parse(block.top)}</div>}
        </div>
      </Wrapper>
      {company && <SearchBar company={company} />}
      <Wrapper>
        <div className="mb-10">
          {block && <div>{parse(block.bottom)}</div>}
        </div>
      </Wrapper>
    </>
  )
}


export const getStaticProps = async (ctx: NextPageContext) => {

  const res = await fetch(`${isServer}/api/data/msk/ustanovka-schetchikov-tepla-v-moskve-raiting/output.json`)
  const company = await res.json()

  const resBlock = await fetch(`${isServer}/api/note`)
  const block = await resBlock.json()

  return {
    props: {
      company,
      block,
    },
    revalidate: 10
  }
}