import { Hero } from "@/components/hero";
import { Wrapper } from "@/components/layout/wrapper";
import { Organization } from "@/components/organization";
import { SearchBar } from "@/components/searchBar";
import { ICompanys } from "@/types/company";
import { NextPageContext } from "next";
import parse from 'html-react-parser'
import Head from "next/head";
import { isServer } from "@/utils/server";

export default function Home({ company, block }: ICompanys) {

  return (
    <>
      <Head>
        <title>Лучшие службы Петербурга по поверке счетчиков воды. Отзывы клиентов и цены</title>
        <meta name="description" content={'Лучшие службы Петербурга по поверке счетчиков воды. Отзывы клиентов и цены'} />
        <meta property="og:title" content={'Лучшие службы Петербурга по поверке счетчиков воды. Отзывы клиентов и цены'} />
        <meta property="og:description" content={'Лучшие службы Петербурга по поверке счетчиков воды. Отзывы клиентов и цены'} />
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

  const res = await fetch(`${isServer}/api/company/spb/home`)
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