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
        <title>Рейтинг компаний Москвы по замене счетчиков воды. Отзывы клиентов и цены</title>
        <meta name="description" content="Рейтинг компаний Москвы по замене счетчиков воды. Отзывы клиентов и цены" />
        <meta property="og:title" content="Рейтинг компаний Москвы по замене счетчиков воды. Отзывы клиентов и цены" />
        <meta property="og:description" content="Рейтинг компаний Москвы по замене счетчиков воды. Отзывы клиентов и цены" />
      </Head>
      <Hero />
      <Organization title="Замена счетчиков воды в Москве — цены и рейтинг компаний" />
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

  const res = await fetch(`${isServer}/api/data/msk/zamena-schetchikov-vody-v-moskve-raiting/output.json`)
  const company = await res.json()

  const resBlock = await fetch(`${isServer}/api/note`)
  const block = await resBlock.json()

  const seoJson = await fetch(`${isServer}/api/seo`)
  const seo = await seoJson.json()

  return {
    props: {
      company,
      block,
      seo,
    },
    revalidate: 10
  }
}