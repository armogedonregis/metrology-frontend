import Link from "next/link";
import { Button } from "../UI/button";
import { Wrapper } from "../layout/wrapper";
import Logo from "public/assets/vector/logo.svg";
import { HeaderMskData } from "@/data/headerMskData";
import { useRouter } from "next/router";

// export const getSubdomain = (url: any) => {
//     let domain = url;
//     if (url.includes("://")) {
//         domain = url.split('://')[1];
//     }
//     const subdomain = domain.split('.')[0];
//     return subdomain;
// };

export const Header = () => {
    const router = useRouter();
    return (
        <header className="py-3 lg:py-9">
            <Wrapper>
                <div className="flex gap-5 lg:gap-0 flex-col flex-wrap lg:flex-row items-center justify-between">
                    <Link href={'/'} className="flex items-center">
                        <Logo />
                        <p className="lg:text-3xl text-xl font-bold cursor-pointer">Метрология</p>
                    </Link>
                    <div>
                        <Button theme="primary">Заказать поверку</Button>
                    </div>
                    <div className="flex group relative flex-col text-lg lg:text-xl font-sans">
                        <div className="font-bold">Регион</div>
                        <div className="text-primary cursor-pointer">Москва</div>
                        <div className="absolute w-[200px] z-50 top-8 lg:top-14 hidden bg-gray-200 text-gray-700 pt-1 group-hover:block">
                            <Link href={'/'} className="rounded-t cursor-pointer hover:bg-blue-400 py-2 px-4 block whitespace-no-wrap">Москва</Link>
                            <Link href={'http://subdomain.localhost:3000'} className="rounded-t cursor-pointer hover:bg-blue-400 py-2 px-4 block whitespace-no-wrap">Санкт-Петербург</Link>
                        </div>
                    </div>
                    <div className="flex group relative flex-col text-lg lg:text-xl font-sans">
                        <div className="font-bold">Рейтинги организаций:</div>
                        <div className="text-primary cursor-pointer">{HeaderMskData.find(x => x.url === router.asPath)?.title}</div>
                        <div className="absolute w-full z-50 top-8 lg:top-14 hidden bg-gray-200 text-gray-700 pt-1 group-hover:block">
                            {HeaderMskData.map(item => {
                                if (router.pathname !== item.url) {
                                    return (
                                        <Link key={item.id} href={item.url} className="rounded-t cursor-pointer hover:bg-blue-400 py-2 px-4 block whitespace-no-wrap">{item.title}</Link>
                                    )
                                }
                                return (
                                    <span key={item.id} className="rounded-t cursor-pointer bg-blue-400 py-2 px-4 block whitespace-no-wrap">{item.title}</span>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Wrapper>
        </header>
    );
};