import Link from "next/link";

type Props = {
    theme?: 'primary' | 'second' | 'tertiary';
    children: React.ReactNode;
    onClick?: () => void;
}

export const Button = ({ theme = 'primary', children, onClick }: Props) => {
    const primaryClass = "h-10 lg:h-16 text-white active:opacity-50 transition-all duration-150 uppercase px-5 lg:px-12 flex items-center text-base lg:text-lg bg-primary-btn font-montserrat";
    const secondClass = "h-16 text-white uppercase w-full lg:w-[426px] transition-all duration-150 justify-center flex items-center text-sm lg:text-lg border-4 active:bg-primary-raiting border-primary-raiting font-montserrat";
    const tertiaryClass = "rounded text-white w-[80px] hover:bg-bgBtn duration-150 transition-all px-2 py-1.5 text-8pxl 2xl:text-sm bg-bgReq font-medium font-montserrat";
    if(theme === 'primary') {
        return (
            <Link href="#rating-organization" className={primaryClass}>{children}</Link>
        )
    }
    if(theme === 'second') {
        return (
            <Link href="#rating-organization" className={secondClass}>{children}</Link>
        )
    }
    if(theme === 'tertiary') {
        return (
            <button onClick={onClick} className={tertiaryClass}>{children}</button>
        )
    }
    return (
        <button></button>
    );
};