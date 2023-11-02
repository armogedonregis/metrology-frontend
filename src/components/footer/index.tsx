import { Wrapper } from "../layout/wrapper";
import Logo from "public/assets/vector/logo.svg";

export const Footer = () => {
    return (
        <footer className="bg-light w-screen pt-10 pb-3 lg:pt-16 lg:pb-6">
            <Wrapper>
                <div className="flex flex-col items-center">
                    <div className="flex lg:flex-row flex-col gap-3 lg:gap-8 items-center">
                        <div className="font-sans text-base lg:text-xl">Контакты</div>
                        <div className="flex items-center">
                            <Logo />
                            <p className="text-xl lg:text-3xl font-bold cursor-pointer">Метрология</p>
                        </div>
                        <div className="font-sans text-base lg:text-xl">Наши регионы</div>
                    </div>
                    <div className="lg:mt-6 mt-2 font-sans text-base lg:text-xl">2023</div>
                </div>
            </Wrapper>
        </footer>
    );
};