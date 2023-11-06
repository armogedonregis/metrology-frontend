// Wrapper

type WrapperProps = {
    children: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
    const Container = 'mx-auto max-w-full lg:max-w-[1440px] lg:px-15 px-5 w-screen';
    return <div className={Container}>{children}</div>;
};
