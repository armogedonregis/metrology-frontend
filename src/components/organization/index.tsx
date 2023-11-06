import { Wrapper } from "../layout/wrapper";
import GraphicIcon from "public/assets/vector/graphic_icon.svg";
import GirlIcon from "public/assets/vector/girl_icon.svg";

type Props = {
    title: string;
}

export const Organization = ({ title }: Props) => {
    return (
        <section className="mt-6 lg:mt-24">
            <Wrapper>
                <h2 className="font-semibolb font-sans text-xl lg:text-3xl text-dark">{title}</h2>
            </Wrapper>
            <div className="lg:py-6 py-4 mt-6 lg:mt-12 bg-light">
                <Wrapper>
                    <div className="flex lg:flex-row flex-col lg:gap-[170px] relative items-center">
                        <p className="text-sm lg:w-[38rem] mb-8 lg:mb-0 text-dark">Мы стремимся к высокому качеству предлагаемых товаров или услуг. Мы ищем компании, которые гарантируют высокий уровень профессионализма и предоставляют качественные продукты или услуги. Нам важно, чтобы наши клиенты или партнеры были довольны результатом и доверяли нам.</p>
                        <GraphicIcon />
                        <GirlIcon className="absolute -bottom-4 lg:-bottom-5 right-0" />
                    </div>
                </Wrapper>
            </div>
        </section>
    );
};