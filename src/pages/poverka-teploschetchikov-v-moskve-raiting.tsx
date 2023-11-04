import { Hero } from "@/components/hero";
import { Wrapper } from "@/components/layout/wrapper";
import { Organization } from "@/components/organization";
import { ICompanys } from "@/types/company";
import { NextPageContext } from "next";
import parse from 'html-react-parser'
import Head from "next/head";
import { SearchBar } from "@/components/searchBar";
import { isServer } from "@/utils/server";

export default function Home({ company, block, seo, storeName }: ICompanys) {

  return (
    <>
      <Head>
        {seo && 
        <>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta name="keywords" content={seo.keyword} />
        </>}
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

  const res = await fetch(`${isServer}/api/company/msk/poverkaJson`)
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
    
  }
}