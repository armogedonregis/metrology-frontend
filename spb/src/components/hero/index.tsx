import { heroData } from "@/data/heroData";
import { Wrapper } from "../layout/wrapper";
import TreuIcon from "public/assets/vector/treungle_icon.svg";
import { Button } from "../UI/button";

export const Hero = () => {
    return (
        <section className="bg-bgHero pt-6 lg:pt-20 pb-6 lg:pb-20 w-screen text-white z-10 relative bg-no-repeat h-full bg-cover bg-center">
            <div className="top-0 bottom-0 left-0 -z-10 right-0 opacity-70 bg-second absolute w-full h-full"></div>
            <Wrapper>
                <div className="text-white">
                    <div>Показываем и проверяем</div>
                    <h1 className="lg:mt-10 mt-6 font-sans font-bold text-4xl lg:text-7xl lg:w-9/12">Рейтинг компаний по поверке счетчиков воды</h1>
                </div>
                <div className="mt-5 flex flex-col gap-3">
                    {heroData.map(item => {
                        return (
                            <div key={item.id} className="flex items-center gap-8">
                                <TreuIcon className="w-6 h-10 lg:w-[initial] lg:h-[initial]" />
                                <h4 className="lg:w-6/12 text-xs lg:text-2xl font-medium">{item.text}</h4>
                            </div>
                        )
                    })}
                </div>
                <div className="lg:mt-8 mt-3 flex lg:flex-row flex-col items-center gap-4 lg:gap-12">
                    <Button theme="second">Смотреть рейтинги</Button>
                    <p className="lg:w-[40rem] leading-5 text-xs lg:text-lg font-medium">Мы проводим оценку компаний на основе трех ключевых параметров: сроки, качество и стоимость. Эти факторы являются важными для нас при выборе партнера или поставщика услуг.</p>
                </div>
            </Wrapper>
        </section>
    );
};