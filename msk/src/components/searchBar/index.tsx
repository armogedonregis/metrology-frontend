import { ICompany } from "@/types/company";
import { Button } from "../UI/button";
import SearchIcon from "public/assets/vector/search_icon.svg";
import MapIcon from "public/assets/vector/map_icon.svg";
import LogoSm from "public/assets/vector/logo_small.svg";
import StarIcon from "public/assets/vector/star_icon.svg";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import Modal from 'react-responsive-modal'
import { useModal } from "@/hooks/useModal";
import Select from "react-select";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import { Open_Sans } from "next/font/google";
import { useRouter } from "next/router";
import axios from "axios";
import { Controller, SubmitHandler, useForm } from "react-hook-form";


type Props = {
    company: ICompany[];
}

type IEmailReq = {
    service: {
        value: string;
        label: string;
    };
    date: {
        value: string;
        label: string;
    };
    time: {
        value: string;
        label: string;
    };
    firstName: string;
    phoneNumber: string;
    comment?: string;
    email?: string;
}

type IEmailSend = {
    service: string;
    date: string;
    time: string;
    firstName: string;
    phoneNumber: string;
    comment?: string;
    email?: string;
}

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-sans' });

const options = [
    { value: 'Поверка счетчиков воды', label: 'Поверка счетчиков воды' },
    { value: 'Замена счетчиков воды', label: 'Замена счетчиков воды' },
    { value: 'Установка счетчиков воды', label: 'Установка счетчиков воды' },
    { value: 'Поверка счетчиков тепла', label: 'Поверка счетчиков тепла' },
    { value: 'Замена счетчиков тепла', label: 'Замена счетчиков тепла' },
    { value: 'Установка счетчиков тепла', label: 'Установка счетчиков тепла' }
]

export const SearchBar = ({ company }: Props) => {

    const router = useRouter()

    const [arrState, setArrState] = useState<ICompany[]>(company);

    const { open, modalChoise, onOpenModal, onCloseModal } = useModal<ICompany>();

    const { search, handleSearch } = useSearch()


    
    const dateForMount: string[] = [];

    for (let i = 0; i < 30; i++) {
        const date = new Date();
        const datePlus = addDays(date, i);
        dateForMount.push(format(datePlus, 'dd.LL.yyyy'))
    }


    const optionsDate = useMemo(() =>
        dateForMount && dateForMount.map(item => {
            return {
                value: item,
                label: item
            }
        }),
        [dateForMount]
    );

    const timeForDay: string[] = [];


    for (let i = 0; i < 12; i++) {
        const timeInterval = `${9 + i}:00 - ${10 + i}:00`;
        timeForDay.push(timeInterval)
    }

    const optionsTime = useMemo(() =>
        timeForDay && timeForDay.map(item => {
            return {
                value: item,
                label: item
            }
        })
        ,
        [timeForDay])

    useEffect(() => {
        if (search) {
            const searched = arrState.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
            setArrState(searched)
        } else {
            setArrState(company)
        }
    }, [search])

    const colors = {
        "Осторожно": 'text-red-600',
        "Будьте": 'text-orange-400',
        "Хорошо": 'text-green-300'
    }

    const colorsText = (text: string) => {
        if (text.includes('Осторожно')) {
            return colors['Осторожно']
        }
        if (text.includes('Будьте')) {
            return colors['Будьте']
        }
        if (text.includes('Хорошо')) {
            return colors['Хорошо']
        }
    };

    const { register, control, reset, formState: { errors }, handleSubmit } = useForm<IEmailReq>({
        defaultValues: {
            service: options[0],
            date: optionsDate[0],
            time: optionsTime[0]
        }
    });

    const sendEmail: SubmitHandler<IEmailReq> = (data) => {
        axios.post<any, any, IEmailSend>("/api/email-send", {
            service: data.service?.value, date: data.date?.value, time: data.time?.value,
            firstName: data.firstName,
            phoneNumber: data.phoneNumber,
            comment: data.comment,
            email: modalChoise?.email.split('mailto:').join('')
        })
            .then((res) => {
                reset()
                onCloseModal()
            })

    };

    return (
        <>

            <Modal open={open} onClose={onCloseModal} center>
                {open &&
                    <div className={`p-5 ${openSans.variable}`}>
                        <h3 className="text-2xl font-sans border-b-2 border-b-slate-500 pb-2">Оставить заявку в компанию {modalChoise?.title}</h3>
                        <form onSubmit={handleSubmit(data => sendEmail(data))} className="flex font-sans flex-col w-full gap-5 mt-10">
                            <div className="flex flex-col gap-2">
                                <label className="text-left">Услуга:</label>
                                <Controller control={control}
                                    name="service" render={({ field }) => (
                                        <Select
                                            id="long-value-select"
                                            instanceId="long-value-select"
                                            options={options}
                                            value={field.value}
                                            onChange={(val) => field.onChange(val)}
                                            isMulti={false}
                                            isSearchable={false}
                                        />
                                    )}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-left">Удобная дата:</label>
                                {dateForMount.length > 0 &&
                                    <Controller control={control}
                                        name="date" render={({ field }) => (
                                            <Select
                                                id="long-value-select"
                                                instanceId="long-value-select"
                                                options={optionsDate}
                                                value={field.value}
                                                onChange={(val) => field.onChange(val)}
                                                isMulti={false}
                                                isSearchable={false}
                                            />
                                        )}
                                    />}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-left">Удобное время:</label>
                                {timeForDay.length > 0 &&
                                    <Controller control={control}
                                        name="time" render={({ field }) => (
                                            <Select
                                                id="long-value-select"
                                                instanceId="long-value-select"
                                                options={optionsTime}
                                                value={field.value}
                                                onChange={(val) => field.onChange(val)}
                                                isMulti={false}
                                                isSearchable={false}
                                            />
                                        )}
                                    />
                                }
                            </div>
                            <div className="flex flex-col relative gap-2">
                                <label className="text-left">Ваше имя:<span className="text-red-500">*</span></label>
                                <input {...register('firstName', { required: true })} className="bg-transparent px-3 focus:outline-none border-b-2 border-b-slate-500" />
                                {errors.firstName && <p className="text-red-500 absolute -bottom-6">Введите ваше имя</p>}
                            </div>
                            <div className="flex flex-col relative gap-2">
                                <label className="text-left">Ваш телефон:<span className="text-red-500">*</span></label>
                                <input {...register('phoneNumber', { required: true })} className="bg-transparent px-3 focus:outline-none border-b-2 border-b-slate-500" />
                                {errors.firstName && <p className="text-red-500 absolute -bottom-6">Введите ваш телефон</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-left">Комментарий</label>
                                <textarea  {...register('comment')} className="h-[120px] resize-none bg-transparent px-3 focus:outline-none border-b-2 border-b-slate-500" />
                            </div>
                            <div className="flex justify-center">
                                <button type="submit" className="h-10 lg:h-16 text-white active:opacity-50 transition-all duration-150 uppercase px-5 lg:px-12 flex items-center text-base lg:text-lg bg-primary-btn font-montserrat">Отправить</button>
                            </div>
                        </form>
                    </div>
                }
            </Modal>


            <section id="rating-organization" className="xl:my-20 my-12">
                <div className="mx-auto max-w-full lg:max-w-[1920px] px-5 xl:px-10 w-screen">
                    <div className="bg-bgGrad py-16 px-10 2xl:pl-16 2xl:pr-20 rounded-20xl flex flex-col gap-8">
                        <div className="flex md:flex-row flex-col-reverse gap-y-5 md:gap-y-0 md:justify-between">
                            <div className="relative group">
                                <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2" />
                                <div className={`group-hover:hidden ${search.length > 0 && 'hidden'} absolute right-5 top-1/2 -translate-y-1/2 group cursor-pointer flex items-center gap-2`}>
                                    <MapIcon />
                                    <span className="text-xs md:text-base text-dark-gray">{router.pathname.split('/')[1] === 'site' ? 'Москва' : 'Санкт-Петербург'}</span>
                                </div>
                                <div className={`group-hover:hidden ${search.length > 0 && 'hidden'} bg-dark-gray h-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px]`}></div>
                                <input value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Поиск" className="xl:h-16 h-10 w-full text-base lg:w-[300px] xl:w-[400px] rounded-lg text-dark-gray placeholder:dark-gray px-10 focus:outline-none" />
                            </div>
                            <div className="flex gap-2 items-center">
                                <LogoSm />
                                <h4 className="text-base font-bold">Метрология</h4>
                            </div>
                        </div>
                        <div className="w-full">
                            <table className="max-w-full">
                                <thead>
                                    <tr>
                                        <th rowSpan={2}>Логотип</th>
                                        <th rowSpan={2}>
                                            Название компании
                                        </th>
                                        <th colSpan={4}>Оценка</th>
                                        <th colSpan={2}>Цена</th>
                                        <th rowSpan={2}>Честная цена</th>
                                        <th rowSpan={2}>Аттестат аккредитации</th>
                                        <th rowSpan={2}>Дата последнего внесения в Аршин</th>
                                        <th rowSpan={2}>Отзывы
                                        </th>
                                        <th rowSpan={2}>
                                            Оставлено заявок
                                        </th>
                                        <th rowSpan={2}>Оставить заявку</th>
                                    </tr>
                                    <tr>
                                        <th>
                                            Итоговая
                                        </th>
                                        <th>
                                            Качественно
                                        </th>
                                        <th>
                                            Быстро
                                        </th>
                                        <th>
                                            Дешево
                                        </th>
                                        <th>
                                            Заявленная
                                        </th>
                                        <th>
                                            В отзывах клиентов
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {arrState.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td>
                                                    {item.img && <Image src={`https://metrologiya.org/api/static/${item.img.substring(item.img.lastIndexOf('/') + 1)}`} width={60} height={22} alt="" />}
                                                    {/* {item.img && <Image src={`http://localhost:4000/api/static/${item.img.substring(item.img.lastIndexOf('/') + 1)}`} width={60} height={22} alt="" />} */}
                                                </td>
                                                <td>{item.title}</td>
                                                <td>
                                                    <div className="xl:block gap-y-2 flex flex-col">
                                                        <span className="xl:hidden">Итоговая оценка</span>
                                                        <div className="flex justify-center items-center gap-1">
                                                            <span>
                                                                {item.finalRating}
                                                            </span>
                                                            <StarIcon />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="xl:block gap-y-2 flex flex-col">
                                                        <span className="xl:hidden">Оценка качества</span>
                                                        <span>{item.goodRating}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="xl:block gap-y-2 flex flex-col">
                                                        <span className="xl:hidden">Оценка быстро</span>
                                                        <span>{item.fastRating}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="xl:block gap-y-2 flex flex-col">
                                                        <span className="xl:hidden">Оценка дешево</span>
                                                        <span>{item.lowRating}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="xl:block gap-y-2 flex flex-col">
                                                        <span className="xl:hidden">Заявленная цена</span>
                                                        <span>{item.oficialPrice}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="xl:block gap-y-2 flex flex-col">
                                                        <span className="xl:hidden">Цена в отзывах клиентов</span>
                                                        <span>{item.peoplePrice}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="xl:block gap-y-2 flex flex-col">
                                                        <span className="xl:hidden">Честная цена</span>
                                                        <div>
                                                            {item.ratingPrice.split(" ").map((word, idx) => idx === 0 ?
                                                                <>
                                                                    <span className={`${colorsText(item.ratingPrice)}`}>{word}</span>
                                                                    <br />
                                                                </> : word + ' ')}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="xl:block gap-y-2 flex flex-col">
                                                        <span className="xl:hidden">Аттестат аккредитации</span>
                                                        <span>{item.attestat}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="xl:block gap-y-2 flex flex-col">
                                                        <span className="xl:hidden">Дата последнего внесения в Аршин</span>
                                                        <span>{item.dateSend}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="xl:block gap-y-2 flex flex-col">
                                                        <span className="xl:hidden">Отзывы</span>
                                                        <span>{item.review}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="xl:block gap-y-2 flex flex-col">
                                                        <span className="xl:hidden">Оставлянео заявок</span>
                                                        <span>{item.requestCount}</span>
                                                    </div>
                                                </td>
                                                <td><Button onClick={() => onOpenModal(item)} theme="tertiary">Оставить заявку</Button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};