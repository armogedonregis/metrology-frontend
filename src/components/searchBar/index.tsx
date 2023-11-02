import { ICompany } from "@/types/company";
import { Button } from "../UI/button";
import SearchIcon from "public/assets/vector/search_icon.svg";
import MapIcon from "public/assets/vector/map_icon.svg";
import LogoSm from "public/assets/vector/logo_small.svg";
import StarIcon from "public/assets/vector/star_icon.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearch } from "@/hooks/useSearch";
import Modal from 'react-responsive-modal'
import { useModal } from "@/hooks/useModal";


type Props = {
    company: ICompany[];
}

export const SearchBar = ({ company }: Props) => {

    const [arrState, setArrState] = useState<ICompany[]>(company);

    const {  open, modalChoise, onOpenModal, onCloseModal } = useModal<ICompany>();

    const { search, handleSearch } = useSearch()

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

    return (
        <>

<Modal open={open} onClose={onCloseModal} center>
        {open &&
          <div className="p-5">
            <h3 className="text-2xl">Оставить заявку в компанию {modalChoise?.title}</h3>
            <form className="flex flex-col items-center gap-5 mt-10">
            <div className="flex flex-col gap-2">
                <label className="text-center">Ваше имя</label>
                <input className="w-[300px] bg-transparent px-3 focus:outline-none border-b-2 border-b-slate-500"  />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-center">Ваш телефон</label>
                <input className="w-[300px] bg-transparent px-3 focus:outline-none border-b-2 border-b-slate-500"  />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-center">Комментарий</label>
                <input className="w-[300px] bg-transparent px-3 focus:outline-none border-b-2 border-b-slate-500"  />
            </div>
            <div className="flex justify-center">
                <button onClick={onCloseModal} className="h-10 lg:h-16 text-white active:opacity-50 transition-all duration-150 uppercase px-5 lg:px-12 flex items-center text-base lg:text-lg bg-primary-btn font-montserrat" type="submit">Отправить</button>
            </div>
        </form>
          </div>
        }
      </Modal>


        <section id="rating-organization" className="mt-20 mb-20">
            <div className="mx-auto max-w-full lg:max-w-[1920px] px-10 w-screen">
                <div className="bg-bgGrad py-16 px-10 2xl:pl-16 2xl:pr-20 rounded-20xl flex flex-col gap-8">
                    <div className="flex justify-between">
                        <div className="relative group">
                            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2" />
                            <div className="group-hover:hidden absolute right-5 top-1/2 -translate-y-1/2 group cursor-pointer flex items-center gap-2">
                                <MapIcon />
                                <span className="text-base text-dark-gray">Москва</span>
                            </div>
                            <div className="group-hover:hidden bg-dark-gray h-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px]"></div>
                            <input value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Поиск" className="h-16 text-base w-[300px] rounded-lg text-dark-gray placeholder:dark-gray px-10 focus:outline-none" />
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
                                                {item.img && <Image src={`http://localhost:4000/static/msk/${item.img.substring(item.img.lastIndexOf('/') + 1)}`} width={60} height={22} alt="" />}
                                            </td>
                                            <td>{item.title}</td>
                                            <td>
                                                <div className="flex justify-center items-center gap-1">
                                                    <span>
                                                        {item.finalRating}
                                                    </span>
                                                    <StarIcon />
                                                </div>
                                            </td>
                                            <td>{item.goodRating}</td>
                                            <td>{item.fastRating}</td>
                                            <td>{item.lowRating}</td>
                                            <td>{item.oficialPrice}</td>
                                            <td>{item.peoplePrice}</td>
                                            <td>{item.ratingPrice.split(" ").map((word, idx) => idx === 0 ?
                                                <>
                                                    <span className={`${colorsText(item.ratingPrice)}`}>{word}</span>
                                                    <br />
                                                </> : word + ' ')}
                                            </td>
                                            <td>{item.attestat}</td>
                                            <td>{item.dateSend}</td>
                                            <td>{item.review}</td>
                                            <td>{item.requestCount}</td>
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